import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Smartphone } from 'lucide-react'

export default function ClassificadosComingSoonPage() {
  return (
    <div className="min-h-screen bg-black text-white neon-bg">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/apps" className="inline-flex items-center gap-2 mb-8 text-red-400 hover:text-red-300 transition">
          <ArrowLeft size={18} />
          Voltar para Apps
        </Link>

        <div className="bg-zinc-900 border border-red-500/40 rounded-2xl p-8 md:p-10 neon-card">
          <p className="text-xs uppercase tracking-widest text-red-400 mb-3">Em breve</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 neon-text">Classificados BDSM</h1>
          <p className="text-zinc-300 leading-relaxed mb-8">
            Estamos construindo um novo site de classificados BDSM com foco em anonimato total.
            Não será necessário publicar número de telefone, WhatsApp ou email.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="text-red-400 mb-2"><Shield size={20} /></div>
              <h2 className="font-semibold mb-1">Privacidade primeiro</h2>
              <p className="text-sm text-zinc-400">Interações com proteção de identidade para reduzir exposição pessoal.</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="text-red-400 mb-2"><Lock size={20} /></div>
              <h2 className="font-semibold mb-1">Sem contato pessoal público</h2>
              <p className="text-sm text-zinc-400">Nada de telefone, WhatsApp ou email exibidos nos anúncios.</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="text-red-400 mb-2"><Smartphone size={20} /></div>
              <h2 className="font-semibold mb-1">Compatível com Session</h2>
              <p className="text-sm text-zinc-400">Comunicação orientada ao uso do app Session para reforçar anonimato.</p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-zinc-300 mb-4">
              Você já pode baixar o Session para preparar seu acesso quando os Classificados forem lançados.
            </p>
            <a
              href="https://getsession.org/download"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-full btn-3d"
            >
              Baixar Session
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
