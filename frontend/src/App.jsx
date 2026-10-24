import { Routes, Route } from 'react-router-dom'
import { CharityProvider } from './context/CharityContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ToastProvider from './components/ToastProvider'
import Dashboard from './pages/Dashboard'
import RecordsDirectory from './pages/RecordsDirectory'
import AddRecord from './pages/AddRecord'
import EditRecord from './pages/EditRecord'
import RecordDetails from './pages/RecordDetails'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <CharityProvider>
      <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--surface-bg)' }}>
        {/* Navigation Bar */}
        <Navbar />

        {/* Global Toast Notifications Container */}
        <ToastProvider />

        {/* Dynamic Route Pages */}
        <main className="container flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/records" element={<RecordsDirectory />} />
            <Route path="/add" element={<AddRecord />} />
            <Route path="/edit/:id" element={<EditRecord />} />
            <Route path="/details/:id" element={<RecordDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Consistent Footer */}
        <Footer />
      </div>
    </CharityProvider>
  )
}
