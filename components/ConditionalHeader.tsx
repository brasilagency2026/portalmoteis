'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export default function ConditionalHeader() {
  const pathname = usePathname()
  
  // Ne pas afficher le header sur ces routes
  const noHeaderRoutes = [
    '/owner/dashboard',
    '/owner/create-motel',
    '/admin/dashboard',
    '/login',
    '/login/proprietario',
    '/login/admin',
    '/setup',
    '/fix-user',
    '/diagnostics',
  ]
  
  const shouldHideHeader = noHeaderRoutes.some(route => pathname?.startsWith(route))
  
  if (shouldHideHeader) {
    return null
  }
  
  return <Header />
}
