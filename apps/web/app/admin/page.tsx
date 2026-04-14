import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { UserAvatar } from '@/components/ui/UserAvatar'

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data: profiles } = await supabase
    .from('user_profiles')
    .select('id, user_id, display_name, role, color, strategy_id')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <h1 className="text-xl font-semibold mb-6">Admin Panel</h1>
      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="text-left px-4 py-3 text-muted font-medium">User</th>
              <th className="text-left px-4 py-3 text-muted font-medium">Role</th>
              <th className="text-left px-4 py-3 text-muted font-medium">Strategy</th>
              <th className="text-left px-4 py-3 text-muted font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map(profile => (
              <tr key={profile.id} className="border-b border-border hover:bg-surface/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <UserAvatar displayName={profile.display_name} color={profile.color} size="sm" />
                    <span>{profile.display_name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${profile.role === 'admin' ? 'bg-accent/20 text-accent' : 'bg-muted/20 text-muted'}`}>
                    {profile.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{profile.strategy_id}</td>
                <td className="px-4 py-3 text-muted">idle</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
