'use client'

import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import {
  PlusIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  StarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  TagIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon
} from '@heroicons/react/24/outline'
import {
  StarIcon as StarSolidIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function SellerDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - in real app, this would come from API
  const stats = {
    totalProducts: 47,
    activeOrders: 12,
    monthlyRevenue: 3248,
    averageRating: 4.7,
    totalReviews: 189,
    profileViews: 1234
  }

  const recentOrders = [
    {
      id: 'ORD-001',
      product: 'Wireless Earbuds',
      customer: 'John D.',
      amount: 79.99,
      status: 'pending',
      date: '2024-01-15T10:30:00Z',
      courier: null,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop'
    },
    {
      id: 'ORD-002',
      product: 'Smart Watch',
      customer: 'Sarah M.',
      amount: 249.99,
      status: 'in_transit',
      date: '2024-01-14T14:20:00Z',
      courier: 'FastDelivery Co',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
    },
    {
      id: 'ORD-003',
      product: 'Bluetooth Speaker',
      customer: 'Mike R.',
      amount: 89.99,
      status: 'delivered',
      date: '2024-01-12T09:15:00Z',
      courier: 'QuickRun Delivery',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
    },
    {
      id: 'ORD-004',
      product: 'Phone Case',
      customer: 'Emma L.',
      amount: 19.99,
      status: 'confirmed',
      date: '2024-01-15T16:45:00Z',
      courier: null,
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop'
    }
  ]

  const myProducts = [
    {
      id: '1',
      name: 'Wireless Earbuds Pro',
      price: 79.99,
      stock: 15,
      sold: 34,
      rating: 4.6,
      reviews: 28,
      status: 'active',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop',
      lastUpdated: '2024-01-10'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 249.99,
      stock: 8,
      sold: 12,
      rating: 4.8,
      reviews: 15,
      status: 'active',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      lastUpdated: '2024-01-08'
    },
    {
      id: '3',
      name: 'Portable Speaker',
      price: 89.99,
      stock: 0,
      sold: 23,
      rating: 4.4,
      reviews: 19,
      status: 'out_of_stock',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      lastUpdated: '2024-01-05'
    },
    {
      id: '4',
      name: 'Phone Case Premium',
      price: 19.99,
      stock: 50,
      sold: 67,
      rating: 4.9,
      reviews: 45,
      status: 'active',
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop',
      lastUpdated: '2024-01-12'
    }
  ]

  const recentReviews = [
    {
      id: '1',
      customer: 'John D.',
      product: 'Wireless Earbuds Pro',
      rating: 5,
      comment: 'Excellent sound quality and fast delivery!',
      date: '2024-01-14',
      verified: true
    },
    {
      id: '2',
      customer: 'Sarah M.',
      product: 'Smart Fitness Watch',
      rating: 4,
      comment: 'Great product, works as expected. Good seller.',
      date: '2024-01-13',
      verified: true
    },
    {
      id: '3',
      customer: 'Mike R.',
      product: 'Portable Speaker',
      rating: 5,
      comment: 'Amazing sound for the price! Highly recommend.',
      date: '2024-01-12',
      verified: false
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-700 bg-yellow-100'
      case 'confirmed': return 'text-blue-700 bg-blue-100'
      case 'in_transit': return 'text-purple-700 bg-purple-100'
      case 'delivered': return 'text-green-700 bg-green-100'
      case 'cancelled': return 'text-red-700 bg-red-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const getProductStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-700 bg-green-100'
      case 'out_of_stock': return 'text-red-700 bg-red-100'
      case 'draft': return 'text-yellow-700 bg-yellow-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'products', name: 'My Products', icon: ShoppingBagIcon },
    { id: 'orders', name: 'Orders', icon: ClockIcon },
    { id: 'reviews', name: 'Reviews', icon: StarIcon }
  ]

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Seller Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage your products and grow your business
                </p>
              </div>
              
              {/* Verification Badge */}
              <div className="flex items-center space-x-4">
                {user?.verified && (
                  <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                    <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Verified Seller</span>
                  </div>
                )}
                <button className="btn-primary">
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Product
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total Products', 
              value: stats.totalProducts.toString(), 
              icon: ShoppingBagIcon, 
              color: 'text-blue-600', 
              bgColor: 'bg-blue-50',
              change: '+3 this month'
            },
            { 
              label: 'Active Orders', 
              value: stats.activeOrders.toString(), 
              icon: ClockIcon, 
              color: 'text-orange-600', 
              bgColor: 'bg-orange-50',
              change: '+5 today'
            },
            { 
              label: 'Monthly Revenue', 
              value: `$${stats.monthlyRevenue.toLocaleString()}`, 
              icon: CurrencyDollarIcon, 
              color: 'text-green-600', 
              bgColor: 'bg-green-50',
              change: '+12% vs last month'
            },
            { 
              label: 'Average Rating', 
              value: stats.averageRating.toString(), 
              icon: StarIcon, 
              color: 'text-yellow-600', 
              bgColor: 'bg-yellow-50',
              change: `${stats.totalReviews} reviews`
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders */}
              <div className="lg:col-span-2">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                    <button className="text-primary-600 hover:text-primary-700 font-medium">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentOrders.slice(0, 4).map((order) => (
                      <div key={order.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <Image
                          src={order.image}
                          alt={order.product}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{order.product}</h3>
                          <p className="text-sm text-gray-600">Customer: {order.customer}</p>
                          <p className="text-sm text-gray-500">
                            Order: {order.id} • {new Date(order.date).toLocaleDateString()}
                          </p>
                          {order.courier && (
                            <p className="text-sm text-blue-600">Courier: {order.courier}</p>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${order.amount}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {formatStatus(order.status)}
                          </span>
                        </div>
                        
                        <div className="flex flex-col space-y-1">
                          <button className="text-primary-600 hover:text-primary-700 text-sm">
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-700 text-sm">
                            Update
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Recent Reviews */}
              <div>
                <div className="card p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reviews</h2>
                  
                  <div className="space-y-4">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <StarSolidIcon
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            {review.verified && (
                              <CheckCircleIcon className="h-4 w-4 text-green-500 ml-1" />
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        
                        <p className="font-medium text-gray-900 text-sm mb-1">{review.customer}</p>
                        <p className="text-xs text-gray-600 mb-2">{review.product}</p>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full btn-outline justify-start">
                      <PlusIcon className="h-5 w-5 mr-2" />
                      Add New Product
                    </button>
                    <button className="w-full btn-outline justify-start">
                      <TagIcon className="h-5 w-5 mr-2" />
                      Create Promotion
                    </button>
                    <button className="w-full btn-outline justify-start">
                      <ChartBarIcon className="h-5 w-5 mr-2" />
                      View Analytics
                    </button>
                    <button className="w-full btn-outline justify-start">
                      <TruckIcon className="h-5 w-5 mr-2" />
                      Find Couriers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
                <button className="btn-primary">
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add New Product
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProducts.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getProductStatusColor(product.status)}`}>
                        {formatStatus(product.status)}
                      </span>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <div className="flex items-center">
                          <StarSolidIcon className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                          <span className="font-medium">Stock:</span> {product.stock}
                        </div>
                        <div>
                          <span className="font-medium">Sold:</span> {product.sold}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Updated {product.lastUpdated}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">All Orders</h2>
                <div className="flex items-center space-x-4">
                  <select className="input-field">
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Image
                              src={order.image}
                              alt={order.product}
                              width={48}
                              height={48}
                              className="w-12 h-12 object-cover rounded-lg mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{order.product}</div>
                              <div className="text-sm text-gray-500">{order.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {formatStatus(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-4">
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    Average Rating: <span className="font-semibold">{stats.averageRating}/5</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Total Reviews: <span className="font-semibold">{stats.totalReviews}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {review.customer.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">{review.customer}</h3>
                            {review.verified && (
                              <CheckCircleIcon className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{review.product}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarSolidIcon
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-700">{review.comment}</p>
                    
                    <div className="mt-4 flex items-center space-x-4">
                      <button className="text-sm text-primary-600 hover:text-primary-700">
                        Reply
                      </button>
                      <button className="text-sm text-gray-600 hover:text-gray-700">
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}