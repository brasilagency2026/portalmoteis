'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black flex items-center justify-center px-4">
      {/* Fundo neon */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold neon-text hover:opacity-80 transition">
              BDSMBRAZIL
            </h1>
          </Link>
          <p className="text-gray-400 mt-2">Portal de Motéis BDSM</p>
        </div>

        {/* Escolha de Rol */}
        <div className="max-w-md mx-auto">
          {/* Proprietário Card */}
          <Link
            href="/login/proprietario"
            className="group"
          >
            <div className="border border-red-500/50 rounded-lg p-8 bg-gray-900/80 backdrop-blur-sm hover:border-red-400 transition-all hover:shadow-lg hover:shadow-red-600/20 cursor-pointer neon-card">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-600/20 rounded-full group-hover:bg-red-600/30 transition">
                  <Home size={40} className="text-red-400" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center text-white mb-2">Divulgue seu Motel</h2>
              <p className="text-gray-400 text-center text-sm mb-4">
                Gerencie seus anúncios, fotos e acompanhe suas estatísticas
              </p>

              <div className="space-y-2 mb-6 text-sm">
                <p className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Cadastro completo do motel
                </p>
                <p className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Planos Free/Premium
                </p>
                <p className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Painel de controle
                </p>
              </div>

              <button className="w-full btn-3d-red py-2 rounded-lg font-semibold group-hover:bg-red-700 transition">
                Entrar / Cadastrar
              </button>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          © 2024 BDSMBRAZIL. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}

