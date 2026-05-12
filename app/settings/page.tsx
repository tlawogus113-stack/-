'use client'

import { useState } from 'react'
import {
  User,
  Building2,
  Bell,
  Palette,
  Key,
  Shield,
  Mail,
  Phone,
  Globe,
  Save,
  Loader2,
} from 'lucide-react'

import { DashboardLayout } from '@/components/dashboard-layout'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    proposalComplete: true,
    seoAlert: true,
    weeklyReport: true,
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast.success('설정이 저장되었습니다')
  }

  return (
    <DashboardLayout breadcrumbs={[{ label: '설정' }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">설정</h1>
            <p className="text-muted-foreground">
              계정 및 앱 설정을 관리하세요
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Save className="mr-2 size-4" />
            )}
            변경사항 저장
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="profile">프로필</TabsTrigger>
            <TabsTrigger value="company">회사 정보</TabsTrigger>
            <TabsTrigger value="notifications">알림</TabsTrigger>
            <TabsTrigger value="security">보안</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <User className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>프로필 정보</CardTitle>
                    <CardDescription>
                      개인 정보 및 계정 설정을 관리하세요
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
                    김담
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      사진 변경
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG 최대 2MB
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" defaultValue="김담당" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="marketing@agency.kr"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">연락처</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="010-1234-5678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">직책</Label>
                    <Select defaultValue="manager">
                      <SelectTrigger id="role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager">마케팅 매니저</SelectItem>
                        <SelectItem value="director">마케팅 디렉터</SelectItem>
                        <SelectItem value="cmo">CMO</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">소개</Label>
                  <Textarea
                    id="bio"
                    placeholder="간단한 소개를 입력하세요"
                    defaultValue="디지털 마케팅 전문가. 10년 이상의 퍼포먼스 마케팅 경력."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>회사 정보</CardTitle>
                    <CardDescription>
                      에이전시 정보를 설정하세요
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">회사명</Label>
                    <Input
                      id="company-name"
                      defaultValue="디지털마케팅에이전시"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-number">사업자등록번호</Label>
                    <Input
                      id="business-number"
                      defaultValue="123-45-67890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-email">대표 이메일</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="company-email"
                        className="pl-9"
                        defaultValue="contact@agency.kr"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">대표 전화</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="company-phone"
                        className="pl-9"
                        defaultValue="02-1234-5678"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="company-website">웹사이트</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="company-website"
                        className="pl-9"
                        defaultValue="https://agency.kr"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="company-address">주소</Label>
                  <Input
                    id="company-address"
                    defaultValue="서울특별시 강남구 테헤란로 123, 4층"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-intro">회사 소개</Label>
                  <Textarea
                    id="company-intro"
                    rows={4}
                    defaultValue="디지털마케팅에이전시는 2015년 설립된 퍼포먼스 마케팅 전문 에이전시입니다. 검색광고, SNS 광고, SEO 등 다양한 디지털 마케팅 서비스를 제공합니다."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Bell className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>알림 설정</CardTitle>
                    <CardDescription>
                      알림 수신 방법을 설정하세요
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">알림 수신 방법</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>이메일 알림</Label>
                        <p className="text-xs text-muted-foreground">
                          이메일로 알림을 받습니다
                        </p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, email: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>푸시 알림</Label>
                        <p className="text-xs text-muted-foreground">
                          브라우저 푸시 알림을 받습니다
                        </p>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, push: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS 알림</Label>
                        <p className="text-xs text-muted-foreground">
                          문자 메시지로 알림을 받습니다
                        </p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, sms: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">알림 종류</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>제안서 생성 완료</Label>
                        <p className="text-xs text-muted-foreground">
                          제안서 생성이 완료되면 알립니다
                        </p>
                      </div>
                      <Switch
                        checked={notifications.proposalComplete}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            proposalComplete: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SEO 점수 변동 알림</Label>
                        <p className="text-xs text-muted-foreground">
                          SEO 점수가 크게 변동하면 알립니다
                        </p>
                      </div>
                      <Switch
                        checked={notifications.seoAlert}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            seoAlert: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>주간 리포트</Label>
                        <p className="text-xs text-muted-foreground">
                          매주 월요일 주간 리포트를 받습니다
                        </p>
                      </div>
                      <Switch
                        checked={notifications.weeklyReport}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            weeklyReport: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>보안 설정</CardTitle>
                    <CardDescription>
                      계정 보안을 관리하세요
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">비밀번호 변경</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">현재 비밀번호</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div />
                    <div className="space-y-2">
                      <Label htmlFor="new-password">새 비밀번호</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">비밀번호 확인</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button variant="outline">비밀번호 변경</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">2단계 인증</h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                        <Key className="size-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">인증 앱</p>
                        <p className="text-xs text-muted-foreground">
                          Google Authenticator 또는 Authy 사용
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">설정</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">로그인 기록</h3>
                  <div className="space-y-3">
                    {[
                      {
                        device: 'Chrome on Windows',
                        location: '서울, 대한민국',
                        time: '현재 세션',
                        current: true,
                      },
                      {
                        device: 'Safari on iPhone',
                        location: '서울, 대한민국',
                        time: '2시간 전',
                        current: false,
                      },
                      {
                        device: 'Chrome on MacOS',
                        location: '부산, 대한민국',
                        time: '어제',
                        current: false,
                      },
                    ].map((session, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {session.device}
                            {session.current && (
                              <span className="ml-2 text-xs text-success">
                                (현재)
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {session.location} · {session.time}
                          </p>
                        </div>
                        {!session.current && (
                          <Button variant="ghost" size="sm">
                            로그아웃
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
