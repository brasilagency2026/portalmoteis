import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect /owner routes: redirect to proprietario login
  if (
    !user &&
    request.nextUrl.pathname.startsWith('/owner') &&
    // allow public landing page under /owner for signups
    request.nextUrl.pathname !== '/owner'
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login/proprietario'
    return NextResponse.redirect(url)
  }

  // Protect /admin routes: redirect to admin login
  if (
    !user &&
    request.nextUrl.pathname.startsWith('/admin')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login/admin'
    return NextResponse.redirect(url)
  }

  // Check admin role access
  if (
    user &&
    request.nextUrl.pathname.startsWith('/admin')
  ) {
    try {
      const { data: userRole } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!userRole || (userRole.role !== 'admin' && userRole.role !== 'super_admin')) {
        // Not an admin, redirect to home
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
      }
    } catch (err) {
      // If error checking role, redirect to home
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
