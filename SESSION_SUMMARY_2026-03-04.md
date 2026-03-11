# Résumé session — 2026-03-04

## Contexte
Projet: moteis2702 (Next.js + Supabase + PayPal)
Objectif principal: stabiliser le flux upgrade Premium propriétaire (sandbox puis live)

## Problèmes traités

### 1) Localhost / serveur dev
- Serveur local relancé et stabilisé sur localhost (port 3000)
- Conflits de port et verrous .next/trace gérés pendant les tests

### 2) Git / GitHub
- Repo connecté et synchronisé avec origin/main
- Plusieurs correctifs poussés pour déclencher les déploiements Vercel

### 3) Upgrade Premium depuis owner/dashboard
- Bug initial: clic Upgrade renvoyait dans une boucle vers dashboard
- Correctif: respect de upgrade=true pour afficher la page des plans
- Fichier modifié: app/owner/page.tsx

### 4) Erreur Vercel build
- Erreur: useSearchParams() must be wrapped in Suspense sur /owner
- Correctif appliqué: wrapper Suspense + composant interne
- Fichier modifié: app/owner/page.tsx

### 5) PayPal sandbox
- Erreur INVALID_RESOURCE_ID corrigée en recréant un plan valide lié au bon compte/app sandbox
- Vérification API faite: plan sandbox existant et actif

### 6) Redirection post-paiement
- Bug initial: après paiement, redirection vers création motel même pour un motel existant
- Correctif: si upgradedExistingMotel=true, redirection vers /owner/dashboard
- Fichier modifié: components/PremiumPayPalButton.tsx

### 7) PayPal live
- Credentials live validés via API OAuth
- Plan live validé via API (status ACTIVE)
- Variables à poser dans Vercel Production confirmées

## Commits importants (main)
- 43a2ab3 — fix: allow owner upgrade flow from dashboard
- 0440c5f — fix: wrap owner useSearchParams in Suspense
- a80aa3b — fix: redirect existing owners to dashboard after paypal upgrade

## Variables PayPal attendues en Production (Vercel)
- PAYPAL_ENV=live
- PAYPAL_CLIENT_ID
- PAYPAL_CLIENT_SECRET
- NEXT_PUBLIC_PAYPAL_CLIENT_ID
- NEXT_PUBLIC_PAYPAL_PREMIUM_PLAN_ID
- PAYPAL_WEBHOOK_ID

Note: les valeurs sensibles ne sont pas stockées ici volontairement.

## Événements webhook recommandés
- BILLING.SUBSCRIPTION.ACTIVATED
- BILLING.SUBSCRIPTION.RE-ACTIVATED
- BILLING.SUBSCRIPTION.CANCELLED
- BILLING.SUBSCRIPTION.SUSPENDED
- BILLING.SUBSCRIPTION.EXPIRED
- BILLING.SUBSCRIPTION.PAYMENT.FAILED

## Sécurité
- SETUP_SUPER_ADMIN_KEY protège des endpoints d’administration initiaux
- Recommandé: rotation de cette clé, et désactivation/protection de /setup en production

## Où regarder au retour
- Logique plans/upgrade: app/owner/page.tsx
- Flux PayPal bouton + redirection: components/PremiumPayPalButton.tsx
- Validation backend abonnement: app/api/paypal/verify-subscription/route.ts
- Webhook PayPal: app/api/paypal/webhook/route.ts
- Setup admin: app/setup/page.tsx et app/api/setup-super-admin/route.ts

## TODO au prochain passage
1. Vérifier en production le flux complet paiement live -> upgrade premium
2. Vérifier les logs Vercel Functions pour verify-subscription et webhook
3. Sécuriser /setup en production (blocage ou feature flag)
