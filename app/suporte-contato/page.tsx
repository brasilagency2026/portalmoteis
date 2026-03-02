'use client'

import Link from 'next/link'
import { ArrowLeft, MessageCircle, Mail, Building2, Rocket } from 'lucide-react'

export default function SuporteContatoPage() {
  const whatsapp = '5513955517904' // Formato internacional
  const email = 'portalmoteis@bdsmbrazil.com.br'
  const cnpj = '64.465.357/0001-28'
  const whatsappDisplay = '(13) 95551-7904'

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Voltar à homepage
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              <span className="neon-red-text">Suporte e Contato</span>
            </h1>
            <p className="text-zinc-300 text-lg">
              Entre em contato conosco para dúvidas, sugestões ou suporte
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* WhatsApp */}
            <div className="bg-zinc-800/50 backdrop-blur border border-zinc-700 rounded-2xl p-8 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/30">
              <h3 className="text-xl font-bold text-center mb-2">WhatsApp</h3>
              <p className="text-zinc-400 text-center text-sm mb-4">
                {whatsappDisplay}
              </p>
              <div className="flex justify-center">
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full font-semibold transition-all flex items-center justify-center shadow-lg hover:shadow-green-500/50 hover:scale-110"
                  title="Abrir WhatsApp"
                >
                  <MessageCircle size={28} className="text-white" />
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-zinc-800/50 backdrop-blur border border-zinc-700 rounded-2xl p-8 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/30">
              <h3 className="text-xl font-bold text-center mb-2">Email</h3>
              <p className="text-zinc-400 text-center text-xs mb-4 break-all">
                {email}
              </p>
              <div className="flex justify-center">
                <a
                  href={`mailto:${email}`}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full font-semibold transition-all flex items-center justify-center shadow-lg hover:shadow-blue-500/50 hover:scale-110"
                  title="Enviar Email"
                >
                  <Mail size={28} className="text-white" />
                </a>
              </div>
            </div>

            {/* CNPJ */}
            <div className="bg-zinc-800/50 backdrop-blur border border-zinc-700 rounded-2xl p-8 hover:border-red-500 transition-all hover:shadow-lg hover:shadow-red-500/20">
              <h3 className="text-xl font-bold text-center mb-4">CNPJ</h3>
              <p className="text-zinc-400 text-center mb-6">
                Informações legais da empresa
              </p>
              <div className="w-full py-3 bg-zinc-700/50 rounded-lg font-semibold text-center">
                {cnpj}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-zinc-800/30 backdrop-blur border border-zinc-700 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">
              <span className="text-red-500">Sobre</span> a BDSMBRAZIL
            </h2>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                BDSMBRAZIL é o maior portal especializado em motéis com suites temáticas BDSM no Brasil. 
                Nossa missão é conectar proprietários de estabelecimentos qualificados com clientes que 
                buscam experiências seguras, discretas e memoráveis.
              </p>

              <p>
                Se você é proprietário de um motel com suites temáticas e ambientes diferenciados, 
                temos planos especiais para divulgar seu estabelecimento em nosso portal.
              </p>

              <p>
                <strong>Dúvidas ou sugestões?</strong> Entre em contato através dos canais listados acima. 
                Respondemos rapidamente via WhatsApp e email.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/owner"
                className="group relative flex-1 py-4 px-6 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 rounded-xl font-bold text-lg transition-all shadow-2xl hover:shadow-red-500/50 hover:scale-105 text-center flex items-center justify-center gap-3 overflow-hidden"
              >
                {/* Effet de brillance */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                
                <Rocket size={24} className="group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Divulgar seu Motel</span>
                <span className="absolute top-1 right-2 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-extrabold">DESTAQUE</span>
              </Link>
              <Link
                href="/"
                className="flex-1 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500/10 rounded-xl font-semibold transition-all text-center hover:border-red-400"
              >
                Voltar à Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} BDSMBRAZIL. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
