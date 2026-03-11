import Link from 'next/link';
import { Crown } from 'lucide-react';

export default function UpgradePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <div className="bg-gray-900 border border-yellow-600/30 rounded-lg p-8 shadow-xl text-center">
        <Crown size={48} className="mx-auto mb-4 text-yellow-400" />
        <h1 className="text-3xl font-bold mb-4">Passer au Plan Premium</h1>
        <p className="mb-6 text-lg text-gray-300">
          Débloquez toutes les fonctionnalités premium&nbsp;: jusqu'à 10 photos, meilleure visibilité, et plus encore&nbsp;!
        </p>
        {/* Remplace ce bouton par l'intégration PayPal ou Stripe réelle */}
        <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 rounded-xl font-bold text-lg text-black shadow-lg hover:scale-105 transition-all mb-4">
          Procéder au paiement
        </button>
        <div>
          <Link href="/owner" className="text-yellow-400 underline hover:text-yellow-300">Retour au dashboard</Link>
        </div>
      </div>
    </div>
  );
}
