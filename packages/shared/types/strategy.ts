export interface StrategyParam {
  key: string
  label: string
  type: 'number' | 'boolean' | 'select'
  default: number | boolean | string
  min?: number
  max?: number
  step?: number
  options?: string[]
  tooltip?: string
}

export interface StrategyDefinition {
  id: string
  name: string
  description: string
  params: StrategyParam[]
}

export interface MarketSnapshot {
  symbol: string
  bids: [number, number][]
  asks: [number, number][]
  midpoint: number
  bestBid: number
  bestAsk: number
  spread: number
  bidDepth: number
  askDepth: number
  lastTradePrice: number
  tradeVelocity: number
  windowOpenPrice: number
  windowHigh: number
  windowLow: number
  timestamp: number
}

export interface Signal {
  signal: 'UP' | 'DOWN' | 'NONE'
  edge: number
  fair: number
  confidence: number
  strategyId: string
  meta?: Record<string, unknown>
}

export interface StrategyPlugin {
  id: string
  evaluate(snapshot: MarketSnapshot): Signal
  onWindowReset?(tokenId: string, newMidpoint: number): void
  stop?(): void
}
