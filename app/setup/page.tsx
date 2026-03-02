'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SetupSuperAdminPage() {
  const [email, setEmail] = useState('')
  const [setupKey, setSetupKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/add-user-to-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role: 'super_admin',
          setupKey: setupKey,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Erreur lors du setup' })
      } else {
        setMessage({
          type: 'success',
          text: '✅ Super admin configuré avec succès! Vous pouvez maintenant vous connecter via /login/admin',
        })
        setEmail('')
        setSetupKey('')
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Erreur serveur' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold neon-text">BDSMBRAZIL</h1>
          <p className="text-gray-400 mt-2">Setup Super Admin</p>
        </div>

        <div className="border border-red-500/50 rounded-lg p-8 bg-gray-900/80 backdrop-blur-sm neon-card">
          <form onSubmit={handleSetup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email à promouvoir en Super Admin
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                placeholder="ex: glwegagency2@gmail.com"
              />
              <p className="text-xs text-gray-500 mt-2">
                Cet email doit déjà exister dans Supabase Auth.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Clé de Configuration
              </label>
              <input
                type="password"
                value={setupKey}
                onChange={(e) => setSetupKey(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                placeholder="Entrez la clé de setup"
              />
              <p className="text-xs text-gray-500 mt-2">
                Entrez la clé stockée dans la variable d'environnement <code className="text-yellow-400">SETUP_SUPER_ADMIN_KEY</code>
              </p>
            </div>

            {message && (
              <div
                className={`p-3 rounded text-sm ${
                  message.type === 'success'
                    ? 'bg-green-900/20 border border-green-500/50 text-green-300'
                    : 'bg-red-900/20 border border-red-500/50 text-red-300'
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                loading
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700 btn-3d-red'
              }`}
            >
              {loading ? 'Création en cours...' : 'Créer Super Admin'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <Link href="/" className="text-red-500 hover:text-red-400 font-semibold transition text-sm">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/50 rounded text-yellow-300 text-xs">
          <strong>⚠️ Important:</strong> Assurez-vous que <code className="bg-yellow-900/50 px-1">SUPABASE_SERVICE_ROLE_KEY</code> est définie dans <code className="bg-yellow-900/50 px-1">.env.local</code>
        </div>
      </div>
    </div>
  )
}
