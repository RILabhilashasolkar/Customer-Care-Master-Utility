import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingSpinner({ message, size = 'md' }: LoadingSpinnerProps) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-10 h-10' : 'w-6 h-6'
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <Loader2 className={`${sizeClass} animate-spin text-brand-600`} />
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  )
}
