# Skill Technique – Reprogrammation du site moteis2702

## 1. Stack technique
- Next.js (App Router, SSR/CSR, routing dynamique)
- TypeScript (strict)
- Supabase (auth, base de données, storage)
- React (composants fonctionnels, hooks)
- Tailwind CSS (design responsive)
- Leaflet (react-leaflet) pour cartes et géolocalisation
- PayPal SDK (`@paypal/react-paypal-js`) pour paiements premium
- Resend pour emails transactionnels (notifications admin)
- Hébergement Vercel, DNS Cloudflare

## 2. Architecture & organisation
- Séparation client/server (composants server/client Next.js)
- Layouts et routing dynamique (pages motels, admin, etc.)
- Helpers centralisés (`lib/utils.ts`, `lib/auth-helpers.ts`, `lib/paypal.ts`)
- Typage strict de toutes les données (`types/index.ts`)
- API Route Handlers Next.js pour les endpoints (`app/api/...`)

## 3. Fonctionnalités clés
- Slugs d’URL SEO-friendly (nom du motel seul, compatibilité anciens liens)
- Authentification Supabase (login, callback, signout)
- Paiement premium PayPal (bouton dynamique, gestion des plans, webhooks)
- Email notification admin à chaque nouvelle inscription (Resend)
- Cartes interactives : position utilisateur + motel, calcul de distance, auto-fit
- Dashboard admin, gestion motels, statistiques propriétaires

## 4. Bonnes pratiques
- Hooks personnalisés (détection mobile, géolocalisation, etc.)
- Composants réutilisables (`Header`, `MotelCard`, `MotelMap`, `PremiumPayPalButton`)
- Sécurité : vérification des rôles côté serveur, middleware d’auth
- Diagnostics/logs pour debug (console, diagnostics PayPal/email)
- Respect conventions Next.js (dossiers `app/`, `components/`, `lib/`, `types/`)

## 5. Déploiement & maintenance
- Variables d’environnement pour toutes les clés sensibles (Supabase, PayPal, Resend)
- Tests manuels des flows critiques (paiement, inscription, email, géoloc)
- Documentation dans `README.md` et `SESSION_SUMMARY_*.md`

## 6. Conseils pour reprogrammation
- Reprendre la structure de dossiers, helpers, patterns de composants
- Suivre la logique des flows (auth, paiement, email, géoloc)
- Adapter endpoints API et gestion des rôles selon besoins

---

*Ce skill résume l’architecture, les choix techniques et les patterns essentiels pour reprogrammer le site facilement et proprement.*
