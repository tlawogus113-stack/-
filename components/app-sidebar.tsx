'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Search,
  Settings,
  Sparkles,
  ChevronDown,
  User,
  LogOut,
  Bell,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const menuItems = [
  {
    title: '대시보드',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: '제안서 생성',
    url: '/proposal/create',
    icon: FileText,
    badge: 'AI',
  },
  {
    title: '저장된 제안서',
    url: '/proposals',
    icon: FolderOpen,
    badge: '12',
  },
  {
    title: 'SEO 분석',
    url: '/seo-analysis',
    icon: Search,
  },
  {
    title: '설정',
    url: '/settings',
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-foreground">
              ProposalAI
            </span>
            <span className="text-xs text-muted-foreground">
              마케팅 제안서 생성기
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.url ||
                  (item.url !== '/' && pathname.startsWith(item.url))
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="h-10"
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant={
                              item.badge === 'AI' ? 'default' : 'secondary'
                            }
                            className={`ml-auto text-[10px] px-1.5 py-0 h-5 ${
                              item.badge === 'AI'
                                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                : ''
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage src="/placeholder-user.jpg" alt="사용자" />
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-medium">
                      김담
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-medium">김담당</span>
                    <span className="truncate text-xs text-muted-foreground">
                      marketing@agency.kr
                    </span>
                  </div>
                  <ChevronDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                side="top"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User className="mr-2 size-4" />
                  <span>프로필 설정</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 size-4" />
                  <span>알림 설정</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 size-4" />
                  <span>로그아웃</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
