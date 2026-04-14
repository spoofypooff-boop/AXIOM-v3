'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/stores/authStore'
import { Tooltip } from '@/components/ui/Tooltip'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signup, loading, error } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await signup(email, password, displayName)
    if (!useAuthStore.getState().error) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-sm bg-surface border border-border rounded-xl p-8">
        <h1 className="text-white text-xl font-semibold mb-1">Create your account</h1>
        <p className="text-muted text-sm mb-6">Start trading on Polymarket with Axiom</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center text-xs text-muted mb-1">
              Display name
              <Tooltip info={{ label: 'Display name', description: 'The name other users and the admin will see in the dashboard.' }} />
            </label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
              placeholder="Alice"
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="flex items-center text-xs text-muted mb-1">
              Email address
              <Tooltip info={{ label: 'Email address', description: 'You will use this to log in.' }} />
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="flex items-center text-xs text-muted mb-1">
              Password
              <Tooltip info={{ label: 'Password', description: 'Minimum 8 characters.' }} />
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="••••••••"
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-950/30 border border-red-900 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-md py-2 transition-colors"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted">
          Already have an account?{' '}
          <Link href="/login" className="text-accent hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
