'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const data = [
  { industry: '병원/의료', rate: 75 },
  { industry: '법률', rate: 68 },
  { industry: '뷰티', rate: 82 },
  { industry: 'IT/SaaS', rate: 61 },
  { industry: '교육', rate: 55 },
  { industry: '쇼핑몰', rate: 70 },
]

const colors = [
  'oklch(0.55 0.22 255)',
  'oklch(0.60 0.20 255)',
  'oklch(0.50 0.24 255)',
  'oklch(0.65 0.18 255)',
  'oklch(0.55 0.20 260)',
  'oklch(0.58 0.21 250)',
]

export function ConversionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-border"
          horizontal={false}
        />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          className="text-muted-foreground fill-muted-foreground"
          axisLine={false}
          tickLine={false}
          unit="%"
        />
        <YAxis
          dataKey="industry"
          type="category"
          tick={{ fontSize: 11 }}
          className="text-muted-foreground fill-muted-foreground"
          axisLine={false}
          tickLine={false}
          width={70}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'oklch(var(--card))',
            borderColor: 'oklch(var(--border))',
            borderRadius: '8px',
            fontSize: '12px',
          }}
          formatter={(value: number) => [`${value}%`, '전환율']}
          cursor={{ fill: 'oklch(0.55 0.22 255 / 0.1)' }}
        />
        <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
