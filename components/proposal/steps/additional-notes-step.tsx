'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { FormData } from '../proposal-form'

interface AdditionalNotesStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function AdditionalNotesStep({
  formData,
  updateFormData,
}: AdditionalNotesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">추가 참고 사항</h2>
        <p className="text-sm text-muted-foreground">
          제안서 작성에 참고할 추가 정보가 있다면 입력해주세요
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes">참고 사항</Label>
          <Textarea
            id="notes"
            placeholder="예: 이전 광고 집행 경험, 특별히 원하는 광고 채널, 경쟁사 정보, 시즌 이벤트 계획 등..."
            value={formData.notes}
            onChange={(e) => updateFormData({ notes: e.target.value })}
            rows={6}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">
            {formData.notes.length}/500자
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <p className="text-sm font-medium">입력 가이드</p>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            <li>• 이전 광고 집행 경험 및 성과</li>
            <li>• 특별히 원하거나 피하고 싶은 광고 채널</li>
            <li>• 주요 경쟁사 정보</li>
            <li>• 시즌 이벤트 또는 프로모션 계획</li>
            <li>• 기타 마케팅 관련 요청 사항</li>
          </ul>
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm font-medium text-primary mb-2">
            입력 정보 요약
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">회사명:</span>{' '}
              <span className="font-medium">
                {formData.companyName || '-'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">업종:</span>{' '}
              <span className="font-medium">
                {formData.industry || '-'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">마케팅 목표:</span>{' '}
              <span className="font-medium">
                {formData.marketingGoals.length}개
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">키워드:</span>{' '}
              <span className="font-medium">
                {formData.keywords.length}개
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
