"use client";

import { useState } from "react";
import { InputForm } from "@/components/input-form";
import { ResultPanel } from "@/components/result-panel";
import { generateProposal, type ProposalInput, type ProposalOutput } from "@/lib/proposal-engine";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileSpreadsheet } from "lucide-react";

export default function ProposalGenerator() {
  const [result, setResult] = useState<ProposalOutput | null>(null);
  const [advertiserName, setAdvertiserName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (input: ProposalInput) => {
    setIsGenerating(true);
    setAdvertiserName(input.advertiserName);
    
    // Simulate processing time for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const proposal = generateProposal(input);
    setResult(proposal);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setResult(null);
    setAdvertiserName("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-12 max-w-7xl items-center gap-2 px-4 lg:px-6">
          <FileSpreadsheet className="h-5 w-5 text-primary" />
          <h1 className="text-sm font-bold text-foreground">
            광고주 맞춤 제안서 생성기
          </h1>
          <span className="text-xs text-muted-foreground ml-2">
            퍼포먼스 마케팅 전문가용
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-6">
          <div className="grid gap-4 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]">
            {/* Left: Input Form */}
            <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4.5rem)] lg:self-start">
              <ScrollArea className="h-full pr-2">
                <div className="pb-4">
                  <InputForm
                    onGenerate={handleGenerate}
                    onReset={handleReset}
                    isGenerating={isGenerating}
                  />
                </div>
              </ScrollArea>
            </div>

            {/* Right: Result Panel */}
            <div className="min-h-[400px]">
              <ResultPanel result={result} advertiserName={advertiserName} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-6">
          <p className="text-center text-xs text-muted-foreground">
            내부 마케팅/영업용 제안서 생성 도구 | 실제 성과는 시장 상황에 따라 달라질 수 있습니다
          </p>
        </div>
      </footer>
    </div>
  );
}
