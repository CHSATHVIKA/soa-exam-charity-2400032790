import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const CharityContext = createContext(null)

export const API_HOST = (import.meta.env.VITE_API_URL || 'http://localhost:8081').replace(/\/+$/, '')
export const SWAGGER_URL = `${API_HOST}/swagger-ui/index.html`

// Turn a failed response into a readable message (field errors from backend validation first)
async function readError(response, fallback) {
  const data = await response.json().catch(() => ({}))
  if (data.errors && Object.keys(data.errors).length > 0) {
    return Object.values(data.errors).join(', ')
  }
  return data.message || `${fallback} (HTTP ${response.status})`
}

export function CharityProvider({ children }) {
  const [charities, setCharities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toasts, setToasts] = useState([])

  // Toast dispatch
  const showToast = useCallback((type, message) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Runs a request; network failures (backend down) get a clear message
  const request = useCallback(async (path, options, fallback) => {
    let response
    try {
      response = await fetch(`${API_HOST}${path}`, options)
    } catch {
      throw new Error(`Cannot reach the backend at ${API_HOST}. Is it running?`)
    }
    if (!response.ok) {
      throw new Error(await readError(response, fallback))
    }
    return response
  }, [])

  // 1. GET all
  const fetchCharities = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await request('/DisplayAll', undefined, 'Unable to load records')
      const data = await response.json()
      setCharities(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
      showToast('danger', err.message)
    } finally {
      setLoading(false)
    }
  }, [request, showToast])

  useEffect(() => {
    fetchCharities()
  }, [fetchCharities])

  // 2. GET by ID
  const getCharityById = useCallback(async (id) => {
    const response = await request(`/Display/${id}`, undefined, `Failed to fetch record #${id}`)
    return await response.json()
  }, [request])

  // 3. POST new (no id is sent, the database generates it)
  const addCharity = useCallback(async (payload) => {
    try {
      const response = await request('/Add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, 'Creation failed')
      const data = await response.json()
      showToast('success', `Fundraiser #${data.id} created successfully!`)
      await fetchCharities()
      return data
    } catch (err) {
      showToast('danger', err.message)
      throw err
    }
  }, [request, fetchCharities, showToast])

  // 4. PUT update
  const updateCharity = useCallback(async (id, payload) => {
    try {
      const response = await request(`/Update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, 'Update failed')
      const data = await response.json()
      showToast('success', `Fundraiser #${id} updated successfully!`)
      await fetchCharities()
      return data
    } catch (err) {
      showToast('danger', err.message)
      throw err
    }
  }, [request, fetchCharities, showToast])

  // 5. DELETE
  const deleteCharity = useCallback(async (id) => {
    try {
      await request(`/Delete/${id}`, { method: 'DELETE' }, `Failed to delete record #${id}`)
      showToast('success', `Fundraiser #${id} was deleted successfully.`)
      await fetchCharities()
    } catch (err) {
      showToast('danger', err.message)
      throw err
    }
  }, [request, fetchCharities, showToast])

  // Aggregated KPI Stats
  const stats = useMemo(() => {
    const count = charities.length
    const target = charities.reduce((sum, c) => sum + Number(c.targetAmount || 0), 0)
    const raised = charities.reduce((sum, c) => sum + Number(c.amountRaised || 0), 0)
    const completed = charities.filter((c) => c.completed).length
    const percent = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0
    return { count, target, raised, completed, percent }
  }, [charities])

  return (
    <CharityContext.Provider
      value={{
        charities,
        loading,
        error,
        stats,
        toasts,
        showToast,
        removeToast,
        fetchCharities,
        getCharityById,
        addCharity,
        updateCharity,
        deleteCharity,
      }}
    >
      {children}
    </CharityContext.Provider>
  )
}

export function useCharity() {
  const context = useContext(CharityContext)
  if (!context) {
    throw new Error('useCharity must be used within a CharityProvider')
  }
  return context
}
