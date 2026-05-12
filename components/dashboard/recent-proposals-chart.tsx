'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: '1월', proposals: 12, conversions: 8 },
  { month: '2월', proposals: 19, conversions: 14 },
  { month: '3월', proposals: 15, conversions: 10 },
  { month: '4월', proposals: 22, conversions: 15 },
  { month: '5월', proposals: 28, conversions: 20 },
  { month: '6월', proposals: 24, conversions: 18 },
]

export function RecentProposalsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorProposals" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.55 0.22 255)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.55 0.22 255)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.65 0.18 145)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.65 0.18 145)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
          className="text-muted-foreground fill-muted-foreground"
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          className="text-muted-foreground fill-muted-foreground"
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'oklch(var(--card))',
            borderColor: 'oklch(var(--border))',
            borderRadius: '8px',
            fontSize: '12px',
          }}
          labelStyle={{ fontWeight: 600 }}
        />
        <Area
          type="monotone"
          dataKey="proposals"
          name="생성된 제안서"
          stroke="oklch(0.55 0.22 255)"
          fillOpacity={1}
          fill="url(#colorProposals)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="conversions"
          name="계약 전환"
          stroke="oklch(0.65 0.18 145)"
          fillOpacity={1}
          fill="url(#colorConversions)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
