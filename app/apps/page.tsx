import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, MapPin, Users, Heart, Shield, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Apps BDSMBRAZIL',
  description: 'Conheça os aplicativos e serviços do ecossistema BDSMBRAZIL.',
  alternates: { canonical: '/apps' },
}

const apps = [
  {
    id: 1,
    name: 'Loja produtos BDSM',
    description: 'Loja oficial com produtos BDSM selecionados para diferentes perfis e experiências, com foco em qualidade, discrição e segurança.',
    icon: MapPin,
    color: 'bg-red-600',
    status: 'Ativo',
    link: 'https://bdsmbrazil.com.br/loja'
  },
  {
    id: 2,
    name: 'Chatbot Domina (Mistress Elara)',
    description: 'Assista a experiência interativa com o chatbot Domina de Mistress Elara – um assistente virtual voltado para fetiches e dominação.',
    icon: MessageSquare,
    color: 'bg-purple-600',
    status: 'Ativo',
    link: 'https://dominavirtual.bdsmbrazil.com.br/'
  },
  {
    id: 3,
    name: 'Portal Dominatrix',
    description: 'Encontre e conheça dominatrices de todo o Brasil – perfis e serviços disponíveis.',
    icon: Users,
    color: 'bg-pink-600',
    status: 'Ativo',
    link: 'https://dominas.bdsmbrazil.com.br/'
  },
  {
    id: 4,
    name: 'Classificados BDSM',
    description: 'Em breve: nova plataforma de classificados BDSM com anonimato total, sem telefone, WhatsApp ou email público, com comunicação orientada ao app Session.',
    icon: Heart,
    color: 'bg-blue-600',
    status: 'Ativo',
    link: 'https://classificados.bdsmbrazil.com.br'
  }
]

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-black text-red-400 neon-bg">
      {/* Header */}
      <div className="neon-bg text-white">
        <div className="container mx-auto px-4 py-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </Link>
          <p className="text-lg text-red-100 max-w-2xl neon-text">
            Descubra todas as aplicações e serviços da plataforma BDSMBRAZIL, projetados para 
            conectar pessoas e criar experiências memoráveis com segurança e discrição.
          </p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app) => {
            const IconComponent = app.icon
            const isActive = app.status === 'Ativo'
            
            return (
              <div
                key={app.id}
                className="bg-zinc-900 rounded-2xl overflow-hidden neon-card"
              >
                <div className={`${app.color} h-2`} />
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${app.color} p-3 rounded-lg`}>
                      <IconComponent size={24} className="text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    {app.name}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 leading-relaxed">
                    {app.description}
                  </p>

                  {isActive ? (
                    <Link
                      href={app.link}
                      className="inline-flex items-center justify-center gap-2 w-full bg-red-600 neon-button text-white font-semibold py-1 px-3 rounded-full text-sm btn-3d"
                    >
                      Acessar aplicação
                      <ArrowLeft size={16} className="rotate-180" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold py-2 rounded-lg cursor-not-allowed"
                    >
                      Em breve
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Seção informativa */}
        <div className="mt-20 bg-zinc-900 rounded-2xl p-8 md:p-12 neon-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3 neon-text">Nossa Missão</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Criar um ecossistema seguro, discreto e inclusivo para a comunidade BDSM no Brasil. 
                Oferecemos plataformas confiáveis que conectam pessoas com interesses similares, 
                promovendo respeito, consentimento e segurança em todas as interações.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3 neon-text">Nossos Valores</h3>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-red-600 font-bold">✓</span>
                  <span><strong>Segurança:</strong> Proteção de dados e privacidade garantidas</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 font-bold">✓</span>
                  <span><strong>Discrição:</strong> Anonimato e confidencialidade respeitados</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 font-bold">✓</span>
                  <span><strong>Consentimento:</strong> Consentimento informado em todas as interações</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 font-bold">✓</span>
                  <span><strong>Comunidade:</strong> Suporte e inclusão para todos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
