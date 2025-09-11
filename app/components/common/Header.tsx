'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { 
  ShoppingCartIcon, 
  UserIcon, 
  BellIcon, 
  Cog6ToothIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const { user, logout } = useAuth()
  const { language, setLanguage, t, direction } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)
  const toggleLang = () => setIsLangOpen(!isLangOpen)

  const getDashboardRoute = () => {
    if (!user) return '/login'
    switch (user.role) {
      case 'buyer': return '/buyer/dashboard'
      case 'seller': return '/seller/dashboard'
      case 'courier': return '/courier/dashboard'
      default: return '/dashboard'
    }
  }

  return (
    <header className="bg-white shadow-soft border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <ShoppingCartIcon className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">Commerce</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t('nav.products')}
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t('nav.services')}
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t('nav.about')}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLang}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <GlobeAltIcon className="h-5 w-5" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                  >
                    <button
                      onClick={() => {
                        setLanguage('en')
                        setIsLangOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        language === 'en' ? 'text-primary-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('ar')
                        setIsLangOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        language === 'ar' ? 'text-primary-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      العربية
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <div className="flex items-center mt-1">
                            <span className={`badge ${user.verified ? 'badge-success' : 'bg-gray-100 text-gray-600'}`}>
                              {user.verified ? t('trust.verified') : t('trust.unverified')}
                            </span>
                          </div>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            href={getDashboardRoute()}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <UserIcon className="h-4 w-4 mr-2" />
                            {t('nav.dashboard')}
                          </Link>
                          <Link
                            href="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <UserIcon className="h-4 w-4 mr-2" />
                            {t('nav.profile')}
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Cog6ToothIcon className="h-4 w-4 mr-2" />
                            {t('nav.settings')}
                          </Link>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-2">
                          <button
                            onClick={() => {
                              logout()
                              setIsProfileOpen(false)
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            {t('nav.logout')}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/register"
                  className="btn-primary"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-6 space-y-4">
                <Link
                  href="/"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={toggleMenu}
                >
                  {t('nav.home')}
                </Link>
                <Link
                  href="/products"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={toggleMenu}
                >
                  {t('nav.products')}
                </Link>
                <Link
                  href="/services"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={toggleMenu}
                >
                  {t('nav.services')}
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={toggleMenu}
                >
                  {t('nav.about')}
                </Link>
                
                {!user && (
                  <div className="pt-4 border-t border-gray-200 space-y-4">
                    <Link
                      href="/login"
                      className="block btn-outline text-center"
                      onClick={toggleMenu}
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      href="/register"
                      className="block btn-primary text-center"
                      onClick={toggleMenu}
                    >
                      {t('nav.register')}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}