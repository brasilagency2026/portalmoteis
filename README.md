<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d674cdf7-9ba4-4b5e-ba50-e47be6bc2586

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## PayPal Premium Subscription Setup

Add these variables to [.env.local](.env.local):

- `PAYPAL_ENV=sandbox` (or `live` in production)
- `PAYPAL_CLIENT_ID=...`
- `PAYPAL_CLIENT_SECRET=...`
- `PAYPAL_WEBHOOK_ID=...`
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID=...`
- `NEXT_PUBLIC_PAYPAL_PREMIUM_PLAN_ID=...`

How to get `NEXT_PUBLIC_PAYPAL_PREMIUM_PLAN_ID`:

1. In PayPal Developer, create a Product for Premium.
2. Create a Billing Plan with monthly recurrence.
3. Copy the generated Plan ID (format similar to `P-XXXXXXXXXXXX`).
4. Put this Plan ID in `NEXT_PUBLIC_PAYPAL_PREMIUM_PLAN_ID`.

Flow implemented:

- Owner subscribes in [app/owner/page.tsx](app/owner/page.tsx)
- PayPal button creates subscription via SDK
- Server validates subscription in [app/api/paypal/verify-subscription/route.ts](app/api/paypal/verify-subscription/route.ts)
- User motels are upgraded to `premium`

## PayPal Webhook (auto downgrade/upgrade)

Configure a webhook URL in PayPal Developer pointing to:

- `/api/paypal/webhook`

Use the generated Webhook ID in `PAYPAL_WEBHOOK_ID`.

Events handled automatically in [app/api/paypal/webhook/route.ts](app/api/paypal/webhook/route.ts):

- Upgrade to premium: `BILLING.SUBSCRIPTION.ACTIVATED`, `BILLING.SUBSCRIPTION.RE-ACTIVATED`
- Downgrade to free: `BILLING.SUBSCRIPTION.CANCELLED`, `BILLING.SUBSCRIPTION.SUSPENDED`, `BILLING.SUBSCRIPTION.EXPIRED`, `BILLING.SUBSCRIPTION.PAYMENT.FAILED`
