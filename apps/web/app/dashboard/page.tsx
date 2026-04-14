import { ControlPanel } from '@/components/dashboard/ControlPanel'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <ControlPanel />
      <div className="p-8">
        <div className="border border-border rounded-xl p-8 text-center">
          <p className="text-muted text-sm">Your trading dashboard is being built.</p>
          <p className="text-muted text-xs mt-1">
            Strategy selector, live positions, signals, and charts are coming in Plan 2.
          </p>
        </div>
      </div>
    </div>
  )
}
