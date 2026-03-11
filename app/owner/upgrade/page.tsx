import Link from 'next/link';
import { Crown, Check } from 'lucide-react';
import PremiumPayPalButton from '@/components/PremiumPayPalButton';

export default function UpgradePage() {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const paypalPlanId = process.env.NEXT_PUBLIC_PAYPAL_PREMIUM_PLAN_ID;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <div className="bg-gray-900 border border-yellow-600/30 rounded-lg p-8 shadow-xl text-center max-w-md w-full">
        <Crown size={48} className="mx-auto mb-4 text-yellow-400" />
        <h1 className="text-3xl font-bold mb-2">Passez au Plan Premium</h1>
        <div className="text-2xl font-extrabold text-yellow-400 mb-4">R$ 199 / mois</div>
        <p className="mb-6 text-lg text-gray-300">
          Profitez de tous les avantages exclusifs&nbsp;:
        </p>
        <ul className="text-left mb-6 space-y-2 text-base text-gray-200">
          <li className="flex items-center gap-2"><Check size={18} className="text-yellow-400" /> Jusqu'à <b>10 photos</b> de votre motel</li>
          <li className="flex items-center gap-2"><Check size={18} className="text-yellow-400" /> <b>Boost de priorité 20km</b> (votre motel apparaît en tête dans un rayon de 20km)</li>
          <li className="flex items-center gap-2"><Check size={18} className="text-yellow-400" /> <b>Badge Premium</b> en évidence</li>
          <li className="flex items-center gap-2"><Check size={18} className="text-yellow-400" /> <b>Section Premium</b> exclusive</li>
          <li className="flex items-center gap-2"><Check size={18} className="text-yellow-400" /> Visibilité maximale sur la plateforme</li>
        </ul>
        <div className="mb-6">
          <div className="group relative w-full py-4 px-6 bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 rounded-xl font-bold text-lg shadow-2xl text-center flex items-center justify-center gap-3 text-black overflow-hidden mb-3">
            <Crown size={24} className="relative z-10" />
            <span className="relative z-10 font-extrabold">Abonnement mensuel via PayPal</span>
            <span className="absolute top-1 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-extrabold">DESTAQUE</span>
          </div>
          <PremiumPayPalButton planId={paypalPlanId} clientId={paypalClientId} isAuthenticated={true} />
        </div>
        <div>
          <Link href="/owner" className="text-yellow-400 underline hover:text-yellow-300">Retour au dashboard</Link>
        </div>
      </div>
    </div>
  );
}
