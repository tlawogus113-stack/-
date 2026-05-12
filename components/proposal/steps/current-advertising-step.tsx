'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FormData } from '../proposal-form'

const advertisingOptions = [
  {
    id: 'naver-search',
    label: '네이버 검색광고',
    icon: '🔍',
    description: '네이버 검색 결과 상단 노출',
  },
  {
    id: 'naver-gfa',
    label: '네이버 GFA',
    icon: '📱',
    description: '네이버 디스플레이 광고',
  },
  {
    id: 'google-ads',
    label: '구글 광고',
    icon: '🌐',
    description: 'Google Ads 검색/디스플레이',
  },
  {
    id: 'meta-ads',
    label: 'Meta 광고',
    icon: '📘',
    description: 'Facebook/Instagram 광고',
  },
  {
    id: 'kakao-ads',
    label: '카카오 광고',
    icon: '💬',
    description: '카카오 모먼트/비즈보드',
  },
  {
    id: 'seo',
    label: 'SEO 작업중',
    icon: '📈',
    description: '검색 엔진 최적화',
  },
  {
    id: 'viral',
    label: '바이럴 마케팅',
    icon: '🚀',
    description: '블로그/카페/SNS 마케팅',
  },
  {
    id: 'none',
    label: '운영 안함',
    icon: '❌',
    description: '현재 광고 미집행',
  },
]

interface CurrentAdvertisingStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function CurrentAdvertisingStep({
  formData,
  updateFormData,
}: CurrentAdvertisingStepProps) {
  const toggleOption = (optionId: string) => {
    const current = formData.currentAdvertising
    if (optionId === 'none') {
      // If "none" is selected, clear all other selections
      updateFormData({ currentAdvertising: current.includes('none') ? [] : ['none'] })
    } else {
      // If any other option is selected, remove "none" if present
      let updated = current.filter((id) => id !== 'none')
      if (updated.includes(optionId)) {
        updated = updated.filter((id) => id !== optionId)
      } else {
        updated = [...updated, optionId]
      }
      updateFormData({ currentAdvertising: updated })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">현재 진행 중인 광고</h2>
        <p className="text-sm text-muted-foreground">
          현재 집행 중인 광고 채널을 선택해주세요 (복수 선택 가능)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {advertisingOptions.map((option) => {
          const isSelected = formData.currentAdvertising.includes(option.id)
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleOption(option.id)}
              className={cn(
                'relative flex flex-col items-center justify-center gap-2 rounded-lg border p-4 text-center transition-all hover:shadow-md',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/50'
              )}
            >
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="flex size-5 items-center justify-center rounded-full bg-primary">
                    <Check className="size-3 text-primary-foreground" />
                  </div>
                </div>
              )}
              <span className="text-2xl">{option.icon}</span>
              <span className="text-sm font-medium">{option.label}</span>
              <span className="text-xs text-muted-foreground line-clamp-1">
                {option.description}
              </span>
            </button>
          )
        })}
      </div>

      {formData.currentAdvertising.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {formData.currentAdvertising.length}개의 채널이 선택되었습니다
        </p>
      )}
    </div>
  )
}
