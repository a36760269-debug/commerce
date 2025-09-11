'use client'

import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import {
  TruckIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlayIcon,
  PauseIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import {
  StarIcon as StarSolidIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CourierDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  
  const [isOnline, setIsOnline] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - in real app, this would come from API
  const stats = {
    totalDeliveries: 156,
    activeDeliveries: 3,
    monthlyEarnings: 1847,
    averageRating: 4.8,
    completionRate: 98.7,
    responseTime: '2.3 min'
  }

  const activeDeliveries = [
    {
      id: 'DEL-001',
      orderNumber: 'ORD-12345',
      product: 'Wireless Headphones',
      seller: 'TechStore Pro',
      customer: 'John D.',
      customerPhone: '+1234567890',
      pickupAddress: '123 Tech Street, Downtown',
      deliveryAddress: '456 Home Ave, Uptown',
      distance: '5.2 km',
      estimatedTime: '25 min',
      amount: 15.99,
      status: 'picked_up',
      orderValue: 89.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
    },
    {
      id: 'DEL-002',
      orderNumber: 'ORD-12346',
      product: 'Smart Watch',
      seller: 'GadgetHub',
      customer: 'Sarah M.',
      customerPhone: '+1234567891',
      pickupAddress: '789 Mall Street, Central',
      deliveryAddress: '321 Office Blvd, Business District',
      distance: '3.8 km',
      estimatedTime: '18 min',
      amount: 12.50,
      status: 'assigned',
      orderValue: 249.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
    },
    {
      id: 'DEL-003',
      orderNumber: 'ORD-12347',
      product: 'Coffee Beans',
      seller: 'Morning Brew Co',
      customer: 'Mike R.',
      customerPhone: '+1234567892',
      pickupAddress: '555 Cafe Street, Old Town',
      deliveryAddress: '888 Residential Rd, Suburbs',
      distance: '7.1 km',
      estimatedTime: '32 min',
      amount: 18.75,
      status: 'en_route',
      orderValue: 24.99,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop'
    }
  ]

  const deliveryHistory = [
    {
      id: 'DEL-098',
      date: '2024-01-15',
      product: 'Bluetooth Speaker',
      customer: 'Emma L.',
      amount: 14.99,
      rating: 5,
      tip: 5.00,
      distance: '4.2 km',
      duration: '22 min'
    },
    {
      id: 'DEL-097',
      date: '2024-01-15',
      product: 'Phone Case',
      customer: 'Tom W.',
      amount: 8.50,
      rating: 4,
      tip: 0,
      distance: '2.1 km',
      duration: '15 min'
    },
    {
      id: 'DEL-096',
      date: '2024-01-14',
      product: 'Laptop Charger',
      customer: 'Lisa K.',
      amount: 11.25,
      rating: 5,
      tip: 3.00,
      distance: '3.7 km',
      duration: '19 min'
    },
    {
      id: 'DEL-095',
      date: '2024-01-14',
      product: 'Wireless Mouse',
      customer: 'David P.',
      amount: 9.99,
      rating: 5,
      tip: 2.50,
      distance: '1.8 km',
      duration: '12 min'
    }
  ]

  const availableOrders = [
    {
      id: 'ORD-NEW-001',
      product: 'Gaming Keyboard',
      seller: 'GameZone Electronics',
      pickupAddress: '123 Gaming Street, Tech District',
      deliveryAddress: '456 Player Ave, Gaming Hub',
      distance: '6.3 km',
      estimatedTime: '28 min',
      suggestedFee: 16.50,
      orderValue: 129.99,
      urgency: 'high',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop'
    },
    {
      id: 'ORD-NEW-002',
      product: 'Organic Honey',
      seller: 'Natural Foods Co',
      pickupAddress: '789 Organic Street, Green District',
      deliveryAddress: '321 Healthy Blvd, Wellness Area',
      distance: '4.7 km',
      estimatedTime: '21 min',
      suggestedFee: 13.25,
      orderValue: 34.99,
      urgency: 'medium',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop'
    }
  ]

  const weeklyEarnings = [
    { day: 'Mon', amount: 127.50, deliveries: 8 },
    { day: 'Tue', amount: 156.25, deliveries: 11 },
    { day: 'Wed', amount: 143.75, deliveries: 9 },
    { day: 'Thu', amount: 189.50, deliveries: 13 },
    { day: 'Fri', amount: 201.25, deliveries: 15 },
    { day: 'Sat', amount: 234.75, deliveries: 18 },
    { day: 'Sun', amount: 167.50, deliveries: 12 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'text-blue-700 bg-blue-100'
      case 'picked_up': return 'text-purple-700 bg-purple-100'
      case 'en_route': return 'text-orange-700 bg-orange-100'
      case 'delivered': return 'text-green-700 bg-green-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-700 bg-red-100'
      case 'medium': return 'text-yellow-700 bg-yellow-100'
      case 'low': return 'text-green-700 bg-green-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'active', name: 'Active Deliveries', icon: TruckIcon },
    { id: 'available', name: 'Available Orders', icon: ClockIcon },
    { id: 'history', name: 'History', icon: StarIcon }
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
                  Courier Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage your deliveries and maximize your earnings
                </p>
              </div>
              
              {/* Status Controls */}
              <div className="flex items-center space-x-4">
                {user?.verified && (
                  <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                    <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Trusted Courier</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <button
                    onClick={() => setIsOnline(!isOnline)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      isOnline
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    {isOnline ? (
                      <PlayIcon className="h-4 w-4" />
                    ) : (
                      <PauseIcon className="h-4 w-4" />
                    )}
                    <span className="font-medium">
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Active Deliveries', 
              value: stats.activeDeliveries.toString(), 
              icon: TruckIcon, 
              color: 'text-blue-600', 
              bgColor: 'bg-blue-50',
              change: `${activeDeliveries.length} in progress`
            },
            { 
              label: 'Monthly Earnings', 
              value: `$${stats.monthlyEarnings.toLocaleString()}`, 
              icon: CurrencyDollarIcon, 
              color: 'text-green-600', 
              bgColor: 'bg-green-50',
              change: '+18% vs last month'
            },
            { 
              label: 'Average Rating', 
              value: stats.averageRating.toString(), 
              icon: StarIcon, 
              color: 'text-yellow-600', 
              bgColor: 'bg-yellow-50',
              change: `${stats.totalDeliveries} deliveries`
            },
            { 
              label: 'Completion Rate', 
              value: `${stats.completionRate}%`, 
              icon: CheckCircleIcon, 
              color: 'text-purple-600', 
              bgColor: 'bg-purple-50',
              change: `${stats.responseTime} avg response`
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
                  {tab.id === 'active' && activeDeliveries.length > 0 && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      {activeDeliveries.length}
                    </span>
                  )}
                  {tab.id === 'available' && availableOrders.length > 0 && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      {availableOrders.length}
                    </span>
                  )}
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
              {/* Weekly Earnings Chart */}
              <div className="lg:col-span-2">
                <div className="card p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Earnings</h2>
                  
                  <div className="space-y-4">
                    {weeklyEarnings.map((day, index) => (
                      <div key={day.day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <span className="font-semibold text-primary-600">{day.day}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">${day.amount}</p>
                            <p className="text-sm text-gray-600">{day.deliveries} deliveries</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${(day.amount / 250) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            ${(day.amount / day.deliveries).toFixed(2)}/avg
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-green-900">Weekly Total</p>
                        <p className="text-sm text-green-700">86 deliveries completed</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-900">
                          ${weeklyEarnings.reduce((sum, day) => sum + day.amount, 0).toFixed(2)}
                        </p>
                        <p className="text-sm text-green-700">+15% from last week</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity & Quick Actions */}
              <div>
                <div className="card p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  
                  <div className="space-y-4">
                    {deliveryHistory.slice(0, 3).map((delivery) => (
                      <div key={delivery.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircleIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{delivery.product}</p>
                          <p className="text-xs text-gray-600">{delivery.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            ${delivery.amount + delivery.tip}
                          </p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarSolidIcon
                                key={i}
                                className={`h-3 w-3 ${
                                  i < delivery.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full btn-outline justify-start">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      Update Coverage Area
                    </button>
                    <button className="w-full btn-outline justify-start">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      Set Availability
                    </button>
                    <button className="w-full btn-outline justify-start">
                      <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                      Update Rates
                    </button>
                    <button className="w-full btn-outline justify-start">
                      <ChartBarIcon className="h-5 w-5 mr-2" />
                      View Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'active' && (
            <div className="space-y-6">
              {activeDeliveries.length > 0 ? (
                activeDeliveries.map((delivery) => (
                  <div key={delivery.id} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={delivery.image}
                          alt={delivery.product}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{delivery.product}</h3>
                          <p className="text-sm text-gray-600">Order: {delivery.orderNumber}</p>
                          <p className="text-sm text-gray-600">Seller: {delivery.seller}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(delivery.status)}`}>
                          {formatStatus(delivery.status)}
                        </span>
                        <p className="text-lg font-bold text-gray-900 mt-2">${delivery.amount}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Pickup Location</h4>
                        <div className="flex items-start space-x-2">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-600">{delivery.pickupAddress}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Delivery Location</h4>
                        <div className="flex items-start space-x-2">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-600">{delivery.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Customer</p>
                        <p className="text-sm text-gray-900">{delivery.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Distance</p>
                        <p className="text-sm text-gray-900">{delivery.distance}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Est. Time</p>
                        <p className="text-sm text-gray-900">{delivery.estimatedTime}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Order Value</p>
                        <p className="text-sm text-gray-900">${delivery.orderValue}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="btn-outline flex items-center space-x-2">
                          <PhoneIcon className="h-4 w-4" />
                          <span>Call Customer</span>
                        </button>
                        <button className="btn-outline flex items-center space-x-2">
                          <ChatBubbleLeftRightIcon className="h-4 w-4" />
                          <span>Message</span>
                        </button>
                        <button className="btn-outline flex items-center space-x-2">
                          <MapPinIcon className="h-4 w-4" />
                          <span>Navigate</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {delivery.status === 'assigned' && (
                          <button className="btn-primary">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Confirm Pickup
                          </button>
                        )}
                        {delivery.status === 'picked_up' && (
                          <button className="btn-primary">
                            <TruckIcon className="h-4 w-4 mr-1" />
                            Start Delivery
                          </button>
                        )}
                        {delivery.status === 'en_route' && (
                          <button className="btn-primary">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Mark Delivered
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card p-12 text-center">
                  <TruckIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Deliveries</h3>
                  <p className="text-gray-600 mb-6">
                    You don't have any active deliveries right now. Check available orders to get started!
                  </p>
                  <button
                    onClick={() => setActiveTab('available')}
                    className="btn-primary"
                  >
                    View Available Orders
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'available' && (
            <div className="space-y-6">
              {!isOnline && (
                <div className="card p-6 bg-yellow-50 border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <XCircleIcon className="h-6 w-6 text-yellow-600" />
                    <div>
                      <h3 className="font-medium text-yellow-900">You're Currently Offline</h3>
                      <p className="text-sm text-yellow-700">
                        Set your status to "Online" to see and accept new delivery orders.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsOnline(true)}
                      className="ml-auto btn-primary text-sm"
                    >
                      Go Online
                    </button>
                  </div>
                </div>
              )}
              
              {isOnline && availableOrders.length > 0 ? (
                availableOrders.map((order) => (
                  <div key={order.id} className="card p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={order.image}
                          alt={order.product}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{order.product}</h3>
                          <p className="text-sm text-gray-600">Seller: {order.seller}</p>
                          <div className="flex items-center mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(order.urgency)}`}>
                              {order.urgency.toUpperCase()} PRIORITY
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">${order.suggestedFee}</p>
                        <p className="text-sm text-gray-600">Suggested fee</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Pickup Location</h4>
                        <div className="flex items-start space-x-2">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-600">{order.pickupAddress}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Delivery Location</h4>
                        <div className="flex items-start space-x-2">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Distance</p>
                        <p className="text-sm text-gray-900">{order.distance}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Est. Time</p>
                        <p className="text-sm text-gray-900">{order.estimatedTime}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Order Value</p>
                        <p className="text-sm text-gray-900">${order.orderValue}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button className="btn-outline flex items-center space-x-2">
                        <EyeIcon className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                      
                      <div className="flex items-center space-x-3">
                        <button className="text-gray-600 hover:text-gray-800 font-medium">
                          Decline
                        </button>
                        <button className="btn-primary">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Accept Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : isOnline ? (
                <div className="card p-12 text-center">
                  <ClockIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Available</h3>
                  <p className="text-gray-600">
                    There are no delivery orders available in your area right now. Check back soon!
                  </p>
                </div>
              ) : null}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Delivery History</h2>
                <div className="flex items-center space-x-4">
                  <select className="input-field">
                    <option value="">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Distance & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Earnings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deliveryHistory.map((delivery) => (
                      <tr key={delivery.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{delivery.product}</div>
                            <div className="text-sm text-gray-500">{delivery.date}</div>
                            <div className="text-sm text-gray-500">{delivery.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {delivery.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{delivery.distance}</div>
                          <div>{delivery.duration}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${delivery.amount}
                            {delivery.tip > 0 && (
                              <span className="text-green-600"> +${delivery.tip} tip</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            Total: ${delivery.amount + delivery.tip}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarSolidIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < delivery.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}