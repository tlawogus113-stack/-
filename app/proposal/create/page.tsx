'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { ProposalForm } from '@/components/proposal/proposal-form'

export default function CreateProposalPage() {
  return (
    <DashboardLayout
      breadcrumbs={[
        { label: '제안서 생성', href: '/proposal/create' },
        { label: '새 제안서' },
      ]}
    >
      <ProposalForm />
    </DashboardLayout>
  )
}
