import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getPayPalSubscriptionDetails } from '@/lib/paypal'

export async function POST(request: NextRequest) {
  try {
    const { subscriptionID } = await request.json()
    console.log('📥 Reçu subscriptionID:', subscriptionID)

    if (!subscriptionID) {
      return NextResponse.json({ error: 'subscriptionID é obrigatório' }, { status: 400 })
    }

    const expectedPlanId = process.env.NEXT_PUBLIC_PAYPAL_PREMIUM_PLAN_ID
    console.log('📋 Plan ID attendu:', expectedPlanId)
    
    if (!expectedPlanId) {
      return NextResponse.json({ error: 'Plano PayPal premium não configurado' }, { status: 500 })
    }

    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    console.log('👤 Utilisateur:', user?.email)
    if (userError || !user) {
      console.error('❌ Erreur auth:', userError)
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 })
    }

    console.log('🔄 Validation de l\'abonnement PayPal...')
    const subscription = await getPayPalSubscriptionDetails(subscriptionID)
    console.log('✅ Abonnement trouvé:', subscription)

    if (subscription.plan_id !== expectedPlanId) {
      console.error('❌ Plan ID ne correspond pas:', subscription.plan_id, '!==', expectedPlanId)
      return NextResponse.json({ error: 'Assinatura não corresponde ao plano premium' }, { status: 400 })
    }

    if (!['ACTIVE', 'APPROVAL_PENDING'].includes(subscription.status)) {
      console.error('❌ Statut invalide:', subscription.status)
      return NextResponse.json({ error: `Status da assinatura inválido: ${subscription.status}` }, { status: 400 })
    }

    console.log('💾 Mise à jour du motel pour l\'utilisateur:', user.id)
    const { data: updatedMotels, error: motelError } = await supabase
      .from('motels')
      .update({ plan: 'premium' })
      .eq('owner_id', user.id)
      .select('id')

    if (motelError) {
      console.error('❌ Erreur motel:', motelError)
      return NextResponse.json({ error: `Erro ao atualizar motel: ${motelError.message}` }, { status: 500 })
    }

    const upgradedCount = updatedMotels?.length || 0
    console.log('✅ Motels mis à jour:', upgradedCount)

    // Si aucun motel trouvé, marquer l'utilisateur comme "pending premium" pour création future
    if (upgradedCount === 0) {
      console.log('⚠️ Aucun motel trouvé, marquage pending_premium sur user')
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({ pending_premium: true })
        .eq('id', user.id)

      if (userUpdateError) {
        console.error('❌ Erreur update user:', userUpdateError)
      } else {
        console.log('✅ User marqué pending_premium')
      }
    }

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      status: subscription.status,
      upgradedExistingMotel: upgradedCount > 0,
      pendingPremium: upgradedCount === 0,
      message: upgradedCount > 0 
        ? 'Plano premium ativado com sucesso' 
        : 'Assinatura premium registrada. Crie seu motel para ativar os benefícios premium.',
    })
  } catch (error: any) {
    console.error('❌ Erreur serveur:', error)
    return NextResponse.json(
      { error: error?.message || 'Erro interno ao validar assinatura' },
      { status: 500 }
    )
  }
}
