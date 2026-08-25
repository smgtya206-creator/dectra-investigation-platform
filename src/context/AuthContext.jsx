import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          purchasedCases: [],
          savedCases: [],
          createdAt: new Date().toISOString(),
        }
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(userData))
        resolve(userData)
      }, 500)
    })
  }

  const register = (email, password, name) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          purchasedCases: [],
          savedCases: [],
          createdAt: new Date().toISOString(),
        }
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(userData))
        resolve(userData)
      }, 500)
    })
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  const updateUser = (updatedData) => {
    const updated = { ...user, ...updatedData }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  const addPurchasedCase = (caseId) => {
    const updated = {
      ...user,
      purchasedCases: [...(user.purchasedCases || []), caseId],
    }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  const addSavedCase = (caseId) => {
    const updated = {
      ...user,
      savedCases: [...(user.savedCases || []), caseId],
    }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  const removeSavedCase = (caseId) => {
    const updated = {
      ...user,
      savedCases: (user.savedCases || []).filter((id) => id !== caseId),
    }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        addPurchasedCase,
        addSavedCase,
        removeSavedCase,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
