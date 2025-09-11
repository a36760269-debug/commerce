'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'
import { 
  ShoppingCartIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedInIcon
} from '../icons/SocialIcons'

export default function Footer() {
  const { t, direction } = useLanguage()

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.products') },
    { href: '/services', label: t('nav.services') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ]

  const supportLinks = [
    { href: '/help', label: 'Help Center' },
    { href: '/faq', label: 'FAQ' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/support', label: 'Customer Support' },
  ]

  const roleLinks = [
    { href: '/buyer/register', label: 'Become a Buyer' },
    { href: '/seller/register', label: 'Become a Seller' },
    { href: '/courier/register', label: 'Become a Courier' },
    { href: '/partner', label: 'Business Partnership' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <ShoppingCartIcon className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">Commerce</span>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Connect, Trade, Deliver - Your trusted marketplace platform connecting buyers, sellers, and couriers with verified trust badges and seamless experiences.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <EnvelopeIcon className="h-5 w-5 text-primary-400" />
                <span>support@commerce-platform.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <PhoneIcon className="h-5 w-5 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <MapPinIcon className="h-5 w-5 text-primary-400" />
                <span>123 Commerce St, Business City, BC 12345</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Get Started</h3>
            <ul className="space-y-3">
              {roleLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="font-medium text-sm mb-3">Stay Updated</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>&copy; 2024 Commerce Platform. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-primary-400 transition-colors">
                  Terms
                </Link>
                <Link href="/cookies" className="hover:text-primary-400 transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Available on:</span>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-gray-800 rounded-md">
                  <span className="text-xs">Web</span>
                </div>
                <div className="px-3 py-1 bg-gray-800 rounded-md">
                  <span className="text-xs">iOS</span>
                </div>
                <div className="px-3 py-1 bg-gray-800 rounded-md">
                  <span className="text-xs">Android</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}