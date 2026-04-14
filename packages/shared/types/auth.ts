export interface AuthUser {
  id: string
  email: string
  role: 'user' | 'admin'
  displayName: string
  color: string
}

export interface UserProfile {
  id: string
  user_id: string
  display_name: string
  role: 'user' | 'admin'
  color: string
  strategy_id: string
  strategy_config: Record<string, unknown>
  created_at: string
  updated_at: string
}
