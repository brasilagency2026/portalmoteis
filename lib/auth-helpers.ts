import { SupabaseClient } from '@supabase/supabase-js'

export type UserRole = 'proprietario' | 'admin' | 'super_admin'

/**
 * Récupère le rôle de l'utilisateur actuel
 */
export async function getUserRole(supabase: SupabaseClient): Promise<UserRole | null> {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.error('Auth error or no user:', authError)
      return null
    }

    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching user role:', error)
      return null
    }

    return data?.role as UserRole
  } catch (err) {
    console.error('Exception in getUserRole:', err)
    return null
  }
}

/**
 * Vérifie si l'utilisateur est propriétaire (proprietario)
 */
export async function isProprietario(supabase: SupabaseClient): Promise<boolean> {
  const role = await getUserRole(supabase)
  return role === 'proprietario'
}

/**
 * Vérifie si l'utilisateur est admin
 */
export async function isAdmin(supabase: SupabaseClient): Promise<boolean> {
  const role = await getUserRole(supabase)
  return role === 'admin'
}

/**
 * Vérifie si l'utilisateur est super admin
 */
export async function isSuperAdmin(supabase: SupabaseClient): Promise<boolean> {
  const role = await getUserRole(supabase)
  return role === 'super_admin'
}

/**
 * Récupère le profil utilisateur complet
 */
export async function getUserProfile(supabase: SupabaseClient) {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return null
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, email, role, motel_id, created_at')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('Exception in getUserProfile:', err)
    return null
  }
}

/**
 * Récupère l'ID du motel de l'utilisateur propriétaire
 */
export async function getMotelIdForUser(supabase: SupabaseClient): Promise<string | null> {
  try {
    const profile = await getUserProfile(supabase)
    return profile?.motel_id || null
  } catch (err) {
    console.error('Exception in getMotelIdForUser:', err)
    return null
  }
}

/**
 * Vérifie si l'utilisateur a accès à un motel spécifique
 */
export async function canAccessMotel(supabase: SupabaseClient, motelId: string): Promise<boolean> {
  try {
    const role = await getUserRole(supabase)
    
    // Super admin et admin accès à tous les motels
    if (role === 'super_admin' || role === 'admin') {
      return true
    }

    // Propriétaire: seulement son motel
    if (role === 'proprietario') {
      const userMotelId = await getMotelIdForUser(supabase)
      return userMotelId === motelId
    }

    return false
  } catch (err) {
    console.error('Exception in canAccessMotel:', err)
    return false
  }
}

/**
 * Met à jour le rôle d'un utilisateur (super_admin uniquement)
 */
export async function updateUserRole(
  supabase: SupabaseClient,
  userId: string,
  newRole: UserRole
): Promise<boolean> {
  try {
    const currentRole = await getUserRole(supabase)
    
    // Seulement super_admin peut faire ça
    if (currentRole !== 'super_admin') {
      console.error('Unauthorized: only super_admin can update user roles')
      return false
    }

    const { error } = await supabase
      .from('users')
      .update({ role: newRole })
      .eq('id', userId)

    if (error) {
      console.error('Error updating user role:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Exception in updateUserRole:', err)
    return false
  }
}

/**
 * Récupère tous les utilisateurs (super_admin uniquement)
 */
export async function getAllUsers(supabase: SupabaseClient) {
  try {
    const currentRole = await getUserRole(supabase)
    
    if (currentRole !== 'super_admin') {
      console.error('Unauthorized: only super_admin can list all users')
      return null
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, email, role, motel_id, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all users:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('Exception in getAllUsers:', err)
    return null
  }
}

/**
 * Assigne un motel à un propriétaire
 */
export async function assignMotelToProprietario(
  supabase: SupabaseClient,
  proprietarioId: string,
  motelId: string
): Promise<boolean> {
  try {
    const currentRole = await getUserRole(supabase)
    
    if (currentRole !== 'super_admin' && currentRole !== 'admin') {
      console.error('Unauthorized: only admin/super_admin can assign motels')
      return false
    }

    const { error } = await supabase
      .from('users')
      .update({ motel_id: motelId })
      .eq('id', proprietarioId)

    if (error) {
      console.error('Error assigning motel:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Exception in assignMotelToProprietario:', err)
    return false
  }
}
