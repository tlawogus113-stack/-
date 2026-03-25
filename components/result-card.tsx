"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  compact?: boolean;
}

export function ResultCard({ title, icon: Icon, children, compact }: ResultCardProps) {
  return (
    <Card className={cn(
      "border-border/60 bg-card",
      compact && "border-border/40"
    )}>
      <CardHeader className={cn("pb-2", compact && "pb-1.5 pt-2.5 px-3")}>
        <CardTitle className={cn(
          "flex items-center gap-2 text-sm font-semibold text-foreground",
          compact && "text-xs"
        )}>
          <Icon className={cn("h-4 w-4 text-primary", compact && "h-3.5 w-3.5")} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("pt-0", compact && "pb-2.5 px-3")}>{children}</CardContent>
    </Card>
  );
}
