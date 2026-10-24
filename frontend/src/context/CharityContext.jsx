import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const CharityContext = createContext(null)

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081/api/charities'

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

  // 1. GET all
  const fetchCharities = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_BASE)
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`)
      }
      const data = await response.json()
      setCharities(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
      showToast('danger', `Unable to load charities: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    fetchCharities()
  }, [fetchCharities])

  // 2. GET by ID
  const getCharityById = useCallback(async (id) => {
    const response = await fetch(`${API_BASE}/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch record #${id}`)
    }
    return await response.json()
  }, [])

  // 3. POST new
  const addCharity = useCallback(async (payload) => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      let msg = data.message || 'Creation failed'
      if (data.errors && typeof data.errors === 'object') {
        msg = Object.values(data.errors).join(', ')
      }
      throw new Error(msg)
    }
    showToast('success', `Fundraiser #${data.id} created successfully!`)
    await fetchCharities()
    return data
  }, [fetchCharities, showToast])

  // 4. PUT update
  const updateCharity = useCallback(async (id, payload) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      let msg = data.message || 'Update failed'
      if (data.errors && typeof data.errors === 'object') {
        msg = Object.values(data.errors).join(', ')
      }
      throw new Error(msg)
    }
    showToast('success', `Fundraiser #${id} updated successfully!`)
    await fetchCharities()
    return data
  }, [fetchCharities, showToast])

  // 5. DELETE
  const deleteCharity = useCallback(async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`Failed to delete record #${id}`)
    }
    showToast('success', `Fundraiser #${id} was deleted successfully.`)
    await fetchCharities()
  }, [fetchCharities, showToast])

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
