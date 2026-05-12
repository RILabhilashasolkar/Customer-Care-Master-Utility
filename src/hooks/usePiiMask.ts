import { useState, useCallback } from 'react'
import { useRbac } from '../context/RbacContext'
import { PII_MASKING_RULES } from '../config/pii.config'
import type { PiiType } from '../types/config.types'

interface UsePiiMaskReturn {
  maskValue: (value: string, piiType: PiiType) => string
  canUnmask: (piiType: PiiType) => boolean
  isUnmasked: boolean
  toggleUnmask: () => void
}

export function usePiiMask(): UsePiiMaskReturn {
  const { canUnmaskPii } = useRbac()
  const [isUnmasked, setIsUnmasked] = useState(false)

  const maskValue = useCallback(
    (value: string, piiType: PiiType): string => {
      if (!value) return '—'
      if (isUnmasked && canUnmaskPii(piiType)) return value
      const maskFn = PII_MASKING_RULES[piiType]
      return maskFn ? maskFn(value) : value
    },
    [isUnmasked, canUnmaskPii]
  )

  const canUnmask = useCallback(
    (piiType: PiiType): boolean => canUnmaskPii(piiType),
    [canUnmaskPii]
  )

  const toggleUnmask = useCallback(() => setIsUnmasked((prev) => !prev), [])

  return { maskValue, canUnmask, isUnmasked, toggleUnmask }
}
