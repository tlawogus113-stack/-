'use client'

import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  FileText,
  Smartphone,
  Zap,
  Search,
  BarChart3,
  Globe,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const seoMetrics = [
  {
    id: 'meta-title',
    label: 'Meta Title 상태',
    score: 85,
    status: 'good' as const,
    icon: FileText,
    recommendation: '타이틀 길이가 적절합니다. 키워드 배치 개선 권장',
    details: '현재 타이틀: "서울 강남치과 | 임플란트 전문"',
  },
  {
    id: 'meta-description',
    label: 'Meta Description 상태',
    score: 65,
    status: 'warning' as const,
    icon: FileText,
    recommendation: 'Description이 너무 짧습니다. 150자 이상 권장',
    details: '현재 길이: 89자',
  },
  {
    id: 'h1-tag',
    label: 'H1 태그 분석',
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
    details: '모바일 점수: 72/100',
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

export function SEOAnalysisSection() {
  const averageScore = Math.round(
    seoMetrics.reduce((acc, m) => acc + m.score, 0) / seoMetrics.length
  )

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
        <p className="text-sm text-muted-foreground mb-2">종합 SEO 점수</p>
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 56}
              strokeDashoffset={2 * Math.PI * 56 * (1 - averageScore / 100)}
              className="text-primary transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-3xl font-bold">{averageScore}</span>
        </div>
        <p className="mt-2 text-sm font-medium">
          {averageScore >= 80
            ? '우수한 상태입니다'
            : averageScore >= 60
              ? '개선이 필요합니다'
              : '즉시 조치가 필요합니다'}
        </p>
      </div>

      {/* Score Summary */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg border bg-success/5 border-success/20 p-3">
          <p className="text-2xl font-bold text-success">
            {seoMetrics.filter((m) => m.status === 'good').length}
          </p>
          <p className="text-xs text-muted-foreground">양호</p>
        </div>
        <div className="rounded-lg border bg-warning/5 border-warning/20 p-3">
          <p className="text-2xl font-bold text-warning">
            {seoMetrics.filter((m) => m.status === 'warning').length}
          </p>
          <p className="text-xs text-muted-foreground">개선필요</p>
        </div>
        <div className="rounded-lg border bg-destructive/5 border-destructive/20 p-3">
          <p className="text-2xl font-bold text-destructive">
            {seoMetrics.filter((m) => m.status === 'error').length}
          </p>
          <p className="text-xs text-muted-foreground">심각</p>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="space-y-3">
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
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-lg',
                    status.bgColor
                  )}
                >
                  <MetricIcon className={cn('size-4', status.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <Badge
                      variant="outline"
                      className={cn('text-xs', status.color, status.borderColor)}
                    >
                      <StatusIcon className="mr-1 size-3" />
                      {metric.score}점
                    </Badge>
                  </div>
                  <Progress
                    value={metric.score}
                    className="h-1.5 my-2"
                  />
                  <p className="text-xs text-muted-foreground">
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
      </div>
    </div>
  )
}
