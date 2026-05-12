import React, { createContext, useContext, useState, useCallback } from 'react'
import type { User, AuthState, LoginCredentials } from '../types/auth.types'
import { DUMMY_USERS } from '../data/users.mock'

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    try {
      const stored = localStorage.getItem('nhq_user')
      if (stored) {
        const user: User = JSON.parse(stored)
        return { user, isAuthenticated: true }
      }
    } catch {
      // ignore
    }
    return { user: null, isAuthenticated: false }
  })

  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    const found = DUMMY_USERS.find(
      (u) => u.username === credentials.username && u.password === credentials.password && u.active
    )
    if (!found) {
      return { success: false, error: 'Invalid username or password' }
    }
    const { password: _p, ...safeUser } = found
    const user: User = { ...safeUser, password: '' }
    localStorage.setItem('nhq_user', JSON.stringify(user))
    setState({ user, isAuthenticated: true })
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('nhq_user')
    setState({ user: null, isAuthenticated: false })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
