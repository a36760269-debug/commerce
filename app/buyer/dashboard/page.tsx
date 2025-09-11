'use client'

import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  BellIcon,
  ChartBarIcon,
  FunnelIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon
} from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function BuyerDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState<string[]>(['1', '3', '5'])

  // Mock data - in real app, this would come from API
  const recentOrders = [
    {
      id: '1',
      product: 'Wireless Headphones',
      seller: 'TechStore Pro',
      status: 'delivered',
      amount: 89.99,
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      product: 'Smart Watch',
      seller: 'GadgetHub',
      status: 'in_transit',
      amount: 249.99,
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      product: 'Coffee Beans',
      seller: 'Morning Brew Co',
      status: 'processing',
      amount: 24.99,
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop'
    }
  ]

  const featuredProducts = [
    {
      id: '1',
      name: 'Laptop Stand',
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviews: 342,
      seller: 'OfficeDesk Pro',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
      badge: 'Verified Seller',
      discount: 23
    },
    {
      id: '2',
      name: 'Bluetooth Speaker',
      price: 79.99,
      rating: 4.6,
      reviews: 198,
      seller: 'SoundWave Electronics',
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      badge: 'Fast Shipping'
    },
    {
      id: '3',
      name: 'Organic Tea Set',
      price: 32.99,
      rating: 4.9,
      reviews: 87,
      seller: 'Green Leaf Co',
      location: 'Portland, OR',
      image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400&h=300&fit=crop',
      badge: 'Eco-Friendly'
    },
    {
      id: '4',
      name: 'Fitness Tracker',
      price: 129.99,
      originalPrice: 149.99,
      rating: 4.7,
      reviews: 523,
      seller: 'HealthTech Solutions',
      location: 'Austin, TX',
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
      badge: 'Trending',
      discount: 13
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', count: 1250 },
    { id: 'electronics', name: 'Electronics', count: 342 },
    { id: 'fashion', name: 'Fashion', count: 198 },
    { id: 'home', name: 'Home & Garden', count: 157 },
    { id: 'books', name: 'Books & Media', count: 89 },
    { id: 'sports', name: 'Sports & Outdoors', count: 234 }
  ]

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100'
      case 'in_transit': return 'text-blue-600 bg-blue-100'
      case 'processing': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered'
      case 'in_transit': return 'In Transit'
      case 'processing': return 'Processing'
      default: return 'Unknown'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-custom py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">
              Discover amazing products from verified sellers near you
            </p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Orders', value: '24', icon: ShoppingBagIcon, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { label: 'Favorites', value: favorites.length.toString(), icon: HeartIcon, color: 'text-red-600', bgColor: 'bg-red-50' },
            { label: 'Reviews Given', value: '18', icon: StarIcon, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
            { label: 'Savings This Month', value: '$156', icon: ChartBarIcon, color: 'text-green-600', bgColor: 'bg-green-50' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search & Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Search Products & Services
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, services, or sellers..."
                    className="input-field pl-10"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                
                <button className="btn-primary flex items-center space-x-2">
                  <FunnelIcon className="h-5 w-5" />
                  <span>Filters</span>
                </button>
              </div>
            </motion.div>

            {/* Featured Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Featured Products
                </h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{product.discount}%
                        </div>
                      )}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                      >
                        {favorites.includes(product.id) ? (
                          <HeartSolidIcon className="h-5 w-5 text-red-500" />
                        ) : (
                          <HeartIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <span className="badge badge-primary text-xs">{product.badge}</span>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarSolidIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">by {product.seller}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {product.location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="btn-outline text-sm py-2 px-3">
                            <EyeIcon className="h-4 w-4 mr-1" />
                            View
                          </button>
                          <button className="btn-primary text-sm py-2 px-3">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Image
                      src={order.image}
                      alt={order.product}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {order.product}
                      </p>
                      <p className="text-sm text-gray-600">{order.seller}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${order.amount}
                      </p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full btn-outline justify-start">
                  <HeartIcon className="h-5 w-5 mr-2" />
                  View Favorites
                </button>
                <button className="w-full btn-outline justify-start">
                  <StarIcon className="h-5 w-5 mr-2" />
                  Write Reviews
                </button>
                <button className="w-full btn-outline justify-start">
                  <BellIcon className="h-5 w-5 mr-2" />
                  Notifications
                </button>
                <button className="w-full btn-outline justify-start">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  Find Nearby
                </button>
              </div>
            </motion.div>

            {/* Trust Badge Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200"
            >
              <h3 className="font-semibold text-primary-900 mb-2">
                Trust & Safety
              </h3>
              <p className="text-sm text-primary-700 mb-4">
                Look for verified badges and ratings to ensure safe transactions.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-primary-700">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  Verified Sellers
                </div>
                <div className="flex items-center text-sm text-primary-700">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                  Trusted Couriers
                </div>
                <div className="flex items-center text-sm text-primary-700">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                  Quality Guarantee
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}