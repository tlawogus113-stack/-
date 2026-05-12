'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FormData } from '../proposal-form'

const industries = [
  { value: 'medical', label: '병원/의료' },
  { value: 'legal', label: '법률' },
  { value: 'realestate', label: '부동산' },
  { value: 'beauty', label: '뷰티' },
  { value: 'shopping', label: '쇼핑몰' },
  { value: 'education', label: '교육' },
  { value: 'automotive', label: '자동차' },
  { value: 'restaurant', label: '음식점' },
  { value: 'it', label: 'IT/SaaS' },
  { value: 'other', label: '기타' },
]

interface AdvertiserInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function AdvertiserInfoStep({
  formData,
  updateFormData,
}: AdvertiserInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">광고주 정보</h2>
        <p className="text-sm text-muted-foreground">
          광고주의 기본 정보를 입력해주세요
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">회사명</Label>
          <Input
            id="companyName"
            placeholder="예: 서울 강남치과"
            value={formData.companyName}
            onChange={(e) => updateFormData({ companyName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactName">담당자명</Label>
          <Input
            id="contactName"
            placeholder="예: 김마케팅"
            value={formData.contactName}
            onChange={(e) => updateFormData({ contactName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">연락처</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="예: 010-1234-5678"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">홈페이지 URL</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://example.com"
            value={formData.website}
            onChange={(e) => updateFormData({ website: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            SEO 분석에 사용됩니다
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">업종</Label>
          <Select
            value={formData.industry}
            onValueChange={(value) => updateFormData({ industry: value })}
          >
            <SelectTrigger id="industry">
              <SelectValue placeholder="업종을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
