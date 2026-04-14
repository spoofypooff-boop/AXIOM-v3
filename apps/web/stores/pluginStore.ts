import { create } from 'zustand'
import type { StrategyDefinition } from '@axiom/shared'

interface PluginState {
  plugins: StrategyDefinition[]
  activePluginId: string
  params: Record<string, unknown>
  setActivePlugin: (id: string, definition: StrategyDefinition) => void
  setParams: (params: Record<string, unknown>) => void
}

export const usePluginStore = create<PluginState>((set) => ({
  plugins: [],
  activePluginId: 'stub',
  params: {},
  setActivePlugin: (id, definition) =>
    set({
      activePluginId: id,
      params: Object.fromEntries(definition.params.map(p => [p.key, p.default])),
    }),
  setParams: (params) => set({ params }),
}))
