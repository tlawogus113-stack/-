'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { FormData } from '../proposal-form'

interface KeywordsStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

const suggestedKeywords = [
  '강남치과',
  '임플란트',
  '교정',
  '라미네이트',
  '치아미백',
  '충치치료',
]

export function KeywordsStep({ formData, updateFormData }: KeywordsStepProps) {
  const [inputValue, setInputValue] = useState('')

  const addKeyword = (keyword: string) => {
    const trimmed = keyword.trim()
    if (trimmed && !formData.keywords.includes(trimmed)) {
      updateFormData({ keywords: [...formData.keywords, trimmed] })
    }
    setInputValue('')
  }

  const removeKeyword = (keyword: string) => {
    updateFormData({
      keywords: formData.keywords.filter((k) => k !== keyword),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addKeyword(inputValue)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">타겟 키워드</h2>
        <p className="text-sm text-muted-foreground">
          광고에 활용할 주요 키워드를 입력해주세요
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="키워드 입력 후 Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => addKeyword(inputValue)}
            disabled={!inputValue.trim()}
          >
            <Plus className="size-4" />
          </Button>
        </div>

        {formData.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.keywords.map((keyword) => (
              <Badge
                key={keyword}
                variant="secondary"
                className="px-3 py-1.5 text-sm"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            추천 키워드 (업종 기반)
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedKeywords
              .filter((k) => !formData.keywords.includes(k))
              .map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => addKeyword(keyword)}
                  className="rounded-full border border-dashed border-primary/50 bg-background px-3 py-1 text-xs text-primary hover:bg-primary/5 hover:border-primary transition-colors"
                >
                  + {keyword}
                </button>
              ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          총 {formData.keywords.length}개의 키워드가 등록되었습니다
        </p>
      </div>
    </div>
  )
}
