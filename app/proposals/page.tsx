'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Plus,
  FileText,
  MoreHorizontal,
  Eye,
  Download,
  Trash2,
  Copy,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const proposals = [
  {
    id: 1,
    company: '강남 서울치과',
    industry: '병원/의료',
    status: 'completed',
    score: 85,
    budget: '500만원',
    createdAt: '2024-01-15',
    updatedAt: '2시간 전',
  },
  {
    id: 2,
    company: '법무법인 정의',
    industry: '법률',
    status: 'pending',
    score: 72,
    budget: '300만원',
    createdAt: '2024-01-14',
    updatedAt: '5시간 전',
  },
  {
    id: 3,
    company: '스킨랩 클리닉',
    industry: '뷰티',
    status: 'completed',
    score: 91,
    budget: '800만원',
    createdAt: '2024-01-13',
    updatedAt: '1일 전',
  },
  {
    id: 4,
    company: '테크스타트업',
    industry: 'IT/SaaS',
    status: 'in-progress',
    score: 65,
    budget: '1,000만원',
    createdAt: '2024-01-12',
    updatedAt: '2일 전',
  },
  {
    id: 5,
    company: '강남부동산',
    industry: '부동산',
    status: 'completed',
    score: 78,
    budget: '450만원',
    createdAt: '2024-01-11',
    updatedAt: '3일 전',
  },
  {
    id: 6,
    company: '서울학원',
    industry: '교육',
    status: 'pending',
    score: 55,
    budget: '200만원',
    createdAt: '2024-01-10',
    updatedAt: '4일 전',
  },
  {
    id: 7,
    company: '맛있는식당',
    industry: '음식점',
    status: 'draft',
    score: 0,
    budget: '150만원',
    createdAt: '2024-01-09',
    updatedAt: '5일 전',
  },
  {
    id: 8,
    company: '오토모티브코리아',
    industry: '자동차',
    status: 'completed',
    score: 88,
    budget: '2,000만원',
    createdAt: '2024-01-08',
    updatedAt: '1주 전',
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
  draft: {
    label: '임시저장',
    icon: FileText,
    className: 'bg-muted text-muted-foreground border-muted',
  },
}

export default function ProposalsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.industry.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || proposal.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout
      breadcrumbs={[{ label: '저장된 제안서' }]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">저장된 제안서</h1>
            <p className="text-muted-foreground">
              총 {proposals.length}개의 제안서가 있습니다
            </p>
          </div>
          <Button asChild>
            <Link href="/proposal/create">
              <Plus className="mr-2 size-4" />
              새 제안서 생성
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="회사명 또는 업종 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <Filter className="mr-2 size-4" />
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="completed">완료</SelectItem>
                  <SelectItem value="pending">대기중</SelectItem>
                  <SelectItem value="in-progress">진행중</SelectItem>
                  <SelectItem value="draft">임시저장</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Proposals Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProposals.map((proposal) => {
            const status =
              statusConfig[proposal.status as keyof typeof statusConfig]
            const StatusIcon = status.icon
            return (
              <Card
                key={proposal.id}
                className="group transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="size-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {proposal.company}
                        </CardTitle>
                        <CardDescription>{proposal.industry}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 size-4" />
                          미리보기
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 size-4" />
                          다운로드
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 size-4" />
                          복제
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 size-4" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={status.className}>
                      <StatusIcon className="mr-1 size-3" />
                      {status.label}
                    </Badge>
                    <span className="text-sm font-medium text-primary">
                      {proposal.budget}
                    </span>
                  </div>
                  {proposal.score > 0 && (
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">SEO 점수</span>
                        <span className="font-medium">{proposal.score}점</span>
                      </div>
                      <Progress value={proposal.score} className="h-1.5" />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>생성일: {proposal.createdAt}</span>
                    <span>{proposal.updatedAt}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredProposals.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="size-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium">제안서가 없습니다</p>
              <p className="text-sm text-muted-foreground">
                검색 조건을 변경하거나 새 제안서를 생성하세요
              </p>
              <Button asChild className="mt-4">
                <Link href="/proposal/create">
                  <Plus className="mr-2 size-4" />
                  새 제안서 생성
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
