'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { FormData } from '../proposal-form'

const goals = [
  {
    id: 'brand-awareness',
    label: '브랜드 인지도',
    description: '브랜드를 더 많은 사람들에게 알리고 싶습니다',
  },
  {
    id: 'lead-generation',
    label: '리드 수집',
    description: '잠재 고객 정보를 수집하고 싶습니다',
  },
  {
    id: 'phone-inquiries',
    label: '전화 문의 증가',
    description: '전화 상담 및 문의를 늘리고 싶습니다',
  },
  {
    id: 'sales-increase',
    label: '매출 증가',
    description: '온라인/오프라인 매출을 높이고 싶습니다',
  },
  {
    id: 'seo-improvement',
    label: 'SEO 강화',
    description: '검색 엔진 노출을 개선하고 싶습니다',
  },
  {
    id: 'new-customers',
    label: '신규 고객 확보',
    description: '새로운 고객을 유치하고 싶습니다',
  },
]

interface MarketingGoalsStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function MarketingGoalsStep({
  formData,
  updateFormData,
}: MarketingGoalsStepProps) {
  const toggleGoal = (goalId: string) => {
    const current = formData.marketingGoals
    if (current.includes(goalId)) {
      updateFormData({
        marketingGoals: current.filter((id) => id !== goalId),
      })
    } else {
      updateFormData({ marketingGoals: [...current, goalId] })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">마케팅 목표</h2>
        <p className="text-sm text-muted-foreground">
          달성하고자 하는 목표를 선택해주세요 (복수 선택 가능)
        </p>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => {
          const isChecked = formData.marketingGoals.includes(goal.id)
          return (
            <div
              key={goal.id}
              className={`flex items-start space-x-3 rounded-lg border p-4 transition-colors cursor-pointer ${
                isChecked
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-muted/50'
              }`}
              onClick={() => toggleGoal(goal.id)}
            >
              <Checkbox
                id={goal.id}
                checked={isChecked}
                onCheckedChange={() => toggleGoal(goal.id)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label
                  htmlFor={goal.id}
                  className="text-sm font-medium cursor-pointer"
                >
                  {goal.label}
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {goal.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {formData.marketingGoals.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {formData.marketingGoals.length}개의 목표가 선택되었습니다
        </p>
      )}
    </div>
  )
}
