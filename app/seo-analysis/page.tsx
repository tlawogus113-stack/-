'use client'

import { useState } from 'react'
import {
  Search,
  Loader2,
  Globe,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  FileText,
  Smartphone,
  Zap,
  BarChart3,
  ExternalLink,
  RefreshCw,
} from 'lucide-react'

import { DashboardLayout } from '@/components/dashboard-layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const seoMetrics = [
  {
    id: 'meta-title',
    label: 'Meta Title',
    score: 85,
    status: 'good' as const,
    icon: FileText,
    recommendation: '타이틀 길이가 적절합니다. 키워드 배치 개선 권장',
    details: '현재 타이틀: "서울 강남치과 | 임플란트 전문" (32자)',
  },
  {
    id: 'meta-description',
    label: 'Meta Description',
    score: 65,
    status: 'warning' as const,
    icon: FileText,
    recommendation: 'Description이 너무 짧습니다. 150자 이상 권장',
    details: '현재 길이: 89자',
  },
  {
    id: 'h1-tag',
    label: 'H1 태그',
    score: 90,
    status: 'good' as const,
    icon: TrendingUp,
    recommendation: 'H1 태그가 적절하게 설정되어 있습니다',
    details: 'H1 개수: 1개 (권장)',
  },
  {
    id: 'mobile',
    label: '모바일 최적화',
    score: 72,
    status: 'warning' as const,
    icon: Smartphone,
    recommendation: '일부 요소가 모바일에서 터치하기 어려울 수 있습니다',
    details: '뷰포트 설정: 적용됨',
  },
  {
    id: 'speed',
    label: '페이지 속도',
    score: 45,
    status: 'error' as const,
    icon: Zap,
    recommendation: '이미지 최적화 및 캐싱 설정이 필요합니다',
    details: 'LCP: 4.2초 (목표: 2.5초 이하)',
  },
  {
    id: 'keywords',
    label: '키워드 최적화',
    score: 78,
    status: 'good' as const,
    icon: Search,
    recommendation: '주요 키워드가 적절히 배치되어 있습니다',
    details: '키워드 밀도: 2.3%',
  },
  {
    id: 'content',
    label: '콘텐츠 품질',
    score: 55,
    status: 'warning' as const,
    icon: BarChart3,
    recommendation: '콘텐츠 양이 부족합니다. 500자 이상 권장',
    details: '현재 콘텐츠: 320자',
  },
  {
    id: 'visibility',
    label: '검색 노출 가능성',
    score: 68,
    status: 'warning' as const,
    icon: Globe,
    recommendation: '구조화된 데이터 추가로 노출 개선 가능',
    details: 'Schema.org 마크업 미적용',
  },
]

const statusConfig = {
  good: {
    icon: CheckCircle2,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
    label: '양호',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
    label: '개선필요',
  },
  error: {
    icon: XCircle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/30',
    label: '심각',
  },
}

const recentAnalyses = [
  { url: 'https://gangnam-dental.kr', score: 72, date: '오늘' },
  { url: 'https://law-justice.co.kr', score: 65, date: '어제' },
  { url: 'https://skinlab-clinic.com', score: 88, date: '3일 전' },
  { url: 'https://techstartup.io', score: 54, date: '1주 전' },
]

export default function SEOAnalysisPage() {
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAnalyze = async () => {
    if (!url) {
      toast.error('URL을 입력해주세요')
      return
    }
    setIsAnalyzing(true)
    setShowResults(false)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
    setShowResults(true)
    toast.success('SEO 분석이 완료되었습니다')
  }

  const averageScore = Math.round(
    seoMetrics.reduce((acc, m) => acc + m.score, 0) / seoMetrics.length
  )

  return (
    <DashboardLayout breadcrumbs={[{ label: 'SEO 분석' }]}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SEO 분석</h1>
          <p className="text-muted-foreground">
            웹사이트 URL을 입력하여 SEO 상태를 분석하세요
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-9"
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>
              <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    분석중...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 size-4" />
                    분석 시작
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {isAnalyzing && (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="size-3 animate-pulse rounded-full bg-primary" />
                      <span className="text-sm">웹사이트 크롤링 중...</span>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="h-20 animate-pulse rounded-lg bg-muted"
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {showResults && !isAnalyzing && (
              <>
                {/* Overall Score */}
                <Card>
                  <CardHeader>
                    <CardTitle>종합 SEO 점수</CardTitle>
                    <CardDescription>
                      {url || 'https://example.com'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                      <div className="relative">
                        <svg className="size-40 transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="14"
                            fill="transparent"
                            className="text-muted"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="14"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 70}
                            strokeDashoffset={
                              2 * Math.PI * 70 * (1 - averageScore / 100)
                            }
                            className="text-primary transition-all duration-1000"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold">
                            {averageScore}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            / 100
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
                          <p className="text-3xl font-bold text-success">
                            {seoMetrics.filter((m) => m.status === 'good').length}
                          </p>
                          <p className="text-xs text-muted-foreground">양호</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-warning/10 border border-warning/20">
                          <p className="text-3xl font-bold text-warning">
                            {
                              seoMetrics.filter((m) => m.status === 'warning')
                                .length
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            개선필요
                          </p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                          <p className="text-3xl font-bold text-destructive">
                            {seoMetrics.filter((m) => m.status === 'error').length}
                          </p>
                          <p className="text-xs text-muted-foreground">심각</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Metrics */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>상세 분석 결과</CardTitle>
                      <CardDescription>
                        각 항목별 SEO 상태 및 개선 권고사항
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 size-4" />
                      재분석
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {seoMetrics.map((metric) => {
                      const status = statusConfig[metric.status]
                      const StatusIcon = status.icon
                      const MetricIcon = metric.icon
                      return (
                        <div
                          key={metric.id}
                          className={cn(
                            'rounded-lg border p-4 transition-colors',
                            status.borderColor,
                            status.bgColor
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={cn(
                                'flex size-10 shrink-0 items-center justify-center rounded-lg',
                                status.bgColor
                              )}
                            >
                              <MetricIcon
                                className={cn('size-5', status.color)}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-sm font-medium">
                                  {metric.label}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'text-xs',
                                    status.color,
                                    status.borderColor
                                  )}
                                >
                                  <StatusIcon className="mr-1 size-3" />
                                  {metric.score}점
                                </Badge>
                              </div>
                              <Progress
                                value={metric.score}
                                className="h-2 mb-2"
                              />
                              <p className="text-sm text-muted-foreground">
                                {metric.recommendation}
                              </p>
                              <p className="text-xs text-muted-foreground/70 mt-1">
                                {metric.details}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </>
            )}

            {!showResults && !isAnalyzing && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Globe className="size-16 text-muted-foreground/30" />
                  <p className="mt-4 text-lg font-medium">URL을 입력하세요</p>
                  <p className="text-sm text-muted-foreground">
                    분석할 웹사이트 주소를 입력하고 분석 버튼을 클릭하세요
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">최근 분석 기록</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAnalyses.map((analysis, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setUrl(analysis.url)
                      handleAnalyze()
                    }}
                    className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50"
                  >
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <Globe className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {analysis.url.replace('https://', '')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {analysis.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={cn(
                          'text-sm font-semibold',
                          analysis.score >= 70
                            ? 'text-success'
                            : analysis.score >= 50
                              ? 'text-warning'
                              : 'text-destructive'
                        )}
                      >
                        {analysis.score}점
                      </p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">SEO 가이드</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: 'Meta 태그 최적화', score: 'high' },
                  { title: '페이지 속도 개선', score: 'high' },
                  { title: '모바일 친화성', score: 'medium' },
                  { title: '구조화된 데이터', score: 'medium' },
                ].map((guide) => (
                  <a
                    key={guide.title}
                    href="#"
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <span className="text-sm">{guide.title}</span>
                    <ExternalLink className="size-4 text-muted-foreground" />
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
