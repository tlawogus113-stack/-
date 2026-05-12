'use client'

import { useState } from 'react'
import { Check, ChevronRight, Loader2, Save } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { AdvertiserInfoStep } from './steps/advertiser-info-step'
import { MarketingGoalsStep } from './steps/marketing-goals-step'
import { CurrentAdvertisingStep } from './steps/current-advertising-step'
import { KeywordsStep } from './steps/keywords-step'
import { BudgetStep } from './steps/budget-step'
import { AdditionalNotesStep } from './steps/additional-notes-step'
import { SEOAnalysisSection } from './seo-analysis-section'
import { ProposalPreview } from './proposal-preview'
import { toast } from 'sonner'

const steps = [
  { id: 1, name: '광고주 정보', description: '기본 정보 입력' },
  { id: 2, name: '마케팅 목표', description: '달성 목표 선택' },
  { id: 3, name: '현재 광고', description: '진행중인 광고' },
  { id: 4, name: '타겟 키워드', description: '주요 키워드' },
  { id: 5, name: '예산 설정', description: '월 예산 범위' },
  { id: 6, name: '추가 정보', description: '참고 사항' },
]

export interface FormData {
  companyName: string
  contactName: string
  phone: string
  website: string
  industry: string
  marketingGoals: string[]
  currentAdvertising: string[]
  keywords: string[]
  budget: number
  notes: string
}

const initialFormData: FormData = {
  companyName: '',
  contactName: '',
  phone: '',
  website: '',
  industry: '',
  marketingGoals: [],
  currentAdvertising: [],
  keywords: [],
  budget: 500,
  notes: '',
}

export function ProposalForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAnalyze = async () => {
    if (!formData.website) {
      toast.error('웹사이트 URL을 입력해주세요')
      return
    }
    setIsAnalyzing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setIsAnalyzing(false)
    setShowAnalysis(true)
    toast.success('SEO 분석이 완료되었습니다')
  }

  const handleGenerateProposal = () => {
    setShowPreview(true)
    toast.success('제안서가 생성되었습니다')
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast.success('임시 저장되었습니다')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AdvertiserInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        )
      case 2:
        return (
          <MarketingGoalsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        )
      case 3:
        return (
          <CurrentAdvertisingStep
            formData={formData}
            updateFormData={updateFormData}
          />
        )
      case 4:
        return (
          <KeywordsStep formData={formData} updateFormData={updateFormData} />
        )
      case 5:
        return (
          <BudgetStep formData={formData} updateFormData={updateFormData} />
        )
      case 6:
        return (
          <AdditionalNotesStep
            formData={formData}
            updateFormData={updateFormData}
          />
        )
      default:
        return null
    }
  }

  if (showPreview) {
    return (
      <ProposalPreview
        formData={formData}
        onBack={() => setShowPreview(false)}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">새 제안서 생성</h1>
          <p className="text-muted-foreground">
            광고주 정보를 입력하고 맞춤 제안서를 생성하세요
          </p>
        </div>
        <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Save className="mr-2 size-4" />
          )}
          임시 저장
        </Button>
      </div>

      {/* Steps Navigation */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <nav aria-label="Progress">
            <ol className="flex flex-wrap gap-2 md:gap-0 md:divide-x md:divide-border md:rounded-lg md:border">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className="relative md:flex md:flex-1">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors md:border-0 md:rounded-none md:p-4',
                      currentStep === step.id
                        ? 'border-primary bg-primary/5'
                        : currentStep > step.id
                          ? 'border-success/30 bg-success/5'
                          : 'border-border hover:bg-muted/50'
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium',
                        currentStep === step.id
                          ? 'bg-primary text-primary-foreground'
                          : currentStep > step.id
                            ? 'bg-success text-success-foreground'
                            : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {currentStep > step.id ? (
                        <Check className="size-4" />
                      ) : (
                        step.id
                      )}
                    </span>
                    <span className="flex flex-col">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          currentStep === step.id
                            ? 'text-primary'
                            : currentStep > step.id
                              ? 'text-success'
                              : 'text-foreground'
                        )}
                      >
                        {step.name}
                      </span>
                      <span className="text-xs text-muted-foreground hidden md:block">
                        {step.description}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </CardContent>
      </Card>

      {/* Form Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">{renderStep()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              이전
            </Button>
            <div className="flex gap-2">
              {currentStep === steps.length ? (
                <Button onClick={handleGenerateProposal}>
                  제안서 생성하기
                  <ChevronRight className="ml-2 size-4" />
                </Button>
              ) : (
                <Button onClick={nextStep}>
                  다음
                  <ChevronRight className="ml-2 size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* SEO Analysis Panel */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">SEO 분석</h3>
                  <p className="text-sm text-muted-foreground">
                    웹사이트 URL을 입력하고 분석을 시작하세요
                  </p>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !formData.website}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      분석중...
                    </>
                  ) : (
                    '분석 시작'
                  )}
                </Button>
              </div>

              {isAnalyzing && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-2 animate-pulse rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">
                      웹사이트 크롤링 중...
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-16 animate-pulse rounded-lg bg-muted"
                      />
                    ))}
                  </div>
                </div>
              )}

              {showAnalysis && !isAnalyzing && <SEOAnalysisSection />}

              {!showAnalysis && !isAnalyzing && (
                <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-muted">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      웹사이트 URL을 입력하고
                    </p>
                    <p className="text-sm text-muted-foreground">
                      분석 버튼을 클릭하세요
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
