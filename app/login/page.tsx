'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  EyeIcon, 
  EyeSlashIcon,
  ShoppingCartIcon 
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const { login, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await login(formData.email, formData.password)
      
      // Redirect based on user role
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      switch (user.role) {
        case 'buyer':
          router.push('/buyer/dashboard')
          break
        case 'seller':
          router.push('/seller/dashboard')
          break
        case 'courier':
          router.push('/courier/dashboard')
          break
        default:
          router.push('/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const demoAccounts = [
    { role: 'buyer', email: 'buyer@demo.com', label: 'Demo Buyer Account' },
    { role: 'seller', email: 'seller@demo.com', label: 'Demo Seller Account' },
    { role: 'courier', email: 'courier@demo.com', label: 'Demo Courier Account' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <ShoppingCartIcon className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-gray-900">Commerce</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('auth.login')}
          </h2>
          <p className="text-gray-600">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        {/* Demo Accounts */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Quick Demo Access:</h3>
          <div className="space-y-2">
            {demoAccounts.map((demo) => (
              <button
                key={demo.role}
                onClick={() => setFormData({ email: demo.email, password: 'demo123' })}
                className="w-full text-left text-sm text-blue-700 hover:text-blue-900 hover:underline"
              >
                {demo.label}: {demo.email}
              </button>
            ))}
          </div>
          <p className="text-xs text-blue-600 mt-2">Password for all demo accounts: demo123</p>
        </div>

        {/* Login Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="card p-8 space-y-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('auth.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {t('auth.password')}
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`input-field pr-12 ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {t('auth.forgot_password')}
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="loading-dots scale-50">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              t('auth.login')
            )}
          </button>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {t('auth.no_account')}{' '}
              <Link
                href="/register"
                className="font-medium text-primary-600 hover:text-primary-700"
              >
                {t('auth.register')}
              </Link>
            </p>
          </div>
        </motion.form>

        {/* Social Login (placeholder for future implementation) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 mb-4">Or continue with</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="btn-outline flex items-center justify-center space-x-2 py-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="btn-outline flex items-center justify-center space-x-2 py-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}