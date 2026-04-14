'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/stores/authStore'
import { Tooltip } from '@/components/ui/Tooltip'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const result = await login(email, password)
    if (result) {
      router.push(result.role === 'admin' ? '/admin' : '/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-sm bg-surface border border-border rounded-xl p-8">
        <h1 className="text-white text-xl font-semibold mb-1">Welcome to Axiom</h1>
        <p className="text-muted text-sm mb-6">Sign in to start trading</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center text-xs text-muted mb-1">
              Email address
              <Tooltip info={{ label: 'Email address', description: 'The email you used to create your Axiom account.' }} />
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
              <Tooltip info={{ label: 'Password', description: 'Your account password. Minimum 8 characters.' }} />
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
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
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted">
          No account?{' '}
          <Link href="/signup" className="text-accent hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  )
}
