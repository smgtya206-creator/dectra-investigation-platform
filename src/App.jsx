import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Cases from './pages/Cases'
import CaseDetails from './pages/CaseDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import MyCases from './pages/MyCases'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  useEffect(() => {
    // Initialize theme
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app-wrapper">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cases" element={<Cases />} />
                <Route path="/case/:id" element={<CaseDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
                <Route path="/my-cases" element={<MyCases />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
