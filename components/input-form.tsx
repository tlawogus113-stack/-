"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  industries,
  adGoals,
  conversionTypes,
  painPoints,
  customerBehaviors,
  currentChannels,
  responseTypes,
  landingStatus,
  landingChecklist,
  exampleInputs,
} from "@/lib/rule-data";
import type { ProposalInput } from "@/lib/proposal-engine";
import { FileText, Sparkles, RotateCcw, Loader2, Stethoscope, ClipboardList } from "lucide-react";

interface InputFormProps {
  onGenerate: (input: ProposalInput) => void;
  onReset: () => void;
  isGenerating: boolean;
}

const initialFormState: ProposalInput = {
  advertiserName: "",
  industry: "",
  subIndustry: "",
  adGoal: "",
  conversionType: "",
  monthlyBudget: 0,
  targetAudience: "",
  region: "",
  productService: "",
  usp: "",
  painPoints: [],
  customerBehaviors: [],
  currentChannels: [],
  responseType: "",
  landingStatus: "",
  websiteUrl: "",
  currentAdCopy: "",
  landingChecklistItems: [],
};

export function InputForm({ onGenerate, onReset, isGenerating }: InputFormProps) {
  const [formData, setFormData] = useState<ProposalInput>(initialFormState);
  const [subIndustries, setSubIndustries] = useState<string[]>([]);

  useEffect(() => {
    if (formData.industry && industries[formData.industry]) {
      setSubIndustries(industries[formData.industry]);
      if (!industries[formData.industry].includes(formData.subIndustry)) {
        setFormData((prev) => ({ ...prev, subIndustry: "" }));
      }
    } else {
      setSubIndustries([]);
    }
  }, [formData.industry, formData.subIndustry]);

  const handleInputChange = (field: keyof ProposalInput, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (
    field: "painPoints" | "customerBehaviors" | "currentChannels" | "landingChecklistItems",
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] || []), value]
        : (prev[field] || []).filter((v) => v !== value),
    }));
  };

  const handleExampleInput = () => {
    const example = exampleInputs[Math.floor(Math.random() * exampleInputs.length)];
    setFormData(example as ProposalInput);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    onReset();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const isFormValid =
    formData.advertiserName &&
    formData.industry &&
    formData.subIndustry &&
    formData.adGoal &&
    formData.conversionType &&
    formData.monthlyBudget > 0 &&
    formData.targetAudience &&
    formData.region &&
    formData.productService &&
    formData.usp &&
    formData.painPoints.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 액션 버튼 */}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleExampleInput}
          className="gap-1.5 text-xs"
        >
          <FileText className="h-3.5 w-3.5" />
          예시 입력
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="gap-1.5 text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          초기화
        </Button>
      </div>

      {/* 광고주 기본 정보 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <ClipboardList className="h-4 w-4" />
            광고주 기본 정보
          </CardTitle>
          <CardDescription className="text-xs">필수 입력 항목입니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* 광고주명 */}
          <div className="space-y-1.5">
            <Label htmlFor="advertiserName" className="text-xs font-medium">광고주명 *</Label>
            <Input
              id="advertiserName"
              placeholder="예: 홍길동 인테리어"
              value={formData.advertiserName}
              onChange={(e) => handleInputChange("advertiserName", e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          {/* 업종 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">업종 대분류 *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => handleInputChange("industry", value)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(industries).map((industry) => (
                    <SelectItem key={industry} value={industry} className="text-sm">
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">세부 업종 *</Label>
              <Select
                value={formData.subIndustry}
                onValueChange={(value) => handleInputChange("subIndustry", value)}
                disabled={!formData.industry}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  {subIndustries.map((sub) => (
                    <SelectItem key={sub} value={sub} className="text-sm">
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 광고 목표 & 전환 유형 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">광고 목표 *</Label>
              <Select
                value={formData.adGoal}
                onValueChange={(value) => handleInputChange("adGoal", value)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  {adGoals.map((goal) => (
                    <SelectItem key={goal} value={goal} className="text-sm">
                      {goal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">전환 유형 *</Label>
              <Select
                value={formData.conversionType}
                onValueChange={(value) => handleInputChange("conversionType", value)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  {conversionTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-sm">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 월 예산 */}
          <div className="space-y-1.5">
            <Label htmlFor="monthlyBudget" className="text-xs font-medium">월 예산 (원) *</Label>
            <Input
              id="monthlyBudget"
              type="number"
              placeholder="예: 3000000"
              value={formData.monthlyBudget || ""}
              onChange={(e) =>
                handleInputChange("monthlyBudget", parseInt(e.target.value) || 0)
              }
              className="h-9 text-sm"
            />
            {formData.monthlyBudget > 0 && (
              <p className="text-xs text-muted-foreground">
                {new Intl.NumberFormat("ko-KR").format(formData.monthlyBudget)}원
              </p>
            )}
          </div>

          {/* 타겟 & 지역 */}
          <div className="space-y-1.5">
            <Label htmlFor="targetAudience" className="text-xs font-medium">주요 타겟 *</Label>
            <Input
              id="targetAudience"
              placeholder="예: 30~40대 신혼부부, 이사 예정자"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange("targetAudience", e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="region" className="text-xs font-medium">지역 *</Label>
            <Input
              id="region"
              placeholder="예: 서울 강남, 송파, 서초"
              value={formData.region}
              onChange={(e) => handleInputChange("region", e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          {/* 상품/서비스 & USP */}
          <div className="space-y-1.5">
            <Label htmlFor="productService" className="text-xs font-medium">상품/서비스 *</Label>
            <Input
              id="productService"
              placeholder="예: 아파트 인테리어, 신혼집 꾸미기"
              value={formData.productService}
              onChange={(e) => handleInputChange("productService", e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="usp" className="text-xs font-medium">핵심 강점/차별점 *</Label>
            <Input
              id="usp"
              placeholder="예: 15년 경력, 합리적인 가격, 1:1 맞춤 시공"
              value={formData.usp}
              onChange={(e) => handleInputChange("usp", e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          {/* 현재 고민 */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">현재 고민 * (1개 이상)</Label>
            <div className="grid grid-cols-1 gap-1.5">
              {painPoints.map((pain) => (
                <div key={pain} className="flex items-center space-x-2">
                  <Checkbox
                    id={`pain-${pain}`}
                    checked={formData.painPoints.includes(pain)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("painPoints", pain, checked as boolean)
                    }
                    className="h-3.5 w-3.5"
                  />
                  <label
                    htmlFor={`pain-${pain}`}
                    className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {pain}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 진단 정보 (신규) */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Stethoscope className="h-4 w-4" />
            진단 정보 (선택)
          </CardTitle>
          <CardDescription className="text-xs">
            입력 시 더 정확한 진단과 개선 방향을 제시합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* 홈페이지 URL */}
          <div className="space-y-1.5">
            <Label htmlFor="websiteUrl" className="text-xs font-medium">홈페이지 URL</Label>
            <Input
              id="websiteUrl"
              placeholder="https://example.com"
              value={formData.websiteUrl || ""}
              onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          {/* 현재 광고 문구 */}
          <div className="space-y-1.5">
            <Label htmlFor="currentAdCopy" className="text-xs font-medium">현재 광고 문구 (본 광고 카피)</Label>
            <Textarea
              id="currentAdCopy"
              placeholder="현재 사용 중인 광고 문구를 입력하세요"
              value={formData.currentAdCopy || ""}
              onChange={(e) => handleInputChange("currentAdCopy", e.target.value)}
              className="min-h-[60px] text-sm resize-none"
            />
          </div>

          {/* 랜딩페이지 체크리스트 */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">랜딩페이지 체크리스트</Label>
            <div className="grid grid-cols-2 gap-1.5">
              {landingChecklist.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={`landing-${item}`}
                    checked={(formData.landingChecklistItems || []).includes(item)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("landingChecklistItems", item, checked as boolean)
                    }
                    className="h-3.5 w-3.5"
                  />
                  <label
                    htmlFor={`landing-${item}`}
                    className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* 선택 입력 섹션 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">추가 정보 (선택)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* 고객 행동 특성 */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">고객 행동 특성</Label>
            <div className="grid grid-cols-2 gap-1.5">
              {customerBehaviors.map((behavior) => (
                <div key={behavior} className="flex items-center space-x-2">
                  <Checkbox
                    id={`behavior-${behavior}`}
                    checked={formData.customerBehaviors.includes(behavior)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "customerBehaviors",
                        behavior,
                        checked as boolean
                      )
                    }
                    className="h-3.5 w-3.5"
                  />
                  <label
                    htmlFor={`behavior-${behavior}`}
                    className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {behavior}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-2" />

          {/* 현재 운영 채널 */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">현재 운영 채널</Label>
            <div className="grid grid-cols-2 gap-1.5">
              {currentChannels.map((channel) => (
                <div key={channel} className="flex items-center space-x-2">
                  <Checkbox
                    id={`channel-${channel}`}
                    checked={formData.currentChannels.includes(channel)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "currentChannels",
                        channel,
                        checked as boolean
                      )
                    }
                    className="h-3.5 w-3.5"
                  />
                  <label
                    htmlFor={`channel-${channel}`}
                    className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {channel}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-2" />

          {/* 응대 방식 & 랜딩 상태 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">응대 방식</Label>
              <Select
                value={formData.responseType}
                onValueChange={(value) => handleInputChange("responseType", value)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  {responseTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-sm">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">랜딩 상태</Label>
              <Select
                value={formData.landingStatus}
                onValueChange={(value) => handleInputChange("landingStatus", value)}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  {landingStatus.map((status) => (
                    <SelectItem key={status} value={status} className="text-sm">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 제출 버튼 */}
      <Button
        type="submit"
        className="w-full gap-2"
        size="default"
        disabled={!isFormValid || isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            생성 중...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            제안서 생성
          </>
        )}
      </Button>
    </form>
  );
}
