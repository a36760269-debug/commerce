'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'ar'
type Direction = 'ltr' | 'rtl'

interface LanguageContextType {
  language: Language
  direction: Direction
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.name': 'Name',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.address': 'Address',
    'common.price': 'Price',
    'common.category': 'Category',
    'common.description': 'Description',
    'common.submit': 'Submit',
    'common.close': 'Close',
    
    // Authentication
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.forgot_password': 'Forgot Password?',
    'auth.no_account': 'Don\'t have an account?',
    'auth.have_account': 'Already have an account?',
    'auth.role': 'I want to',
    'auth.role_buyer': 'Buy Products & Services',
    'auth.role_seller': 'Sell Products & Services',
    'auth.role_courier': 'Provide Delivery Services',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview': 'Overview',
    'dashboard.recent_activity': 'Recent Activity',
    'dashboard.stats': 'Statistics',
    'dashboard.notifications': 'Notifications',
    
    // Buyer
    'buyer.search_products': 'Search Products',
    'buyer.favorites': 'My Favorites',
    'buyer.orders': 'My Orders',
    'buyer.reviews': 'My Reviews',
    
    // Seller
    'seller.products': 'My Products',
    'seller.add_product': 'Add Product',
    'seller.orders': 'Orders',
    'seller.analytics': 'Analytics',
    'seller.promotions': 'Promotions',
    
    // Courier
    'courier.deliveries': 'My Deliveries',
    'courier.availability': 'Availability',
    'courier.coverage_area': 'Coverage Area',
    'courier.earnings': 'Earnings',
    
    // Trust & Verification
    'trust.verified': 'Verified',
    'trust.unverified': 'Unverified',
    'trust.badges': 'Trust Badges',
    'trust.verified_seller': 'Verified Seller',
    'trust.trusted_courier': 'Trusted Courier',
    'trust.excellent_seller': 'Excellent Seller',
    'trust.fast_courier': 'Fast Courier',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.services': 'الخدمات',
    'nav.about': 'من نحن',
    'nav.contact': 'تواصل معنا',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    'nav.dashboard': 'لوحة التحكم',
    'nav.profile': 'الملف الشخصي',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.name': 'الاسم',
    'common.email': 'البريد الإلكتروني',
    'common.phone': 'رقم الهاتف',
    'common.address': 'العنوان',
    'common.price': 'السعر',
    'common.category': 'الفئة',
    'common.description': 'الوصف',
    'common.submit': 'إرسال',
    'common.close': 'إغلاق',
    
    // Authentication
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب',
    'auth.email': 'عنوان البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirm_password': 'تأكيد كلمة المرور',
    'auth.forgot_password': 'نسيت كلمة المرور؟',
    'auth.no_account': 'ليس لديك حساب؟',
    'auth.have_account': 'لديك حساب بالفعل؟',
    'auth.role': 'أريد أن',
    'auth.role_buyer': 'أشتري المنتجات والخدمات',
    'auth.role_seller': 'أبيع المنتجات والخدمات',
    'auth.role_courier': 'أقدم خدمات التوصيل',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً بعودتك',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.recent_activity': 'النشاط الأخير',
    'dashboard.stats': 'الإحصائيات',
    'dashboard.notifications': 'الإشعارات',
    
    // Buyer
    'buyer.search_products': 'البحث عن المنتجات',
    'buyer.favorites': 'المفضلة',
    'buyer.orders': 'طلباتي',
    'buyer.reviews': 'تقييماتي',
    
    // Seller
    'seller.products': 'منتجاتي',
    'seller.add_product': 'إضافة منتج',
    'seller.orders': 'الطلبات',
    'seller.analytics': 'التحليلات',
    'seller.promotions': 'العروض الترويجية',
    
    // Courier
    'courier.deliveries': 'توصيلاتي',
    'courier.availability': 'التوفر',
    'courier.coverage_area': 'منطقة التغطية',
    'courier.earnings': 'الأرباح',
    
    // Trust & Verification
    'trust.verified': 'موثق',
    'trust.unverified': 'غير موثق',
    'trust.badges': 'شارات الثقة',
    'trust.verified_seller': 'بائع موثق',
    'trust.trusted_courier': 'ساعي موثوق',
    'trust.excellent_seller': 'بائع ممتاز',
    'trust.fast_courier': 'ساعي سريع',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language
    if (storedLanguage && ['en', 'ar'].includes(storedLanguage)) {
      setLanguageState(storedLanguage)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = direction
    
    if (language === 'ar') {
      document.body.style.fontFamily = 'var(--font-arabic), system-ui, sans-serif'
    } else {
      document.body.style.fontFamily = 'var(--font-inter), system-ui, sans-serif'
    }
  }, [language, direction])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  const value = {
    language,
    direction,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}