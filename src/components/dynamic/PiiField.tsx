import React, { useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { useRbac } from '../../context/RbacContext'
import { PII_MASKING_RULES } from '../../config/pii.config'
import type { PiiType } from '../../types/config.types'

interface PiiFieldProps {
  value: string
  piiType: PiiType
  label?: string
}

export function PiiField({ value, piiType, label }: PiiFieldProps) {
  const { canUnmaskPii } = useRbac()
  const [unmasked, setUnmasked] = useState(false)

  const canUnmask = canUnmaskPii(piiType)

  const displayValue = unmasked && canUnmask
    ? value
    : (PII_MASKING_RULES[piiType]?.(value) ?? value)

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-gray-700">{displayValue || '—'}</span>
      {canUnmask ? (
        <button
          onClick={() => setUnmasked((p) => !p)}
          className="text-gray-400 hover:text-brand-700 transition-colors"
          title={unmasked ? 'Mask' : 'Unmask'}
        >
          {unmasked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      ) : (
        <span title={`You don't have permission to view this ${label ?? piiType}`} className="text-gray-300">
          <Lock className="w-3.5 h-3.5" />
        </span>
      )}
    </div>
  )
}
