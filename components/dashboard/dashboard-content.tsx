'use client'

import Link from 'next/link'
import {
  FileText,
  TrendingUp,
  Users,
  BarChart3,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RecentProposalsChart } from './recent-proposals-chart'
import { ConversionChart } from './conversion-chart'

const stats = [
  {
    title: '이번 달 제안서',
    value: '24',
    change: '+12%',
    changeType: 'positive' as const,
    icon: FileText,
    description: '전월 대비',
  },
  {
    title: '전환율',
    value: '68%',
    change: '+5.2%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    description: '계약 성공률',
  },
  {
    title: '활성 광고주',
    value: '156',
    change: '+8',
    changeType: 'positive' as const,
    icon: Users,
    description: '신규 등록',
  },
  {
    title: '평균 SEO 점수',
    value: '72',
    change: '+3점',
    changeType: 'positive' as const,
    icon: BarChart3,
    description: '분석 결과',
  },
]

const recentProposals = [
  {
    id: 1,
    company: '강남 서울치과',
    industry: '병원/의료',
    status: 'completed',
    score: 85,
    date: '2시간 전',
  },
  {
    id: 2,
    company: '법무법인 정의',
    industry: '법률',
    status: 'pending',
    score: 72,
    date: '5시간 전',
  },
  {
    id: 3,
    company: '스킨랩 클리닉',
    industry: '뷰티',
    status: 'completed',
    score: 91,
    date: '1일 전',
  },
  {
    id: 4,
    company: '테크스타트업',
    industry: 'IT/SaaS',
    status: 'in-progress',
    score: 65,
    date: '2일 전',
  },
]

const statusConfig = {
  completed: {
    label: '완료',
    icon: CheckCircle2,
    className: 'bg-success/10 text-success border-success/20',
  },
  pending: {
    label: '대기중',
    icon: Clock,
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  'in-progress': {
    label: '진행중',
    icon: AlertCircle,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
}

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            대시보드
          </h1>
          <p className="text-muted-foreground">
            마케팅 제안서 현황을 한눈에 확인하세요
          </p>
        </div>
        <Button asChild>
          <Link href="/proposal/create">
            <Plus className="mr-2 size-4" />
            새 제안서 생성
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span
                  className={
                    stat.changeType === 'positive'
                      ? 'text-success'
                      : 'text-destructive'
                  }
                >
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>제안서 생성 추이</CardTitle>
            <CardDescription>최근 6개월간 제안서 생성 현황</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <RecentProposalsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>전환율 분석</CardTitle>
            <CardDescription>업종별 계약 전환율</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ConversionChart />
          </CardContent>
        </Card>
      </div>

      {/* Recent Proposals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>최근 제안서</CardTitle>
            <CardDescription>최근 생성된 제안서 목록입니다</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/proposals">
              전체 보기
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProposals.map((proposal) => {
              const status = statusConfig[proposal.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              return (
                <div
                  key={proposal.id}
                  className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {proposal.company}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {proposal.industry}
                    </p>
                  </div>
                  <Badge variant="outline" className={status.className}>
                    <StatusIcon className="mr-1 size-3" />
                    {status.label}
                  </Badge>
                  <div className="hidden w-32 md:block">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">SEO 점수</span>
                      <span className="font-medium">{proposal.score}점</span>
                    </div>
                    <Progress value={proposal.score} className="h-1.5" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {proposal.date}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
