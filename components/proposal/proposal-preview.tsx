'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Download,
  FileText,
  Mail,
  Printer,
  Building2,
  Target,
  TrendingUp,
  PieChart,
  Calendar,
  DollarSign,
  CheckCircle2,
  BarChart3,
  Users,
  Zap,
  Search,
  Globe,
  Sparkles,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import type { FormData } from './proposal-form'
import { toast } from 'sonner'

interface ProposalPreviewProps {
  formData: FormData
  onBack: () => void
}

const industryLabels: Record<string, string> = {
  medical: '병원/의료',
  legal: '법률',
  realestate: '부동산',
  beauty: '뷰티',
  shopping: '쇼핑몰',
  education: '교육',
  automotive: '자동차',
  restaurant: '음식점',
  it: 'IT/SaaS',
  other: '기타',
}

const goalLabels: Record<string, string> = {
  'brand-awareness': '브랜드 인지도',
  'lead-generation': '리드 수집',
  'phone-inquiries': '전화 문의 증가',
  'sales-increase': '매출 증가',
  'seo-improvement': 'SEO 강화',
  'new-customers': '신규 고객 확보',
}

const roiProjection = [
  { month: '1개월', investment: 500, revenue: 300 },
  { month: '2개월', investment: 500, revenue: 600 },
  { month: '3개월', investment: 500, revenue: 900 },
  { month: '4개월', investment: 500, revenue: 1200 },
  { month: '5개월', investment: 500, revenue: 1500 },
  { month: '6개월', investment: 500, revenue: 1800 },
]

const mediaMixData = [
  { name: '네이버 검색', value: 40, color: 'oklch(0.55 0.22 145)' },
  { name: '구글 광고', value: 25, color: 'oklch(0.55 0.22 255)' },
  { name: 'Meta 광고', value: 20, color: 'oklch(0.60 0.20 255)' },
  { name: 'SEO', value: 15, color: 'oklch(0.65 0.18 255)' },
]

const monthlyPlan = [
  { month: '1월', clicks: 3200, conversions: 128 },
  { month: '2월', clicks: 4500, conversions: 180 },
  { month: '3월', clicks: 5800, conversions: 232 },
  { month: '4월', clicks: 7200, conversions: 288 },
  { month: '5월', clicks: 8500, conversions: 340 },
  { month: '6월', clicks: 10000, conversions: 400 },
]

const roadmapItems = [
  {
    phase: '1단계',
    title: '기반 구축',
    period: '1-2주',
    tasks: ['광고 계정 설정', '키워드 리서치', '랜딩페이지 최적화'],
  },
  {
    phase: '2단계',
    title: '캠페인 런칭',
    period: '3-4주',
    tasks: ['검색광고 시작', 'A/B 테스트', '전환 추적 설정'],
  },
  {
    phase: '3단계',
    title: '최적화',
    period: '5-8주',
    tasks: ['데이터 분석', '입찰 최적화', '타겟 세분화'],
  },
  {
    phase: '4단계',
    title: '확장',
    period: '9-12주',
    tasks: ['채널 확장', '리마케팅 강화', 'ROI 극대화'],
  },
]

export function ProposalPreview({ formData, onBack }: ProposalPreviewProps) {
  const [isExporting, setIsExporting] = useState(false)

  const formatBudget = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}천만원`
    }
    return `${value}만원`
  }

  const handleExport = async (type: 'pdf' | 'docx' | 'email') => {
    setIsExporting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsExporting(false)
    
    const messages = {
      pdf: 'PDF 파일이 다운로드되었습니다',
      docx: 'DOCX 파일이 다운로드되었습니다',
      email: '이메일이 전송되었습니다',
    }
    toast.success(messages[type])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              마케팅 제안서
            </h1>
            <p className="text-muted-foreground">
              {formData.companyName || '광고주'}님을 위한 맞춤 제안서
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
          >
            <Download className="mr-2 size-4" />
            PDF 다운로드
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('docx')}
            disabled={isExporting}
          >
            <FileText className="mr-2 size-4" />
            DOCX 다운로드
          </Button>
          <Button onClick={() => handleExport('email')} disabled={isExporting}>
            <Mail className="mr-2 size-4" />
            이메일 전송
          </Button>
        </div>
      </div>

      {/* Proposal Content */}
      <div className="space-y-6">
        {/* Section 1: 광고주 현황 분석 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>1. 광고주 현황 분석</CardTitle>
              <p className="text-sm text-muted-foreground">
                기업 정보 및 마케팅 현황
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">회사명</p>
                    <p className="text-lg font-semibold">
                      {formData.companyName || '미입력'}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">업종</p>
                    <p className="text-lg font-semibold">
                      {industryLabels[formData.industry] || '미선택'}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">담당자</p>
                    <p className="text-lg font-semibold">
                      {formData.contactName || '미입력'}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">월 예산</p>
                    <p className="text-lg font-semibold text-primary">
                      {formatBudget(formData.budget)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium">마케팅 목표</p>
                <div className="flex flex-wrap gap-2">
                  {formData.marketingGoals.map((goal) => (
                    <Badge key={goal} variant="secondary">
                      {goalLabels[goal] || goal}
                    </Badge>
                  ))}
                  {formData.marketingGoals.length === 0 && (
                    <span className="text-sm text-muted-foreground">
                      선택된 목표 없음
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium mt-4">타겟 키워드</p>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className="bg-primary/5"
                    >
                      {keyword}
                    </Badge>
                  ))}
                  {formData.keywords.length === 0 && (
                    <span className="text-sm text-muted-foreground">
                      등록된 키워드 없음
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: SEO 분석 결과 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Search className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>2. 홈페이지 SEO 분석 결과</CardTitle>
              <p className="text-sm text-muted-foreground">
                웹사이트 검색 최적화 진단
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
                <p className="text-3xl font-bold text-success">72</p>
                <p className="text-xs text-muted-foreground">종합 점수</p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    기술적 SEO
                  </span>
                  <span className="text-sm font-semibold">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    콘텐츠 최적화
                  </span>
                  <span className="text-sm font-semibold">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    모바일 최적화
                  </span>
                  <span className="text-sm font-semibold">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: 경쟁력 진단 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>3. 경쟁력 진단</CardTitle>
              <p className="text-sm text-muted-foreground">
                시장 내 포지셔닝 분석
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="size-4 text-primary" />
                  <span className="text-sm font-medium">시장 경쟁도</span>
                </div>
                <p className="text-2xl font-bold">중간</p>
                <p className="text-xs text-muted-foreground mt-1">
                  동종 업계 평균 대비 적절한 경쟁 환경
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="size-4 text-primary" />
                  <span className="text-sm font-medium">검색 노출도</span>
                </div>
                <p className="text-2xl font-bold">하위 30%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  SEO 개선을 통한 순위 상승 여지 큼
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="size-4 text-primary" />
                  <span className="text-sm font-medium">성장 가능성</span>
                </div>
                <p className="text-2xl font-bold text-success">높음</p>
                <p className="text-xs text-muted-foreground mt-1">
                  적극적인 마케팅 시 빠른 성장 예상
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: 추천 광고 전략 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Target className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>4. 추천 광고 전략</CardTitle>
              <p className="text-sm text-muted-foreground">
                AI 기반 맞춤 전략 제안
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="size-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">핵심 전략: 검색 광고 + SEO 병행</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      단기 성과를 위한 검색 광고와 장기적 자산 구축을 위한 SEO를
                      병행하여 안정적인 트래픽 확보를 권장합니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  {
                    title: '키워드 전략',
                    desc: '브랜드 + 일반 키워드 믹스로 전환율 최적화',
                  },
                  {
                    title: '타겟팅 전략',
                    desc: '지역 + 관심사 기반 정밀 타겟팅',
                  },
                  {
                    title: '콘텐츠 전략',
                    desc: '신뢰 구축을 위한 전문성 콘텐츠 강화',
                  },
                  {
                    title: '리타겟팅 전략',
                    desc: '이탈 고객 재유입을 위한 리마케팅 강화',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-lg border p-4">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: 추천 매체 믹스 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <PieChart className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>5. 추천 매체 믹스</CardTitle>
              <p className="text-sm text-muted-foreground">
                최적의 채널 배분 전략
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={mediaMixData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                      labelLine={false}
                    >
                      {mediaMixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {mediaMixData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="size-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{item.value}%</p>
                      <p className="text-xs text-muted-foreground">
                        {formatBudget(Math.round((formData.budget * item.value) / 100))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 6: 예상 성과 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>6. 예상 성과</CardTitle>
              <p className="text-sm text-muted-foreground">
                6개월 ROI 예측
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <div className="rounded-lg border p-4 text-center">
                <p className="text-2xl font-bold text-primary">+150%</p>
                <p className="text-xs text-muted-foreground">예상 ROI</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <p className="text-2xl font-bold">42,000</p>
                <p className="text-xs text-muted-foreground">예상 월 클릭수</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <p className="text-2xl font-bold">1,680</p>
                <p className="text-xs text-muted-foreground">예상 월 전환수</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <p className="text-2xl font-bold">4.0%</p>
                <p className="text-xs text-muted-foreground">예상 전환율</p>
              </div>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roiProjection}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.65 0.18 145)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.65 0.18 145)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    className="fill-muted-foreground"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    className="fill-muted-foreground"
                    tickFormatter={(v) => `${v}만`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value}만원`]}
                    labelStyle={{ fontWeight: 600 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="예상 수익"
                    stroke="oklch(0.65 0.18 145)"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Section 7: 월 예산 운영안 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>7. 월 예산 운영안</CardTitle>
              <p className="text-sm text-muted-foreground">
                예상 클릭 및 전환 추이
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPlan}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    className="fill-muted-foreground"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    className="fill-muted-foreground"
                  />
                  <Tooltip />
                  <Bar
                    dataKey="clicks"
                    name="클릭수"
                    fill="oklch(0.55 0.22 255)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="conversions"
                    name="전환수"
                    fill="oklch(0.65 0.18 145)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Section 8: 실행 로드맵 */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>8. 실행 로드맵</CardTitle>
              <p className="text-sm text-muted-foreground">12주 마케팅 계획</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {roadmapItems.map((item, idx) => (
                <div
                  key={item.phase}
                  className="relative rounded-lg border p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.period}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {item.tasks.map((task) => (
                      <li
                        key={task}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="size-3 text-success" />
                        {task}
                      </li>
                    ))}
                  </ul>
                  {idx < roadmapItems.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 9: 결론 및 제안 */}
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
              <CheckCircle2 className="size-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>9. 결론 및 제안</CardTitle>
              <p className="text-sm text-muted-foreground">
                최종 권고 사항
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">
                {formData.companyName || '귀사'}의 현재 마케팅 현황과 목표를
                분석한 결과, <strong>검색 광고와 SEO를 병행</strong>하는
                전략을 권장드립니다. 월 예산{' '}
                <strong>{formatBudget(formData.budget)}</strong>를 기준으로
                6개월 내 <strong>ROI 150% 달성</strong>이 가능할 것으로
                예상됩니다.
              </p>
              <Separator />
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-success/30 bg-success/5 p-4">
                  <p className="text-sm font-medium text-success">핵심 강점</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    명확한 타겟층과 경쟁 우위 키워드 보유
                  </p>
                </div>
                <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
                  <p className="text-sm font-medium text-warning">개선 포인트</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    웹사이트 속도 및 모바일 최적화 필요
                  </p>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                  <p className="text-sm font-medium text-primary">기대 효과</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    월 1,680건 이상의 신규 리드 확보 예상
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Actions */}
        <div className="flex flex-wrap justify-center gap-4 py-6">
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
          >
            <Download className="mr-2 size-4" />
            PDF 다운로드
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleExport('docx')}
            disabled={isExporting}
          >
            <FileText className="mr-2 size-4" />
            DOCX 다운로드
          </Button>
          <Button
            size="lg"
            onClick={() => handleExport('email')}
            disabled={isExporting}
          >
            <Mail className="mr-2 size-4" />
            이메일 전송
          </Button>
        </div>
      </div>
    </div>
  )
}
