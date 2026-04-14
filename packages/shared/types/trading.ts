import type { StrategyDefinition } from './strategy'

export type SessionStatus = 'idle' | 'active' | 'stopped' | 'error'

export interface SessionTelemetry {
  sessionId: string
  userId: string
  status: SessionStatus
  walletBalance: number
  sessionPnl: number
  peakEquity: number
  maxDrawdown: number
  totalTrades: number
  latencyMs: number
  startedAt: string | null
}

export interface Position {
  userId: string
  symbol: string
  direction: 'up' | 'down'
  qty: number
  avgPrice: number
  markPrice: number
  unrealizedPnl: number
  notional: number
  updatedAt: string
}

// WebSocket message types (server → browser)
export type WsServerEvent =
  | { type: 'telemetry'; data: SessionTelemetry }
  | { type: 'positions'; data: Position[] }
  | { type: 'signal'; data: { symbol: string; signal: 'UP' | 'DOWN' | 'NONE'; edge: number; fair: number } }
  | { type: 'fill'; data: { symbol: string; direction: 'up' | 'down'; qty: number; price: number; pnl: number } }
  | { type: 'log'; data: { level: 'info' | 'warn' | 'error'; message: string; timestamp: number } }
  | { type: 'error'; data: { message: string } }
  | { type: 'plugins'; data: StrategyDefinition[] }

// WebSocket message types (browser → server)
export type WsClientCommand =
  | { type: 'session:start'; data: { strategyId: string; params: Record<string, unknown> } }
  | { type: 'session:stop'; data?: never }
  | { type: 'strategy:update'; data: { params: Record<string, unknown> } }
  | { type: 'admin:force_stop'; data: { userId: string } }
