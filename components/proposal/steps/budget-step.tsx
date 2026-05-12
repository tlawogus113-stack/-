'use client'

import { Slider } from '@/components/ui/slider'
import type { FormData } from '../proposal-form'

interface BudgetStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

const formatBudget = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}천만원`
  }
  return `${value}만원`
}

const budgetTiers = [
  { min: 50, max: 300, label: '소형', description: '지역 타겟팅 집중' },
  { min: 300, max: 1000, label: '중형', description: '브랜딩 + 퍼포먼스' },
  { min: 1000, max: 3000, label: '대형', description: '전국 규모 캠페인' },
  { min: 3000, max: 5000, label: '엔터프라이즈', description: '통합 마케팅' },
]

export function BudgetStep({ formData, updateFormData }: BudgetStepProps) {
  const currentTier = budgetTiers.find(
    (tier) => formData.budget >= tier.min && formData.budget <= tier.max
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">월 광고 예산</h2>
        <p className="text-sm text-muted-foreground">
          월간 광고 집행 예산을 설정해주세요
        </p>
      </div>

      <div className="space-y-8">
        <div className="text-center py-8 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-muted-foreground mb-2">월 예산</p>
          <p className="text-4xl font-bold text-primary">
            {formatBudget(formData.budget)}
          </p>
          {currentTier && (
            <div className="mt-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {currentTier.label} · {currentTier.description}
              </span>
            </div>
          )}
        </div>

        <div className="px-2">
          <Slider
            value={[formData.budget]}
            onValueChange={(value) => updateFormData({ budget: value[0] })}
            min={50}
            max={5000}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>50만원</span>
            <span>5,000만원</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {budgetTiers.map((tier) => (
            <button
              key={tier.label}
              type="button"
              onClick={() => updateFormData({ budget: (tier.min + tier.max) / 2 })}
              className={`rounded-lg border p-3 text-left transition-all hover:border-primary/50 ${
                currentTier?.label === tier.label
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
            >
              <p className="font-medium text-sm">{tier.label}</p>
              <p className="text-xs text-muted-foreground">
                {formatBudget(tier.min)} ~ {formatBudget(tier.max)}
              </p>
            </button>
          ))}
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-xs text-muted-foreground">
            💡 예산은 추후 협의를 통해 조정 가능하며, 본 설정은 초기 제안서
            작성을 위한 참고 자료입니다.
          </p>
        </div>
      </div>
    </div>
  )
}
