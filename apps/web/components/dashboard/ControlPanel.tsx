'use client'
import { useAuthStore } from '@/stores/authStore'
import { UserAvatar } from '@/components/ui/UserAvatar'
import { useRouter } from 'next/navigation'

export function ControlPanel() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  if (!user) return null

  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-surface">
      <UserAvatar displayName={user.displayName} color={user.color} size="md" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{user.displayName}</p>
        <p className="text-xs text-muted">{user.email}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted px-2 py-1 rounded border border-border">
          Strategy: stub
        </span>
        <button
          className="text-xs bg-accent hover:bg-blue-500 text-white px-3 py-1.5 rounded transition-colors"
          disabled
        >
          Start Session
        </button>
        <button
          onClick={handleLogout}
          className="text-xs text-muted hover:text-white transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
