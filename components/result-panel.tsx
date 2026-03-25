"use client";

import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/result-card";
import { Badge } from "@/components/ui/badge";
import type { ProposalOutput, KeywordGroup } from "@/lib/proposal-engine";
import { formatKRW } from "@/lib/proposal-engine";
import {
  FileText,
  Megaphone,
  PieChart,
  Target,
  Palette,
  LayoutTemplate,
  TrendingUp,
  ListChecks,
  Lightbulb,
  Search,
  Copy,
  Check,
  Stethoscope,
  Globe,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

interface ResultPanelProps {
  result: ProposalOutput | null;
  advertiserName: string;
}

export function ResultPanel({ result, advertiserName }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
        <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
        <h3 className="mb-2 text-lg font-medium text-foreground">
          제안서가 여기에 표시됩니다
        </h3>
        <p className="text-sm text-muted-foreground">
          왼쪽 폼을 작성하고 &apos;제안서 생성&apos; 버튼을 클릭하세요
        </p>
      </div>
    );
  }

  const handleCopy = async () => {
    const text = generatePlainText(result, advertiserName);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          {advertiserName} 맞춤 제안서
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-1.5 text-xs"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              복사됨
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              결과 복사
            </>
          )}
        </Button>
      </div>

      {/* 진단 섹션 */}
      <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-900 dark:bg-amber-950/20">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-amber-800 dark:text-amber-200">
          <Stethoscope className="h-4 w-4" />
          광고 진단
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {/* 광고 진단 코멘트 */}
          <ResultCard title="광고 진단 코멘트" icon={Stethoscope} compact>
            <ul className="space-y-1.5">
              {result.adDiagnosis.map((item, index) => (
                <li key={index} className="text-xs leading-relaxed text-foreground/90">
                  {item}
                </li>
              ))}
            </ul>
          </ResultCard>

          {/* 랜딩 진단 요약 */}
          <ResultCard title="랜딩 진단 요약" icon={Globe} compact>
            <ul className="space-y-1.5">
              {result.landingDiagnosis.map((item, index) => (
                <li key={index} className="text-xs leading-relaxed text-foreground/90">
                  {item}
                </li>
              ))}
            </ul>
          </ResultCard>
        </div>
      </div>

      {/* 광고 문구 개선 방향 */}
      <ResultCard title="광고 문구 개선 방향" icon={MessageSquare}>
        <ul className="space-y-1.5">
          {result.copyImprovement.map((item, index) => (
            <li key={index} className="text-xs leading-relaxed text-foreground/90">
              {item}
            </li>
          ))}
        </ul>
      </ResultCard>

      {/* 1. 제안 요약 */}
      <ResultCard title="제안 요약" icon={FileText}>
        <p className="text-sm leading-relaxed text-foreground/90">
          {result.summary}
        </p>
      </ResultCard>

      {/* 2. 추천 채널 */}
      <ResultCard title="추천 채널" icon={Megaphone}>
        <div className="space-y-2">
          {result.channels.map((channel) => (
            <div
              key={channel.name}
              className="flex flex-col gap-1 rounded-md border border-border/40 bg-muted/30 p-2.5"
            >
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="h-5 w-5 shrink-0 items-center justify-center rounded-full p-0 text-xs font-medium"
                >
                  {channel.priority}
                </Badge>
                <span className="text-sm font-medium text-foreground">
                  {channel.name}
                </span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {channel.budgetRatio}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{channel.reason}</p>
            </div>
          ))}
        </div>
      </ResultCard>

      {/* 3. 예산 배분안 */}
      <ResultCard title="예산 배분안" icon={PieChart}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/40">
                <th className="pb-1.5 text-left font-medium text-muted-foreground">
                  채널
                </th>
                <th className="pb-1.5 text-right font-medium text-muted-foreground">
                  예산
                </th>
                <th className="pb-1.5 text-right font-medium text-muted-foreground">
                  비중
                </th>
                <th className="hidden pb-1.5 text-left font-medium text-muted-foreground sm:table-cell pl-3">
                  비고
                </th>
              </tr>
            </thead>
            <tbody>
              {result.budgetPlan.map((item) => (
                <tr key={item.channel} className="border-b border-border/20">
                  <td className="py-1.5 text-foreground">{item.channel}</td>
                  <td className="py-1.5 text-right font-medium text-foreground">
                    {formatKRW(item.amount)}
                  </td>
                  <td className="py-1.5 text-right text-muted-foreground">
                    {item.percentage}%
                  </td>
                  <td className="hidden py-1.5 text-muted-foreground sm:table-cell pl-3">
                    {item.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResultCard>

      {/* 4. 핵심 타겟 전략 */}
      <ResultCard title="핵심 타겟 전략" icon={Target}>
        <ul className="space-y-1.5">
          {result.targetStrategy.map((strategy, index) => (
            <li key={index} className="text-xs leading-relaxed text-foreground/90">
              {strategy}
            </li>
          ))}
        </ul>
      </ResultCard>

      {/* 5. 광고 소재 전략 */}
      <ResultCard title="광고 소재 전략" icon={Palette}>
        <ul className="space-y-1.5">
          {result.creativeStrategy.map((strategy, index) => (
            <li key={index} className="text-xs leading-relaxed text-foreground/90">
              {strategy}
            </li>
          ))}
        </ul>
      </ResultCard>

      {/* 6. 랜딩페이지 개선 포인트 */}
      <ResultCard title="랜딩페이지 개선 포인트" icon={LayoutTemplate}>
        <ul className="space-y-1.5">
          {result.landingStrategy.map((strategy, index) => (
            <li key={index} className="text-xs leading-relaxed text-foreground/90">
              {strategy}
            </li>
          ))}
        </ul>
      </ResultCard>

      {/* 7. KPI 가이드 */}
      <ResultCard title="KPI 가이드" icon={TrendingUp}>
        <div className="space-y-2">
          {result.kpiGuide.map((kpi) => (
            <div
              key={kpi.metric}
              className="flex flex-col gap-0.5 rounded-md border border-border/40 bg-muted/30 p-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{kpi.metric}</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {kpi.range}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{kpi.note}</p>
            </div>
          ))}
        </div>
      </ResultCard>

      {/* 8. 실행 우선순위 */}
      <ResultCard title="실행 우선순위" icon={ListChecks}>
        <div className="space-y-1.5">
          {result.actionPlan.map((action) => (
            <div
              key={action.priority}
              className="flex items-start gap-2 rounded-md border border-border/40 bg-muted/30 p-2"
            >
              <Badge
                variant="outline"
                className="mt-0.5 h-5 w-5 shrink-0 items-center justify-center rounded-full p-0 text-xs font-medium"
              >
                {action.priority}
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground leading-relaxed">
                  {action.action}
                </p>
                <p className="text-xs text-muted-foreground">
                  {action.timeline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ResultCard>

      {/* 9. 업종 맞춤 핵심 포인트 */}
      <ResultCard title="업종 맞춤 핵심 포인트" icon={Lightbulb}>
        <ul className="space-y-1.5">
          {result.industryPoints.map((point, index) => (
            <li key={index} className="text-xs leading-relaxed text-foreground/90">
              {point}
            </li>
          ))}
        </ul>
      </ResultCard>

      {/* 10. 추천 키워드 방향 (그룹화) */}
      <ResultCard title="추천 키워드 방향" icon={Search}>
        <div className="space-y-3">
          {result.keywordDirection.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">{group.category}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.keywords.map((keyword, keywordIndex) => (
                  <Badge
                    key={keywordIndex}
                    variant={group.category === "제외 키워드" ? "destructive" : "secondary"}
                    className="text-xs font-normal"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{group.note}</p>
            </div>
          ))}
        </div>
      </ResultCard>
    </div>
  );
}

function generatePlainText(result: ProposalOutput, advertiserName: string): string {
  let text = `[${advertiserName} 맞춤 제안서]\n\n`;

  // 진단 섹션
  text += `■ 광고 진단 코멘트\n`;
  result.adDiagnosis.forEach((item) => (text += `${item}\n`));
  text += "\n";

  text += `■ 랜딩 진단 요약\n`;
  result.landingDiagnosis.forEach((item) => (text += `${item}\n`));
  text += "\n";

  text += `■ 광고 문구 개선 방향\n`;
  result.copyImprovement.forEach((item) => (text += `${item}\n`));
  text += "\n";

  text += `■ 제안 요약\n${result.summary}\n\n`;

  text += `■ 추천 채널\n`;
  result.channels.forEach((ch) => {
    text += `${ch.priority}. ${ch.name} (${ch.budgetRatio}%)\n   - ${ch.reason}\n`;
  });
  text += "\n";

  text += `■ 예산 배분안\n`;
  result.budgetPlan.forEach((item) => {
    text += `- ${item.channel}: ${formatKRW(item.amount)} (${item.percentage}%) - ${item.note}\n`;
  });
  text += "\n";

  text += `■ 핵심 타겟 전략\n`;
  result.targetStrategy.forEach((s) => (text += `${s}\n`));
  text += "\n";

  text += `■ 광고 소재 전략\n`;
  result.creativeStrategy.forEach((s) => (text += `${s}\n`));
  text += "\n";

  text += `■ 랜딩페이지 개선 포인트\n`;
  result.landingStrategy.forEach((s) => (text += `${s}\n`));
  text += "\n";

  text += `■ KPI 가이드\n`;
  result.kpiGuide.forEach((kpi) => {
    text += `- ${kpi.metric}: ${kpi.range} (${kpi.note})\n`;
  });
  text += "\n";

  text += `■ 실행 우선순위\n`;
  result.actionPlan.forEach((a) => {
    text += `${a.priority}. ${a.action} (${a.timeline})\n`;
  });
  text += "\n";

  text += `■ 업종 맞춤 핵심 포인트\n`;
  result.industryPoints.forEach((p) => (text += `${p}\n`));
  text += "\n";

  text += `■ 추천 키워드 방향\n`;
  result.keywordDirection.forEach((group) => {
    text += `[${group.category}] ${group.keywords.join(", ")}\n  - ${group.note}\n`;
  });

  return text;
}
