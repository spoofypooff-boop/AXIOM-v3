import { getInitials } from '@/lib/userColors'

interface UserAvatarProps {
  displayName: string
  color: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
}

export function UserAvatar({ displayName, color, size = 'md' }: UserAvatarProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-black select-none`}
      style={{ backgroundColor: color }}
      title={displayName}
    >
      {getInitials(displayName)}
    </div>
  )
}
