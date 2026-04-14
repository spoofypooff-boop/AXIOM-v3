export const USER_COLOR_PALETTE = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16',
  '#a855f7', '#22d3ee', '#fb923c', '#4ade80', '#f472b6', '#facc15',
] as const

export type UserColor = typeof USER_COLOR_PALETTE[number]

export function assignColor(index: number): UserColor {
  return USER_COLOR_PALETTE[index % USER_COLOR_PALETTE.length]
}

export function getInitials(displayName: string): string {
  return displayName
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}
