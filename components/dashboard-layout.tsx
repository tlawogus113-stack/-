'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun, Bell } from 'lucide-react'

import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DashboardLayoutProps {
  children: React.ReactNode
  breadcrumbs?: Array<{ label: string; href?: string }>
  title?: string
}

export function DashboardLayout({
  children,
  breadcrumbs = [],
  title,
}: DashboardLayoutProps) {
  const { setTheme, theme } = useTheme()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-card px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">ProposalAI</BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.label} className="contents">
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 || !crumb.href ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-4" />
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">테마 변경</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  라이트 모드
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  다크 모드
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  시스템 설정
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
