'use client'
import { useState } from 'react'
import { Info } from 'lucide-react'

interface TooltipInfo {
  label: string
  description: string
  formula?: string
}

export function Tooltip({ info }: { info: TooltipInfo }) {
  const [visible, setVisible] = useState(false)

  return (
    <span className="relative inline-flex items-center">
      <button
        className="ml-1 text-muted hover:text-accent transition-colors"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        aria-label={`Info: ${info.label}`}
        type="button"
      >
        <Info size={12} />
      </button>
      {visible && (
        <div className="absolute left-5 top-0 z-50 w-64 rounded-md border border-border bg-surface p-3 shadow-xl">
          <p className="text-xs font-semibold text-white mb-1">{info.label}</p>
          <p className="text-xs text-muted leading-relaxed mb-2">{info.description}</p>
          {info.formula && (
            <p className="text-xs font-mono text-accent border-t border-border pt-2 mt-1">
              {info.formula}
            </p>
          )}
        </div>
      )}
    </span>
  )
}
