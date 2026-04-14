import { create } from 'zustand'
import type { AuthUser } from '@axiom/shared'
import { createClient } from '@/lib/supabase'

interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<{ role: string } | null>
  signup: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null })
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      set({ loading: false, error: 'Invalid email or password. Please try again.' })
      return null
    }
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role, display_name, color')
      .eq('user_id', data.user.id)
      .single()
    if (!profile) {
      set({ loading: false, error: 'Could not load your profile. Please try again.' })
      return null
    }
    const user: AuthUser = {
      id: data.user.id,
      email: data.user.email!,
      role: profile.role as 'user' | 'admin',
      displayName: profile.display_name,
      color: profile.color,
    }
    set({ loading: false, user, error: null })
    return { role: profile.role }
  },

  signup: async (email, password, displayName) => {
    set({ loading: true, error: null })
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    })
    if (error) {
      set({ loading: false, error: error.message })
      return
    }
    set({ loading: false })
  },

  logout: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null, error: null })
  },

  clearError: () => set({ error: null }),
}))
