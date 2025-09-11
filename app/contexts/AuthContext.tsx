'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'react-hot-toast'

export interface User {
  id: string
  email: string
  name: string
  role: 'buyer' | 'seller' | 'courier'
  avatar?: string
  verified: boolean
  badges: string[]
  phone?: string
  location?: {
    latitude: number
    longitude: number
    address: string
  }
  createdAt: string
  settings?: {
    notifications: boolean
    language: 'en' | 'ar'
    theme: 'light' | 'dark'
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

interface RegisterData {
  email: string
  password: string
  name: string
  role: 'buyer' | 'seller' | 'courier'
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data based on email
      let role: 'buyer' | 'seller' | 'courier' = 'buyer'
      if (email.includes('seller')) role = 'seller'
      else if (email.includes('courier')) role = 'courier'
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role,
        verified: Math.random() > 0.5,
        badges: role === 'seller' ? ['Verified Seller'] : role === 'courier' ? ['Trusted Courier'] : [],
        createdAt: new Date().toISOString(),
        settings: {
          notifications: true,
          language: 'en',
          theme: 'light'
        }
      }

      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      toast.success('Login successful!')
    } catch (error) {
      toast.error('Login failed. Please try again.')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        phone: userData.phone,
        verified: false,
        badges: [],
        createdAt: new Date().toISOString(),
        settings: {
          notifications: true,
          language: 'en',
          theme: 'light'
        }
      }

      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      toast.success('Registration successful!')
    } catch (error) {
      toast.error('Registration failed. Please try again.')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return
    
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}