'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

export default function DiagnosticsPage() {
  const [email, setEmail] = useState('glwebagency2@gmail.com')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleDiagnostics = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResults(null)

    const output: any = {}

    try {
      // 1. Test login
      output.login = 'Testing...'
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        output.login = `❌ Login failed: ${signInError.message}`
        setResults(output)
        setLoading(false)
        return
      }

      output.login = `✅ Login successful - User ID: ${authData.user.id}`

      // 2. Try to fetch user from users table
      output.userTableCheck = 'Checking users table...'
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (userError) {
        output.userTableCheck = `❌ Error: ${userError.message}`
      } else if (!userData) {
        output.userTableCheck = '❌ No data found'
      } else {
        output.userTableCheck = `✅ User found: ${JSON.stringify(userData, null, 2)}`
      }

      // 3. Try to query all users (for admin)
      output.allUsersCheck = 'Checking all users...'
      const { data: allUsers, error: allUsersError } = await supabase
        .from('users')
        .select('*')

      if (allUsersError) {
        output.allUsersCheck = `❌ Error: ${allUsersError.message}`
      } else {
        output.allUsersCheck = `✅ Found ${allUsers?.length || 0} users`
      }

      setResults(output)
    } catch (err: any) {
      output.error = err.message
      setResults(output)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold neon-text">BDSMBRAZIL</h1>
          <p className="text-gray-400 mt-2">Diagnostics</p>
        </div>

        <div className="border border-red-500/50 rounded-lg p-8 bg-gray-900/80 backdrop-blur-sm neon-card mb-6">
          <form onSubmit={handleDiagnostics} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Diagnostic...' : 'Lancer le diagnostic'}
            </button>
          </form>
        </div>

        {results && (
          <div className="border border-purple-500/50 rounded-lg p-6 bg-gray-900/80 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-4">Résultats:</h2>
            <div className="space-y-4">
              {Object.entries(results).map(([key, value]: [string, any]) => (
                <div key={key} className="bg-gray-800 p-4 rounded">
                  <p className="text-purple-400 font-semibold mb-2">{key}:</p>
                  <p className="text-gray-300 whitespace-pre-wrap text-sm font-mono break-all">
                    {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-red-500 hover:text-red-400 font-semibold">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
