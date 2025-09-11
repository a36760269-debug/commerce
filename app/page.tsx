'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from './contexts/LanguageContext'
import { useAuth } from './contexts/AuthContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import { 
  ShoppingBagIcon,
  TruckIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function HomePage() {
  const { t } = useLanguage()
  const { user } = useAuth()

  const features = [
    {
      icon: UserGroupIcon,
      title: 'Multi-Role Platform',
      description: 'Seamlessly connect buyers, sellers, and couriers in one unified marketplace',
      color: 'text-blue-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Trust & Verification',
      description: 'Verified badges, ratings, and reviews ensure safe and trustworthy transactions',
      color: 'text-green-600'
    },
    {
      icon: MapPinIcon,
      title: 'Smart Location Matching',
      description: 'Advanced geolocation to connect you with nearby sellers and couriers',
      color: 'text-purple-600'
    },
    {
      icon: ClockIcon,
      title: 'Real-Time Tracking',
      description: 'Live tracking and notifications for all deliveries and order updates',
      color: 'text-orange-600'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Flexible Pricing',
      description: 'No fixed fees - sellers and couriers set their own competitive prices',
      color: 'text-indigo-600'
    },
    {
      icon: StarIcon,
      title: 'Rating System',
      description: 'Comprehensive rating and review system for all platform participants',
      color: 'text-yellow-600'
    }
  ]

  const roles = [
    {
      title: 'For Buyers',
      description: 'Discover amazing products and services from verified sellers with trusted delivery options',
      icon: ShoppingBagIcon,
      benefits: [
        'Browse thousands of products',
        'Compare prices and reviews',
        'Choose preferred delivery options',
        'Track orders in real-time'
      ],
      cta: 'Start Shopping',
      href: user?.role === 'buyer' ? '/buyer/dashboard' : '/register?role=buyer',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'For Sellers',
      description: 'Grow your business by reaching more customers and managing orders efficiently',
      icon: ShoppingBagIcon,
      benefits: [
        'List unlimited products',
        'Manage inventory easily',
        'Connect with couriers',
        'Analytics and insights'
      ],
      cta: 'Start Selling',
      href: user?.role === 'seller' ? '/seller/dashboard' : '/register?role=seller',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'For Couriers',
      description: 'Earn money providing delivery services with flexible schedules and coverage areas',
      icon: TruckIcon,
      benefits: [
        'Set your own rates',
        'Choose coverage areas',
        'Flexible working hours',
        'Instant payment notifications'
      ],
      cta: 'Start Delivering',
      href: user?.role === 'courier' ? '/courier/dashboard' : '/register?role=courier',
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '50,000+', label: 'Products Listed' },
    { number: '25,000+', label: 'Successful Deliveries' },
    { number: '4.8/5', label: 'Average Rating' }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-custom py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Connect, Trade, 
              <span className="text-yellow-400"> Deliver</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed"
            >
              The ultimate marketplace connecting buyers, sellers, and couriers 
              with trust badges, smart matching, and seamless experiences.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                href="/register"
                className="w-full sm:w-auto bg-white text-primary-700 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors text-lg shadow-lg"
              >
                Get Started Now
              </Link>
              <Link 
                href="/products"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary-700 font-semibold py-4 px-8 rounded-lg transition-all text-lg"
              >
                Explore Products
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-bounce-soft"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce-soft delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-400/20 rounded-full animate-bounce-soft delay-500"></div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technology and user-centric design to provide 
              the best marketplace experience for all participants.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 hover:shadow-medium transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-6`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you want to buy, sell, or deliver, we have the perfect 
              solution tailored for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <motion.div 
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card p-8 hover:shadow-medium transition-all group"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <role.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {role.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {role.description}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {role.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={role.href}
                  className={`w-full btn-primary bg-gradient-to-r ${role.gradient} hover:opacity-90 border-0`}
                >
                  {role.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Join thousands of users who trust our platform for their 
              buying, selling, and delivery needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="bg-white text-primary-700 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors text-lg shadow-lg"
              >
                Create Account
              </Link>
              <Link 
                href="/about"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-700 font-semibold py-4 px-8 rounded-lg transition-all text-lg"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}