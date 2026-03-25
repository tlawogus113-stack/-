import {
  BudgetLevel,
  Archetype,
  industryChannelPriority,
  industryKpiRanges,
  industryStrategies,
  conversionStrategies,
  painPointSolutions,
  archetypeKeywords,
  budgetLevelLabels,
} from "./rule-data";

export interface ProposalInput {
  advertiserName: string;
  industry: string;
  subIndustry: string;
  adGoal: string;
  conversionType: string;
  monthlyBudget: number;
  targetAudience: string;
  region: string;
  productService: string;
  usp: string;
  painPoints: string[];
  customerBehaviors: string[];
  currentChannels: string[];
  responseType: string;
  landingStatus: string;
  // 신규 진단 입력
  websiteUrl?: string;
  currentAdCopy?: string;
  landingChecklistItems?: string[];
}

export interface ProposalOutput {
  summary: string;
  channels: { name: string; priority: number; reason: string; budgetRatio: number }[];
  budgetPlan: { channel: string; amount: number; percentage: number; note: string }[];
  targetStrategy: string[];
  creativeStrategy: string[];
  landingStrategy: string[];
  kpiGuide: { metric: string; range: string; note: string }[];
  actionPlan: { priority: number; action: string; timeline: string }[];
  industryPoints: string[];
  keywordDirection: KeywordGroup[];
  // 신규 진단 섹션
  adDiagnosis: string[];
  landingDiagnosis: string[];
  copyImprovement: string[];
}

export interface KeywordGroup {
  category: string;
  keywords: string[];
  note: string;
}

// 세부업종별 깊은 전략 데이터
const subIndustryDeepStrategies: Record<string, {
  marketContext: string;
  customerJourney: string;
  decisionFactors: string[];
  objectionHandling: string[];
  competitiveAngle: string;
  messagingTone: string;
  ctaStyle: string;
  trustBuilders: string[];
  seasonalPeak: string | null;
  averageTicket: string;
  conversionWindow: string;
}> = {
  // 인테리어/시공
  "주거 인테리어": {
    marketContext: "신혼부부와 이사 예정자가 주 타겟, 포트폴리오와 견적 투명성이 계약 결정 요인",
    customerJourney: "검색 → 여러 업체 비교 → 상담 요청 → 현장 방문 → 견적 비교 → 계약",
    decisionFactors: ["시공 사례/포트폴리오", "견적 투명성", "디자인 감각", "시공 기간", "AS 보장"],
    objectionHandling: ["예산 초과 우려 → 단계별 시공, 예산 맞춤 설계", "시공 품질 우려 → 시공 사례, 계약서 명시", "일정 지연 우려 → 공정표 공유, 지연 시 패널티"],
    competitiveAngle: "특정 스타일(모던, 북유럽 등) 또는 예산대별 전문화",
    messagingTone: "따뜻하고 신뢰감 있는 톤, 고객의 꿈을 실현하는 파트너 포지셔닝",
    ctaStyle: "무료 상담 예약 / 3D 시안 무료 제공",
    trustBuilders: ["시공 전후 사진", "고객 인터뷰 영상", "견적서 샘플", "AS 보증서"],
    seasonalPeak: "이사 시즌(2~3월, 8~9월)",
    averageTicket: "1,500만원~5,000만원",
    conversionWindow: "첫 상담 후 2~4주 내 계약",
  },
  "상업 인테리어": {
    marketContext: "창업자와 점포 리뉴얼 수요, 빠른 공사 기간과 영업 중단 최소화가 핵심",
    customerJourney: "창업 결정 → 업체 검색 → 상담 → 현장 실측 → 디자인 협의 → 계약 → 시공",
    decisionFactors: ["업종별 시공 경험", "공사 기간", "가격", "매출 동선 설계", "인허가 대행"],
    objectionHandling: ["영업 중단 우려 → 야간/주말 시공", "예산 문제 → 단계별 시공", "디자인 불일치 → 3D 시안 확정 후 진행"],
    competitiveAngle: "특정 업종(카페, 음식점, 병원 등) 시공 전문화",
    messagingTone: "비즈니스적이고 효율 중심, 매출 증대를 도와주는 파트너",
    ctaStyle: "무료 현장 실측 / 업종별 성공 사례 확인",
    trustBuilders: ["업종별 시공 사례", "오픈 후 매출 후기", "공사 기간 준수율", "인허가 완료 사례"],
    seasonalPeak: "창업 시즌(봄/가을)",
    averageTicket: "3,000만원~1억원",
    conversionWindow: "첫 상담 후 1~3주 내 계약",
  },
  "리모델링": {
    marketContext: "노후 주택 소유자, 구조 변경 니즈, 인허가와 구조 안전이 핵심 관심사",
    customerJourney: "리모델링 필요 인식 → 가능 범위 조사 → 업체 탐색 → 상담 → 설계 → 인허가 → 계약",
    decisionFactors: ["구조 변경 가능 여부", "인허가 경험", "시공 사례", "견적", "공사 기간"],
    objectionHandling: ["구조 안전 우려 → 구조 진단 포함", "인허가 복잡 → 원스톱 대행", "장기간 우려 → 임시 거주 솔루션"],
    competitiveAngle: "노후 아파트/빌라 리모델링 또는 특정 구조 전문화",
    messagingTone: "전문적이고 안심시키는 톤, 복잡한 과정을 쉽게 해결",
    ctaStyle: "무료 구조 진단 / 리모델링 가능 범위 상담",
    trustBuilders: ["비포/애프터 사례", "인허가 완료 사례", "구조 안전 인증", "전문가 자격"],
    seasonalPeak: "봄/가을 리모델링 시즌",
    averageTicket: "5,000만원~2억원",
    conversionWindow: "첫 상담 후 1~2개월",
  },
  // 철거/원상복구
  "원상복구": {
    marketContext: "임대차 종료 전 보증금 반환 목적, 신속한 처리와 깔끔한 마무리가 핵심",
    customerJourney: "계약 종료 인지 → 원상복구 필요 확인 → 업체 검색 → 즉시 견적 → 빠른 계약",
    decisionFactors: ["가격", "속도", "깔끔한 마무리", "폐기물 처리 포함", "보증금 환급 경험"],
    objectionHandling: ["추가 비용 우려 → 올인클루시브 견적", "마감 품질 우려 → 임대인 컨펌 사례", "일정 급함 → 당일/익일 처리"],
    competitiveAngle: "임대인/관리사무소 협의 경험, 보증금 100% 환급 사례",
    messagingTone: "직접적이고 해결 중심, 빠르고 확실한 처리 약속",
    ctaStyle: "지금 전화 / 카톡 즉시 견적 / 오늘 방문 가능",
    trustBuilders: ["보증금 환급 성공 사례", "당일 완료 후기", "깔끔한 마감 사진", "보험 가입 증명"],
    seasonalPeak: "이사 시즌, 계약 만료 시즌(2월, 8월)",
    averageTicket: "50만원~300만원",
    conversionWindow: "문의 당일~3일 내 계약",
  },
  "상가 철거": {
    marketContext: "폐업 또는 업종 전환 시 필요, 비용 최소화와 빠른 처리가 핵심",
    customerJourney: "폐업/이전 결정 → 철거 필요 인식 → 업체 검색 → 견적 비교 → 빠른 계약",
    decisionFactors: ["견적 속도", "처리 비용", "폐기물 포함 여부", "일정", "보험"],
    objectionHandling: ["비용 부담 → 폐기물 분리로 비용 절감", "일정 촉박 → 당일 착수 가능", "대형 규모 → 장비 보유 증명"],
    competitiveAngle: "대형 상가/특수 폐기물 처리 경험",
    messagingTone: "빠르고 명쾌한 톤, 즉각적인 문제 해결",
    ctaStyle: "무료 견적 전화 / 지금 바로 상담 / 오늘 방문",
    trustBuilders: ["대형 철거 사례", "당일 처리 후기", "보험 가입", "폐기물 정식 처리 증명"],
    seasonalPeak: "폐업 증가 시기, 연말/연초",
    averageTicket: "100만원~1,000만원",
    conversionWindow: "문의 당일~2일 내 계약",
  },
  // 문의형 서비스업
  "법률 상담": {
    marketContext: "법적 분쟁이나 예방 상담 필요, 전문성과 신뢰가 최우선 결정 요인",
    customerJourney: "법률 문제 인식 → 검색 → 여러 변호사 비교 → 무료 상담 → 본 상담 → 위임",
    decisionFactors: ["전문 분야 일치", "경력/성공 사례", "상담 품질", "비용", "신뢰감"],
    objectionHandling: ["비용 부담 → 착수금 분할/성공 보수", "결과 불확실 → 유사 사례 설명", "소통 우려 → 담당자 직통 연락"],
    competitiveAngle: "특정 분야(이혼, 형사, 부동산 등) 전문화, 승소율 강조",
    messagingTone: "전문적이고 안심시키는 톤, 법률 전문가로서의 권위",
    ctaStyle: "무료 법률 상담 / 사례 분석 요청 / 비밀 상담",
    trustBuilders: ["승소 사례", "변호사 경력", "언론 인터뷰", "협회 인증", "고객 후기"],
    seasonalPeak: null,
    averageTicket: "200만원~5,000만원",
    conversionWindow: "첫 상담 후 1~2주 내 위임",
  },
  "세무/노무": {
    marketContext: "사업자 대상, 절세와 리스크 관리 니즈, 전문성과 대응 속도가 핵심",
    customerJourney: "세무/노무 이슈 발생 → 검색 → 상담 → 서비스 범위 확인 → 계약",
    decisionFactors: ["전문성", "비용", "대응 속도", "업종 이해도", "사후 관리"],
    objectionHandling: ["비용 우려 → 기장료 구조 설명", "소통 불안 → 담당자 배정", "전문성 의심 → 업종별 사례"],
    competitiveAngle: "특정 업종/규모 전문화, IT 기반 편의성",
    messagingTone: "실용적이고 비즈니스적인 톤",
    ctaStyle: "무료 세무 진단 / 절세 상담 신청",
    trustBuilders: ["절세 사례", "자격증", "고객사 리스트", "신속 응대 후기"],
    seasonalPeak: "신고 시즌(5월 종소세, 1월 부가세)",
    averageTicket: "월 10만원~100만원",
    conversionWindow: "상담 후 1~2주 내 계약",
  },
  "수리/설비": {
    marketContext: "긴급한 수리 니즈가 많고, 빠른 출동과 합리적 가격이 핵심",
    customerJourney: "문제 발생 → 급한 검색 → 즉시 연락 → 출동 → 현장 견적 → 수리",
    decisionFactors: ["출동 속도", "가격", "전문성", "후기", "24시간 가능"],
    objectionHandling: ["바가지 우려 → 사전 견적 안내", "기술 의심 → 자격/경력", "재발 우려 → AS 보장"],
    competitiveAngle: "특정 분야(누수, 보일러, 에어컨 등) 전문화, 24시간 출동",
    messagingTone: "빠르고 신뢰감 있는 톤, 즉각적인 문제 해결",
    ctaStyle: "지금 전화 / 즉시 출동 / 24시간 상담",
    trustBuilders: ["출동 후기", "자격증", "AS 보장", "투명한 가격표"],
    seasonalPeak: "여름(에어컨), 겨울(보일러)",
    averageTicket: "5만원~100만원",
    conversionWindow: "문의 즉시~당일",
  },
  // 쇼핑몰/이커머스
  "패션": {
    marketContext: "트렌드와 착용감 중시, 리뷰와 사이즈 정보가 구매 결정 요인",
    customerJourney: "트렌드 인지 → 검색/SNS 발견 → 상품 탐색 → 리뷰 확인 → 구매",
    decisionFactors: ["디자인/트렌드", "가격", "리뷰/착용샷", "사이즈 정보", "배송 속도"],
    objectionHandling: ["사이즈 불안 → 상세 사이즈표/무료 반품", "품질 의심 → 소재 정보/리뷰", "가격 민감 → 쿠폰/적립금"],
    competitiveAngle: "타겟 연령/스타일 특화, 자체 제작/독점",
    messagingTone: "트렌디하고 감각적인 톤",
    ctaStyle: "지금 구매 / 오늘만 할인 / 무료배송",
    trustBuilders: ["착용 리뷰", "상세 사이즈", "반품 정책", "인플루언서 착용"],
    seasonalPeak: "시즌 전환기, 명절, 블랙프라이데이",
    averageTicket: "3만원~10만원",
    conversionWindow: "즉시~3일",
  },
  "뷰티": {
    marketContext: "성분과 피부 타입 적합성 중시, 리뷰가 구매 결정에 결정적",
    customerJourney: "피부 고민 → 제품 검색 → 성분/리뷰 확인 → 샘플/소용량 테스트 → 본품 구매",
    decisionFactors: ["성분", "피부 타입 적합성", "리뷰", "가격", "브랜드"],
    objectionHandling: ["피부 트러블 우려 → 성분 안전성/테스트 결과", "효과 의심 → 비포/애프터 리뷰", "가격 민감 → 세트 할인"],
    competitiveAngle: "특정 피부 타입/고민 전문화, 더마코스메틱",
    messagingTone: "전문적이면서 공감하는 톤",
    ctaStyle: "샘플 신청 / 피부 타입 테스트 / 지금 구매",
    trustBuilders: ["성분 인증", "피부과 추천", "비포/애프터", "실사용 리뷰"],
    seasonalPeak: "환절기, 여름/겨울",
    averageTicket: "2만원~8만원",
    conversionWindow: "즉시~1주",
  },
  "식품": {
    marketContext: "맛과 신선도, 건강이 핵심, 재구매율이 높은 카테고리",
    customerJourney: "음식 니즈 → 검색/추천 → 리뷰 확인 → 구매 → 재구매",
    decisionFactors: ["맛", "신선도", "가격", "원산지", "리뷰", "배송"],
    objectionHandling: ["신선도 우려 → 당일 발송/냉장 배송", "맛 불안 → 리뷰/소량 구매", "가격 민감 → 대용량 할인"],
    competitiveAngle: "건강/유기농 또는 맛집 배송 특화",
    messagingTone: "맛있고 건강한 이미지, 신뢰감",
    ctaStyle: "지금 주문 / 첫 구매 할인 / 정기 배송",
    trustBuilders: ["원산지 정보", "HACCP 인증", "실제 리뷰", "신선도 보장"],
    seasonalPeak: "명절, 다이어트 시즌",
    averageTicket: "2만원~5만원",
    conversionWindow: "즉시~3일",
  },
};

// 헬퍼 함수들
export function formatKRW(value: number): string {
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(1)}억원`;
  }
  if (value >= 10000) {
    return `${Math.round(value / 10000)}만원`;
  }
  return `${value.toLocaleString()}원`;
}

// 예산 레벨 계산
export function getBudgetLevel(budget: number): BudgetLevel {
  if (budget < 1000000) return "low";
  if (budget < 3000000) return "mid-low";
  if (budget < 5000000) return "mid";
  return "high";
}

// 향상된 아키타입 감지
export function detectArchetype(productService: string, usp: string, currentAdCopy?: string): Archetype {
  const text = `${productService} ${usp} ${currentAdCopy || ""}`.toLowerCase();
  
  // 우선순위에 따라 검사
  const archetypePriority: Archetype[] = ["expert-led", "premium", "urgent", "review-based", "comparison-driven", "value"];
  
  for (const archetype of archetypePriority) {
    const keywords = archetypeKeywords[archetype];
    if (keywords.some(keyword => text.includes(keyword))) {
      return archetype;
    }
  }
  return "standard";
}

// 가중치 기반 주요 고민 포인트 추출
export function getWeightedPainPoints(painPoints: string[]): { primary: string | null; secondary: string | null; category: string } {
  if (painPoints.length === 0) return { primary: null, secondary: null, category: "general" };
  
  const sorted = [...painPoints].sort((a, b) => {
    const weightA = painPointSolutions[a]?.weight ?? 0;
    const weightB = painPointSolutions[b]?.weight ?? 0;
    return weightB - weightA;
  });
  
  const primary = sorted[0];
  const secondary = sorted.length > 1 ? sorted[1] : null;
  const category = painPointSolutions[primary]?.category || "general";
  
  return { primary, secondary, category };
}

// USP 파싱 - 핵심 가치 추출
function parseUSP(usp: string): { mainValue: string; supportingPoints: string[]; keywords: string[] } {
  const parts = usp.split(/[,،、\/]/).map(p => p.trim()).filter(Boolean);
  const keywords = usp.match(/\d+년|\d+건|\d+%|무료|전문|경력|보장|인증|수상/g) || [];
  return {
    mainValue: parts[0] || usp,
    supportingPoints: parts.slice(1),
    keywords,
  };
}

// 상품/서비스 파싱
function parseProducts(productService: string): string[] {
  return productService.split(/[,،、\/]/).map(p => p.trim()).filter(Boolean);
}

// 타겟 파싱
function parseTargetAudience(target: string): { demographics: string; psychographics: string | null } {
  const parts = target.split(/[,،、]/).map(p => p.trim());
  return {
    demographics: parts[0] || target,
    psychographics: parts[1] || null,
  };
}

// 지역 파싱
function parseRegion(region: string): string[] {
  return region.split(/[,،、]/).map(r => r.trim()).filter(Boolean);
}

// ========================================
// 제안 요약 생성 - 업종별 완전 차별화
// ========================================
export function generateSummary(input: ProposalInput): string {
  const budgetLevel = getBudgetLevel(input.monthlyBudget);
  const archetype = detectArchetype(input.productService, input.usp, input.currentAdCopy);
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const parsedUSP = parseUSP(input.usp);
  const products = parseProducts(input.productService);
  const painPointInfo = getWeightedPainPoints(input.painPoints);
  const regions = parseRegion(input.region);
  
  let summary = "";
  
  // 업종별 완전히 다른 도입부
  if (input.industry === "인테리어/시공") {
    summary = `${input.advertiserName}은 ${regions[0]} 지역에서 ${input.subIndustry}을 전문으로 하며, "${parsedUSP.mainValue}"를 핵심 강점으로 내세웁니다. `;
    summary += subStrategy 
      ? `${input.subIndustry} 시장에서 고객은 ${subStrategy.decisionFactors.slice(0, 3).join(", ")}을 가장 중요하게 봅니다. `
      : "";
    summary += `따라서 ${input.advertiserName}의 마케팅은 포트폴리오와 신뢰 구축을 중심으로, "${parsedUSP.mainValue}"가 이러한 기대를 어떻게 충족하는지 명확히 전달하는 것이 핵심입니다.`;
    
  } else if (input.industry === "철거/원상복구") {
    summary = `${input.advertiserName}은 ${regions.join(", ")} 지역에서 ${input.subIndustry} 서비스를 제공합니다. `;
    summary += subStrategy 
      ? `${input.subIndustry}을 찾는 고객은 대부분 시간에 쫓기며, "${subStrategy.decisionFactors.slice(0, 2).join("과 ")}"가 계약 결정의 핵심입니다. `
      : "";
    summary += `"${parsedUSP.mainValue}"라는 강점은 이러한 긴급 수요에 정확히 부합하므로, 직접 전화/문의를 유도하는 다이렉트 리스폰스 전략을 중심으로 운영합니다.`;
    
  } else if (input.industry === "문의형 서비스업") {
    summary = `${input.advertiserName}은 ${input.subIndustry} 분야에서 ${products.slice(0, 2).join(", ")} 서비스를 제공합니다. `;
    summary += subStrategy 
      ? `${input.subIndustry} 고객의 구매 여정은 "${subStrategy.customerJourney.split("→").slice(0, 3).join(" → ")}"로 진행되며, `
      : "";
    summary += `이 과정에서 "${parsedUSP.mainValue}"를 신뢰 요소로 활용하여 상담 전환을 유도합니다. 리드 품질 관리가 매출 직결이므로, 양질의 문의만 유입되도록 타겟과 메시지를 정밀하게 설계합니다.`;
    
  } else if (input.industry === "쇼핑몰/이커머스") {
    summary = `${input.advertiserName}의 ${input.subIndustry} 쇼핑몰은 ${products.slice(0, 2).join(", ")}을 주력으로 판매합니다. `;
    summary += subStrategy 
      ? `${input.subIndustry} 카테고리에서 고객은 ${subStrategy.decisionFactors.slice(0, 3).join(", ")}을 기준으로 구매를 결정합니다. `
      : "";
    summary += `"${parsedUSP.mainValue}"를 PDP와 광고 소재에 일관되게 노출하고, ROAS 중심의 퍼포먼스 마케팅으로 ${input.adGoal}을 달성합니다.`;
    
  } else if (input.industry === "병원/의원") {
    summary = `${input.advertiserName}(${input.subIndustry})은 ${regions[0]}에서 ${products[0] || "전문 진료"}를 제공합니다. `;
    summary += subStrategy 
      ? `${input.subIndustry} 환자는 "${subStrategy.customerJourney.split("→")[0]}" 후 여러 병원을 비교하며, ${subStrategy.decisionFactors.slice(0, 2).join("과 ")}가 선택의 핵심입니다. `
      : "";
    summary += `"${parsedUSP.mainValue}"를 신뢰 요소로 활용하여 예약 전환을 유도하되, 의료광고 규정을 준수합니다.`;
    
  } else {
    // 기타 업종 기본 템플릿
    summary = `${input.advertiserName}은 ${regions[0]}에서 ${input.productService}를 제공하며, ${input.targetAudience}을 주요 타겟으로 합니다. `;
    summary += `"${parsedUSP.mainValue}"를 핵심 차별점으로 ${input.adGoal}을 목표로 합니다.`;
  }
  
  // 예산 수준별 전략 방향 (구체적 이유 포함)
  const budgetStrategy: Record<BudgetLevel, string> = {
    low: ` 월 ${formatKRW(input.monthlyBudget)} 예산 규모에서는 채널 분산 시 각 채널별 학습 데이터가 부족해지므로, 가장 전환 효율이 높은 핵심 채널 1~2개에 집중 투자합니다.`,
    "mid-low": ` 월 ${formatKRW(input.monthlyBudget)} 예산으로 2~3개 채널 운영이 가능하나, 각 채널별 최소 일예산 확보를 위해 우선순위를 명확히 합니다.`,
    mid: ` 월 ${formatKRW(input.monthlyBudget)} 예산은 다채널 테스트와 최적화가 가능한 수준이므로, 검색광고를 기반으로 디스플레이/SNS 채널을 점진적으로 확장합니다.`,
    high: ` 월 ${formatKRW(input.monthlyBudget)} 예산 규모에서는 브랜딩과 퍼포먼스를 병행할 수 있으므로, 검색 점유율 확보와 함께 잠재 고객 풀 확장에 투자합니다.`,
  };
  
  summary += budgetStrategy[budgetLevel];
  
  // 핵심 고민 포인트 기반 전략 방향 (구체적 근거)
  if (painPointInfo.primary) {
    const painSolution = painPointSolutions[painPointInfo.primary];
    if (painSolution) {
      summary += ` 현재 "${painPointInfo.primary}" 문제의 근본 원인은 ${painSolution.rootCause}로 판단되며, ${painSolution.solution}을 최우선으로 진행합니다.`;
    }
  }
  
  return summary;
}

// ========================================
// 광고 진단 코멘트 생성 (신규)
// ========================================
export function generateAdDiagnosis(input: ProposalInput): string[] {
  const painPointInfo = getWeightedPainPoints(input.painPoints);
  const archetype = detectArchetype(input.productService, input.usp, input.currentAdCopy);
  const parsedUSP = parseUSP(input.usp);
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  
  const diagnosis: string[] = [];
  
  // 1. 문제 유형 진단
  const categoryLabels: Record<string, string> = {
    traffic: "유입 문제",
    conversion: "전환 문제",
    quality: "리드 품질/효율 문제",
    messaging: "메시지/소재 문제",
    general: "종합적 검토 필요",
  };
  
  diagnosis.push(`[진단 유형] ${categoryLabels[painPointInfo.category]} - ${painPointInfo.primary || "선택된 고민 없음"}`);
  
  // 2. 주요 고민별 상세 진단
  if (painPointInfo.primary === "전환(문의/구매)이 적음") {
    diagnosis.push(`[핵심 이슈] 광고 유입은 발생하나 ${input.conversionType}으로 연결되지 않는 상황입니다.`);
    diagnosis.push(`[가능한 원인] 1) 랜딩페이지에서 "${parsedUSP.mainValue}" 가치가 명확히 전달되지 않음 2) CTA가 약하거나 찾기 어려움 3) 광고 메시지와 랜딩 내용 불일치`);
    diagnosis.push(`[우선 조치] 랜딩페이지 상단 3초 내 가치 전달 여부 점검, CTA 버튼 위치/문구 강화`);
    
  } else if (painPointInfo.primary === "유입은 있으나 이탈이 많음") {
    diagnosis.push(`[핵심 이슈] 트래픽은 확보되나 페이지 이탈률이 높아 광고비 손실 발생 중입니다.`);
    diagnosis.push(`[가능한 원인] 1) 광고 소재와 랜딩 콘텐츠 불일치 2) 페이지 로딩 속도 3) 모바일 UX 문제 4) 타겟 정합성 낮음`);
    diagnosis.push(`[우선 조치] 광고 소재의 약속과 랜딩 내용 일치 여부 점검, 페이지 속도 측정(3초 이내 권장)`);
    
  } else if (painPointInfo.primary === "광고비 대비 효율이 낮음") {
    diagnosis.push(`[핵심 이슈] ROAS/CPA 기준 광고 효율이 목표치에 미달합니다.`);
    diagnosis.push(`[가능한 원인] 1) 저효율 키워드/타겟에 예산 분산 2) 입찰 전략 비효율 3) 전환 추적 미비로 최적화 불가`);
    diagnosis.push(`[우선 조치] 지난 30일 키워드별 CPA 분석 → 상위 20% 키워드에 예산 집중`);
    
  } else if (painPointInfo.primary === "문의는 오지만 계약이 안 됨") {
    diagnosis.push(`[핵심 이슈] 광고를 통한 문의는 발생하나 실제 계약/매출로 이어지지 않습니다.`);
    diagnosis.push(`[가능한 원인] 1) 리드 품질 문제 - 구매 의도 낮은 유저 유입 2) 상담 프로세스 문제 3) 경쟁사 대비 가격/조건 열위`);
    if (subStrategy) {
      diagnosis.push(`[업종 특성] ${input.subIndustry}에서 계약 결정 요인은 ${subStrategy.decisionFactors.slice(0, 3).join(", ")}입니다. 이 요소들이 상담 과정에서 충분히 전달되는지 점검하세요.`);
    }
    diagnosis.push(`[우선 조치] 문의 유입 키워드 분석으로 의도 파악, 랜딩에 사전 필터링 질문 추가`);
    
  } else if (painPointInfo.primary === "타겟 고객 도달이 어려움") {
    diagnosis.push(`[핵심 이슈] 광고 노출량이 부족하거나 원하는 타겟에게 도달하지 못합니다.`);
    diagnosis.push(`[가능한 원인] 1) 키워드 커버리지 부족 2) 타겟 설정 범위 협소 3) 예산 대비 경쟁 과다`);
    diagnosis.push(`[우선 조치] 롱테일 키워드 확장, ${input.region} 지역 + ${input.subIndustry} 조합 키워드 추가`);
    
  } else if (painPointInfo.primary === "경쟁사 대비 노출이 부족") {
    diagnosis.push(`[핵심 이슈] 동일 키워드에서 경쟁사 대비 광고 노출 순위가 낮습니다.`);
    diagnosis.push(`[가능한 원인] 1) 입찰가 경쟁력 부족 2) 광고 품질점수 낮음 3) 예산 소진으로 노출 중단`);
    diagnosis.push(`[우선 조치] 핵심 전환 키워드 5~10개 선정 → 해당 키워드 입찰가 상향 및 소재 품질 개선`);
  }
  
  // 3. 현재 광고 카피 분석 (있는 경우)
  if (input.currentAdCopy) {
    diagnosis.push(`[현재 광고 문구 분석] "${input.currentAdCopy}"`);
    
    // USP 포함 여부 체크
    const uspInCopy = parsedUSP.keywords.some(k => input.currentAdCopy!.includes(k));
    if (!uspInCopy) {
      diagnosis.push(`→ 핵심 USP("${parsedUSP.mainValue}")가 광고 문구에 직접 노출되지 않음. 클릭 유도력 약화 가능성.`);
    }
    
    // 아키타입 정합성 체크
    if (archetype === "urgent" && !input.currentAdCopy.match(/당일|즉시|바로|빠른|오늘/)) {
      diagnosis.push(`→ ${input.subIndustry}은 긴급 수요가 많으나 광고 문구에 즉시성 표현이 부족합니다.`);
    }
    
    if (archetype === "expert-led" && !input.currentAdCopy.match(/전문|경력|자격|인증/)) {
      diagnosis.push(`→ 전문성 기반 USP이나 광고 문구에 전문가 요소가 부각되지 않습니다.`);
    }
  }
  
  return diagnosis;
}

// ========================================
// 랜딩 진단 요약 생성 (신규)
// ========================================
export function generateLandingDiagnosis(input: ProposalInput): string[] {
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const conversionStrategy = conversionStrategies[input.conversionType];
  const checklist = input.landingChecklistItems || [];
  const painPointInfo = getWeightedPainPoints(input.painPoints);
  const parsedUSP = parseUSP(input.usp);
  
  const diagnosis: string[] = [];
  
  // 1. 랜딩 상태별 기본 진단
  const statusDiagnosis: Record<string, string> = {
    "자체 웹사이트 있음": "자체 웹사이트 운영 중 - 전환 최적화 여부 점검 필요",
    "스마트스토어 운영 중": "스마트스토어 기반 - 상세페이지 품질과 리뷰 관리가 핵심",
    "플레이스만 있음": "플레이스만 운영 - 전환용 랜딩페이지 신규 제작 강력 권장",
    "랜딩페이지 없음": "랜딩페이지 부재 - 광고 집행 전 랜딩페이지 제작 필수",
    "개선 예정": "랜딩페이지 개선 예정 - 전환 중심 개선 방향 수립 필요",
  };
  
  diagnosis.push(`[현재 상태] ${statusDiagnosis[input.landingStatus] || "상태 확인 필요"}`);
  
  // 2. 체크리스트 기반 진단
  const allCheckItems = ["CTA 명확함", "후기/사례 있음", "가격/견적 안내 있음", "문의폼 간단함", "모바일 최적화 양호", "전문성/신뢰 요소 있음"];
  const missingItems = allCheckItems.filter(item => !checklist.includes(item));
  
  if (missingItems.length > 0) {
    diagnosis.push(`[개선 필요 요소] ${missingItems.join(", ")}`);
    
    // 각 누락 항목별 상세 진단
    if (missingItems.includes("CTA 명확함")) {
      diagnosis.push(`→ CTA 문제: ${input.conversionType} 유도 버튼이 눈에 띄지 않거나 문구가 모호할 수 있음. "무료 상담 신청", "지금 문의하기" 등 행동 유도 문구로 개선.`);
    }
    if (missingItems.includes("후기/사례 있음")) {
      if (subStrategy) {
        diagnosis.push(`→ 신뢰 요소 부족: ${input.subIndustry} 고객은 ${subStrategy.decisionFactors.includes("리뷰") ? "리뷰를 매우 중시합니다" : "사례/실적을 중요하게 봅니다"}. 실제 고객 후기나 시공/서비스 사례를 추가하세요.`);
      } else {
        diagnosis.push(`→ 신뢰 요소 부족: 후기/사례 섹션 추가로 신뢰도 향상 필요.`);
      }
    }
    if (missingItems.includes("가격/견적 안내 있음")) {
      diagnosis.push(`→ 가격 정보 부족: ${input.conversionType === "견적 요청" ? "견적 요청 전환을 원하더라도 대략적인 가격대 또는 '무료 견적' 안내가 있어야 문의 허들이 낮아집니다." : "가격대 또는 비용 구조에 대한 안내가 있으면 전환율이 높아집니다."}`);
    }
    if (missingItems.includes("문의폼 간단함")) {
      diagnosis.push(`→ 문의폼 복잡: 필수 입력 필드를 3개 이하로 줄이세요. 상세 정보는 상담 과정에서 수집하는 것이 전환율에 유리합니다.`);
    }
    if (missingItems.includes("모바일 최적화 양호")) {
      diagnosis.push(`→ 모바일 UX 문제: ${input.customerBehaviors.includes("모바일 이용이 많음") ? "고객 대부분이 모바일 사용자입니다." : "모바일 트래픽 비중이 높은 시장입니다."} 터치 친화적 버튼(최소 44px), 빠른 로딩(3초 이내) 필수.`);
    }
    if (missingItems.includes("전문성/신뢰 요소 있음")) {
      diagnosis.push(`→ 전문성 미표현: "${parsedUSP.mainValue}"를 뒷받침하는 자격증, 수상, 인증, 경력 등을 시각적으로 노출하세요.`);
    }
  } else {
    diagnosis.push(`[체크리스트 충족] 기본 요소는 갖춰진 상태입니다. 전환율 개선을 위한 A/B 테스트를 권장합니다.`);
  }
  
  // 3. 업종별 필수 요소 진단
  if (subStrategy) {
    diagnosis.push(`[${input.subIndustry} 필수 요소] ${subStrategy.trustBuilders.join(", ")} - 이 중 2개 이상 랜딩에 포함되어야 합니다.`);
  }
  
  // 4. 전환 유형별 필수 요소
  if (conversionStrategy) {
    const missingLandingElements = conversionStrategy.landingElements.filter(el => {
      // 간단한 매칭 로직
      if (el.includes("문의") && checklist.includes("문의폼 간단함")) return false;
      if (el.includes("후기") && checklist.includes("후기/사례 있음")) return false;
      return true;
    });
    if (missingLandingElements.length > 0) {
      diagnosis.push(`[${input.conversionType} 필수 요소] ${missingLandingElements.join(", ")} 확인 필요`);
    }
  }
  
  // 5. 고민 포인트 연계 진단
  if (painPointInfo.category === "conversion") {
    diagnosis.push(`[전환 문제 연계] 현재 전환 관련 고민이 있으므로, 랜딩페이지 개선이 최우선 과제입니다.`);
  }
  
  return diagnosis;
}

// ========================================
// 광고 문구 개선 방향 생성 (신규)
// ========================================
export function generateCopyImprovement(input: ProposalInput): string[] {
  const archetype = detectArchetype(input.productService, input.usp, input.currentAdCopy);
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const parsedUSP = parseUSP(input.usp);
  const products = parseProducts(input.productService);
  const regions = parseRegion(input.region);
  
  const improvements: string[] = [];
  
  // 1. 업종별 메시지 방향
  if (input.industry === "인테리어/시공") {
    improvements.push(`[메시지 방향] 신뢰/포트폴리오 중심 - "실력으로 증명하는" 톤`);
    improvements.push(`[강조 요소] 시공 사례 수, 경력, 고객 만족 후기, AS 보장`);
    improvements.push(`[CTA 방향] "무료 상담 예약" / "시공 사례 확인하기" / "3D 시안 무료 제공"`);
    improvements.push(`[예시 카피] "${regions[0]} ${input.subIndustry} ${parsedUSP.keywords[0] || '전문'} | ${parsedUSP.mainValue} | 무료 상담"`);
    
  } else if (input.industry === "철거/원상복구") {
    improvements.push(`[메시지 방향] 신속/직접 응답 중심 - "지금 바로 해결" 톤`);
    improvements.push(`[강조 요소] 당일 방문, 무료 견적, 빠른 처리, 깔끔한 마무리`);
    improvements.push(`[CTA 방향] "지금 전화" / "카톡 즉시 견적" / "오늘 방문 가능"`);
    improvements.push(`[예시 카피] "${regions[0]} ${input.subIndustry} | ${parsedUSP.mainValue} | 지금 바로 연락주세요"`);
    
  } else if (input.industry === "문의형 서비스업") {
    improvements.push(`[메시지 방향] 전문성/신뢰 중심 - "검증된 전문가" 톤`);
    improvements.push(`[강조 요소] 전문 분야, 경력/자격, 성공 사례, 상담 품질`);
    improvements.push(`[CTA 방향] "무료 상담 신청" / "사례 분석 요청" / "비밀 상담"`);
    if (subStrategy) {
      improvements.push(`[반박 처리] ${subStrategy.objectionHandling[0]}`);
    }
    improvements.push(`[예시 카피] "${input.subIndustry} 전문 | ${parsedUSP.mainValue} | 무료 상담 받기"`);
    
  } else if (input.industry === "쇼핑몰/이커머스") {
    improvements.push(`[메시지 방향] 혜택/상품 가치 중심 - "지금 사야 할 이유" 톤`);
    improvements.push(`[강조 요소] 가격 혜택, 리뷰/평점, 품질/성분, 배송 속도`);
    improvements.push(`[CTA 방향] "지금 구매" / "오늘만 할인" / "무료배송 혜택"`);
    improvements.push(`[예시 카피] "${products[0]} | ${parsedUSP.mainValue} | 지금 구매 시 ${parsedUSP.supportingPoints[0] || '특별 혜택'}"`);
    
  } else {
    improvements.push(`[메시지 방향] ${input.subIndustry} 특성에 맞는 메시지 개발 필요`);
    improvements.push(`[강조 요소] "${parsedUSP.mainValue}"를 중심으로 차별점 부각`);
    improvements.push(`[CTA 방향] ${input.conversionType}에 맞는 행동 유도 문구`);
  }
  
  // 2. 아키타입별 톤 조정
  const archetypeTone: Record<Archetype, string> = {
    premium: `[프리미엄 톤] 고급스럽고 절제된 표현, 가격보다 가치 강조, "프리미엄", "특별한"`,
    value: `[가성비 톤] 실속과 혜택 강조, 가격 대비 가치 증명, "합리적인", "알뜰한"`,
    urgent: `[긴급 톤] 즉각적인 행동 유도, "지금", "오늘", "바로", "즉시"`,
    "review-based": `[후기 톤] 실제 결과와 사례 중심, "실제 고객", "검증된", "000명 선택"`,
    "comparison-driven": `[비교 톤] 경쟁사 대비 우위 강조, "vs", "차이", "왜 선택해야 하는지"`,
    "expert-led": `[전문가 톤] 권위와 전문성 강조, "전문", "경력 N년", "인증", "수상"`,
    standard: `[표준 톤] 균형 잡힌 정보 전달, USP 중심 메시지`,
  };
  
  improvements.push(archetypeTone[archetype]);
  
  // 3. 현재 광고 카피 개선 제안 (있는 경우)
  if (input.currentAdCopy) {
    improvements.push(`[현재 카피] "${input.currentAdCopy}"`);
    
    // 개선 제안
    const suggestions: string[] = [];
    if (!input.currentAdCopy.includes(regions[0])) {
      suggestions.push(`지역명(${regions[0]}) 추가`);
    }
    if (!parsedUSP.keywords.some(k => input.currentAdCopy!.includes(k))) {
      suggestions.push(`USP 핵심 키워드(${parsedUSP.keywords.slice(0, 2).join(", ") || parsedUSP.mainValue}) 포함`);
    }
    if (!input.currentAdCopy.match(/무료|할인|혜택|보장/)) {
      suggestions.push(`혜택 요소 추가`);
    }
    
    if (suggestions.length > 0) {
      improvements.push(`[개선 제안] ${suggestions.join(" / ")}`);
    }
  }
  
  return improvements;
}

// ========================================
// 추천 채널 생성
// ========================================
export function generateChannels(input: ProposalInput): ProposalOutput["channels"] {
  const budgetLevel = getBudgetLevel(input.monthlyBudget);
  const archetype = detectArchetype(input.productService, input.usp, input.currentAdCopy);
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const products = parseProducts(input.productService);
  const parsedUSP = parseUSP(input.usp);
  const regions = parseRegion(input.region);
  
  let channels = industryChannelPriority[input.industry] || ["네이버 검색광고", "구글 검색광고"];
  
  // 예산에 따른 채널 수 결정
  let maxChannels = 2;
  if (budgetLevel === "mid-low") maxChannels = 3;
  if (budgetLevel === "mid") maxChannels = 4;
  if (budgetLevel === "high") maxChannels = 5;
  
  const selectedChannels = channels.slice(0, maxChannels);
  
  // 업종/상품/USP 기반 맞춤 이유 생성
  const generateReason = (channel: string): string => {
    const productFirst = products[0] || input.subIndustry;
    
    // 업종별 완전히 다른 이유
    if (input.industry === "인테리어/시공") {
      const reasons: Record<string, string> = {
        "네이버 검색광고": `"${regions[0]} ${input.subIndustry}" 키워드는 구매 의도가 높은 고객이 직접 검색합니다. "${parsedUSP.mainValue}" 강점을 광고 문구에 직접 노출하여 클릭 유도 후 포트폴리오 페이지로 연결합니다.`,
        "네이버 플레이스": `${regions[0]} 지역 검색 시 플레이스 상위 노출은 신뢰도에 직접 영향을 줍니다. 시공 사례 사진과 고객 리뷰로 "${parsedUSP.mainValue}"를 시각적으로 증명합니다.`,
        "블로그 마케팅": `${input.subIndustry} 고객은 계약 전 충분한 정보 수집을 원합니다. 시공 사례, 비용 구조, 주의사항 등 정보성 콘텐츠로 검색 유입과 신뢰를 동시에 확보합니다.`,
        "구글 검색광고": `네이버 외 검색 유저 커버리지와 함께, "${productFirst}" 관련 전문 검색어에서 효율적인 CPC로 트래픽을 확보합니다.`,
      };
      return reasons[channel] || `${input.subIndustry} 업종에 효과적인 채널입니다.`;
      
    } else if (input.industry === "철거/원상복구") {
      const reasons: Record<string, string> = {
        "네이버 검색광고": `"${regions[0]} ${input.subIndustry}" 검색은 대부분 즉각적인 서비스가 필요한 긴급 수요입니다. "${parsedUSP.mainValue}"를 광고 문구에 배치하여 즉시 전화/문의로 연결합니다.`,
        "네이버 플레이스": `지역 기반 서비스이므로 플레이스 노출이 필수입니다. 작업 후기와 빠른 응대 시간을 강조하여 연락 허들을 낮춥니다.`,
        "구글 검색광고": `네이버에서 찾지 못한 유저가 구글로 이동합니다. 동일한 긴급 수요 키워드로 추가 리드를 확보합니다.`,
      };
      return reasons[channel] || `${input.subIndustry} 업종에 효과적인 채널입니다.`;
      
    } else if (input.industry === "문의형 서비스업") {
      const reasons: Record<string, string> = {
        "네이버 검색광고": `"${productFirst}" 관련 검색은 서비스 필요성을 인지한 고객입니다. "${parsedUSP.mainValue}"로 전문성을 어필하여 상담 전환을 유도합니다.`,
        "구글 검색광고": `전문 서비스 검색의 경우 구글 이용 비중이 높습니다. 전문성 키워드와 "${parsedUSP.mainValue}"를 조합한 광고로 양질의 리드를 확보합니다.`,
        "블로그 마케팅": `${input.subIndustry} 고객은 결정 전 많은 정보를 탐색합니다. 전문 지식 콘텐츠로 검색 유입과 함께 전문가 포지셔닝을 강화합니다.`,
        "카카오 비즈보드": `폭넓은 도달로 잠재 고객에게 "${parsedUSP.mainValue}" 메시지를 노출하고 인지도를 확보합니다.`,
      };
      return reasons[channel] || `${input.subIndustry} 업종에 효과적인 채널입니다.`;
      
    } else if (input.industry === "쇼핑몰/이커머스") {
      const reasons: Record<string, string> = {
        "네이버 쇼핑광고": `${productFirst} 상품을 가격, 리뷰와 함께 쇼핑탭에 직접 노출합니다. "${parsedUSP.mainValue}"를 상품명/이미지에 반영하여 클릭률을 높입니다.`,
        "네이버 검색광고": `"${productFirst} 추천", "${productFirst} 후기" 등 정보 탐색 키워드로 구매 고려 단계 고객에게 도달합니다.`,
        "메타 광고": `${input.targetAudience} 정밀 타겟팅으로 ${productFirst} 관심 잠재 고객을 발굴하고, 리타겟팅으로 전환까지 연결합니다.`,
        "구글 쇼핑": `구글 쇼핑 탭 노출로 네이버 외 쇼핑 검색 유저를 커버하고 ROAS를 극대화합니다.`,
      };
      return reasons[channel] || `${input.subIndustry} 업종에 효과적인 채널입니다.`;
      
    } else {
      // 기본 이유
      return `${input.subIndustry} 업종에서 "${parsedUSP.mainValue}" 강점을 효과적으로 전달할 수 있는 채널입니다.`;
    }
  };
  
  // 예산 비율 계산
  const budgetRatios = calculateBudgetRatios(selectedChannels.length, budgetLevel, archetype);
  
  return selectedChannels.map((channel, index) => ({
    name: channel,
    priority: index + 1,
    reason: generateReason(channel),
    budgetRatio: budgetRatios[index],
  }));
}

// 예산 비율 계산
function calculateBudgetRatios(channelCount: number, budgetLevel: BudgetLevel, archetype: Archetype): number[] {
  const ratioTemplates: Record<number, number[]> = {
    2: [70, 30],
    3: [50, 30, 20],
    4: [40, 25, 20, 15],
    5: [35, 25, 20, 12, 8],
  };
  
  let ratios = ratioTemplates[channelCount] || [100];
  
  if (archetype === "urgent" && channelCount >= 2) {
    ratios = ratios.map((r, i) => i === 0 ? r + 10 : r - Math.floor(10 / (channelCount - 1)));
  } else if (archetype === "review-based" && channelCount >= 3) {
    ratios = [45, 25, 30, ...ratios.slice(3)].slice(0, channelCount);
  }
  
  return ratios;
}

// ========================================
// 예산 배분안 생성
// ========================================
export function generateBudgetPlan(input: ProposalInput): ProposalOutput["budgetPlan"] {
  const channels = generateChannels(input);
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const products = parseProducts(input.productService);
  
  return channels.map((channel) => {
    const amount = Math.round((input.monthlyBudget * channel.budgetRatio) / 100);
    
    const generateNote = (): string => {
      const productFirst = products[0] || input.subIndustry;
      
      if (input.industry === "인테리어/시공") {
        const notes: Record<string, string> = {
          "네이버 검색광고": `${productFirst} 키워드 CPC ${input.region.includes("강남") ? "3,000~5,000원" : "1,500~3,000원"} 예상`,
          "네이버 플레이스": "리뷰 관리 필수, 사진 15장 이상 등록",
          "블로그 마케팅": "시공 사례 포스팅 월 4회 이상 권장",
          "구글 검색광고": "품질점수 7점 이상 유지 목표",
        };
        return notes[channel.name] || "효율 모니터링 필요";
        
      } else if (input.industry === "철거/원상복구") {
        const notes: Record<string, string> = {
          "네이버 검색광고": "클릭투콜 확장소재 필수, CPC 800~1,500원 예상",
          "네이버 플레이스": "빠른 응대 시간 표시, 작업 사진 등록",
          "구글 검색광고": "지역 타겟팅 필수 설정",
        };
        return notes[channel.name] || "효율 모니터링 필요";
        
      } else if (input.industry === "쇼핑몰/이커머스") {
        const notes: Record<string, string> = {
          "네이버 쇼핑광고": `${productFirst} ROAS 목표 300% 이상`,
          "네이버 검색광고": "브랜드 키워드 방어 필수",
          "메타 광고": "소재 A/B 테스트 주 2회 권장",
          "구글 쇼핑": "피드 최적화 필수",
        };
        return notes[channel.name] || "효율 모니터링 필요";
        
      } else {
        return subStrategy ? `${subStrategy.decisionFactors[0]} 키워드 집중` : "효율 모니터링 필요";
      }
    };
    
    return {
      channel: channel.name,
      amount,
      percentage: channel.budgetRatio,
      note: generateNote(),
    };
  });
}

// ========================================
// 핵심 타겟 전략 생성
// ========================================
export function generateTargetStrategy(input: ProposalInput): string[] {
  const archetype = detectArchetype(input.productService, input.usp, input.currentAdCopy);
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const parsedUSP = parseUSP(input.usp);
  const parsedTarget = parseTargetAudience(input.targetAudience);
  const products = parseProducts(input.productService);
  const regions = parseRegion(input.region);
  
  const strategies: string[] = [];
  
  // 1. 타겟 정의 - 구체적 행동/심리 포함
  if (subStrategy) {
    strategies.push(`[핵심 타겟] ${parsedTarget.demographics} 중 "${subStrategy.customerJourney.split("→")[0]}" 단계에 있는 고객`);
    strategies.push(`[타겟 심리] ${subStrategy.marketContext.split(",")[0]} - 이 심리를 광고 메시지에 반영`);
  } else {
    strategies.push(`[핵심 타겟] ${parsedTarget.demographics}`);
  }
  
  // 2. 지역 타겟팅
  strategies.push(`[지역 타겟] ${regions.join(", ")} - 지역명 포함 키워드 필수, 지역 타겟팅 설정`);
  
  // 3. 업종별 핵심 구매 요인 타겟팅
  if (subStrategy) {
    strategies.push(`[구매 결정 요인] ${subStrategy.decisionFactors.slice(0, 3).join(" > ")} 순으로 중요 → 이 순서로 메시지 우선순위 결정`);
  }
  
  // 4. 고객 행동 기반 타겟팅
  if (input.customerBehaviors.includes("가격 비교를 많이 함")) {
    strategies.push(`[가격 민감 대응] 비교 검색어("${input.subIndustry} 가격비교", "저렴한 ${input.subIndustry}") 타겟팅, "${parsedUSP.mainValue}"로 가격 대비 가치 설득`);
  }
  if (input.customerBehaviors.includes("리뷰/후기를 중시함")) {
    strategies.push(`[후기 중시 대응] 후기 검색어 타겟팅, 광고 소재에 "실제 고객 후기", "★4.9" 등 사회적 증거 포함`);
  }
  if (input.customerBehaviors.includes("빠른 응대를 원함")) {
    strategies.push(`[신속 대응 요구] "당일", "즉시", "바로" 키워드 타겟팅, 광고에 응대 시간 명시`);
  }
  if (input.customerBehaviors.includes("전문성/신뢰를 중시함")) {
    strategies.push(`[전문성 중시 대응] 전문 키워드 타겟팅, "${parsedUSP.mainValue}" 중 전문성 요소를 광고 전면에 배치`);
  }
  
  // 5. 시즌성 반영
  if (subStrategy?.seasonalPeak) {
    strategies.push(`[시즌 전략] ${subStrategy.seasonalPeak} 시기 예산 30~50% 증액, 해당 시즌 키워드 집중`);
  }
  
  return strategies;
}

// ========================================
// 광고 소재 전략 생성
// ========================================
export function generateCreativeStrategy(input: ProposalInput): string[] {
  const strategy = industryStrategies[input.industry];
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const conversionStrategy = conversionStrategies[input.conversionType];
  const archetype = detectArchetype(input.productService, input.usp, input.currentAdCopy);
  const parsedUSP = parseUSP(input.usp);
  const products = parseProducts(input.productService);
  
  const creatives: string[] = [];
  
  // 1. 메인 카피 방향
  creatives.push(`[메인 카피] "${parsedUSP.mainValue}" → 헤드라인에 직접 사용. 숫자/구체적 수치가 있으면 더 효과적.`);
  
  // 2. 업종별 특화 소재 방향
  if (subStrategy) {
    creatives.push(`[업종 특화] ${subStrategy.messagingTone}`);
    creatives.push(`[신뢰 요소 포함] ${subStrategy.trustBuilders.slice(0, 3).join(", ")} 중 1개 이상 소재에 포함`);
  }
  
  // 3. 톤앤매너
  if (conversionStrategy) {
    creatives.push(`[톤앤매너] ${conversionStrategy.adCopyTone}`);
  }
  
  // 4. CTA 스타일
  if (subStrategy) {
    creatives.push(`[CTA 방향] ${subStrategy.ctaStyle}`);
  }
  
  // 5. 아키타입별 소재 변형
  const archetypeCreative: Record<Archetype, string> = {
    premium: `[프리미엄 변형] 고급스러운 비주얼, 절제된 카피, 가격보다 품질/서비스 가치 강조`,
    value: `[가성비 변형] 가격 혜택 직접 노출, "합리적인", "실속" 워딩, 비교 우위 증명`,
    urgent: `[긴급 변형] "지금", "오늘", "바로" 워딩, 한정 혜택, 즉각적 행동 유도`,
    "review-based": `[후기 변형] 실제 고객 인용, 별점/리뷰 수 표시, Before/After 사례`,
    "comparison-driven": `[비교 변형] 경쟁사 대비 우위점 명시, "vs", "차이" 활용`,
    "expert-led": `[전문가 변형] 경력/자격/인증 강조, 전문 용어 적절히 활용, 권위 포지셔닝`,
    standard: `[표준 변형] USP 중심 균형 잡힌 메시지`,
  };
  
  creatives.push(archetypeCreative[archetype]);
  
  // 6. 소재 다양화 제안
  if (products.length > 1) {
    creatives.push(`[상품별 소재] ${products.slice(0, 3).map(p => `"${p}" 특화 소재`).join(", ")} 각각 준비`);
  }
  
  // 7. A/B 테스트 제안
  creatives.push(`[A/B 테스트] USP 강조형 vs 혜택 강조형 / 이성적 소재 vs 감성적 소재 비교 테스트 권장`);
  
  return creatives;
}

// ========================================
// 랜딩페이지 개선 포인트 생성
// ========================================
export function generateLandingStrategy(input: ProposalInput): string[] {
  const conversionStrategy = conversionStrategies[input.conversionType];
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const painPointInfo = getWeightedPainPoints(input.painPoints);
  const parsedUSP = parseUSP(input.usp);
  const products = parseProducts(input.productService);
  const checklist = input.landingChecklistItems || [];
  
  const strategies: string[] = [];
  
  // 1. 랜딩 상태별 핵심 액션
  if (input.landingStatus === "랜딩페이지 없음" || input.landingStatus === "플레이스만 있음") {
    strategies.push(`[최우선] ${input.conversionType} 전환용 랜딩페이지 신규 제작 필수. ${input.subIndustry} 특화 템플릿 활용, 예산 80~150만원 예상.`);
  }
  
  // 2. 업종별 필수 구성 요소
  if (subStrategy) {
    strategies.push(`[${input.subIndustry} 필수 구성] 히어로 영역: "${parsedUSP.mainValue}" + ${subStrategy.trustBuilders[0]} / 하단: ${subStrategy.trustBuilders.slice(1, 3).join(", ")}`);
  }
  
  // 3. 전환 유형별 필수 요소
  if (conversionStrategy) {
    strategies.push(`[${input.conversionType} 최적화] ${conversionStrategy.landingElements.join(" → ")} 순서로 배치`);
  }
  
  // 4. 고객 불안 해소 섹션
  if (subStrategy) {
    strategies.push(`[불안 해소 섹션] "${subStrategy.objectionHandling[0]}" - 이 내용을 FAQ 또는 별도 섹션으로 구성`);
  }
  
  // 5. 체크리스트 기반 개선
  const missingItems = ["CTA 명확함", "후기/사례 있음", "가격/견적 안내 있음", "문의폼 간단함", "모바일 최적화 양호", "전문성/신뢰 요소 있음"]
    .filter(item => !checklist.includes(item));
  
  if (missingItems.length > 0) {
    strategies.push(`[개선 필요] ${missingItems.slice(0, 3).join(", ")} 추가/강화`);
  }
  
  // 6. 응대 방식 연동
  const responseMap: Record<string, string> = {
    "전화 응대 가능": "클릭투콜 버튼 상단 고정, 운영시간 명확히 표시",
    "카카오톡 상담 선호": "카카오 채널 버튼 우하단 플로팅, 실시간 상담 가능 시간 안내",
    "온라인 폼 접수": "문의 폼 필드 3개 이하로 간소화, 접수 후 응대 시간 안내",
    "방문 상담 필수": "위치/지도/주차 정보 섹션, 예약 시스템 연동",
    "24시간 응대 가능": "'24시간 상담 가능' 배지 상단 노출, 야간 문의 채널 명시",
  };
  
  strategies.push(`[응대 연동] ${responseMap[input.responseType] || "문의 채널 명확히 안내"}`);
  
  // 7. 모바일 최적화
  if (input.customerBehaviors.includes("모바일 이용이 많음") || !checklist.includes("모바일 최적화 양호")) {
    strategies.push(`[모바일 필수] 터치 친화적 버튼(44px 이상), 로딩 3초 이내, 클릭투콜 상단 고정`);
  }
  
  return strategies;
}

// ========================================
// KPI 가이드 생성
// ========================================
export function generateKpiGuide(input: ProposalInput): ProposalOutput["kpiGuide"] {
  const kpiRange = industryKpiRanges[input.industry] || { ctr: [2, 5], cvr: [2, 10] };
  const budgetLevel = getBudgetLevel(input.monthlyBudget);
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const products = parseProducts(input.productService);
  const regions = parseRegion(input.region);
  
  const kpis: ProposalOutput["kpiGuide"] = [];
  
  // CTR
  kpis.push({
    metric: "CTR (클릭률)",
    range: `${kpiRange.ctr[0]}% ~ ${kpiRange.ctr[1]}%`,
    note: subStrategy 
      ? `${input.subIndustry} 업종 평균. "${subStrategy.decisionFactors[0]}" 강조 소재 시 상위권 기대.`
      : `${input.industry} 업종 평균 기준`,
  });
  
  // CVR
  const cvrNote = input.landingStatus.includes("없음") || input.landingStatus.includes("플레이스만")
    ? "랜딩페이지 제작 후 달성 가능. 현재 상태에서는 하향 예상."
    : subStrategy 
      ? `${subStrategy.trustBuilders[0]} 포함 랜딩 시 달성 가능`
      : "랜딩 품질에 따라 변동";
  
  kpis.push({
    metric: "CVR (전환율)",
    range: `${kpiRange.cvr[0]}% ~ ${kpiRange.cvr[1]}%`,
    note: cvrNote,
  });
  
  // CPC
  const cpcRanges: Record<string, [number, number]> = {
    "인테리어/시공": [1200, 3500],
    "철거/원상복구": [800, 2000],
    "문의형 서비스업": [600, 2500],
    "쇼핑몰/이커머스": [250, 1200],
    "병원/의원": [2000, 6000],
    "교육": [800, 2500],
    "부동산": [1500, 5000],
    "미용/뷰티": [400, 1800],
    "전문서비스": [1200, 4000],
    "B2B/기업서비스": [1500, 5000],
    "지역서비스": [300, 1200],
  };
  
  const [cpcMin, cpcMax] = cpcRanges[input.industry] || [500, 2000];
  const isHighCompetition = regions.some(r => r.includes("강남") || r.includes("서울"));
  
  kpis.push({
    metric: "CPC (클릭당 비용)",
    range: `${cpcMin.toLocaleString()}원 ~ ${cpcMax.toLocaleString()}원`,
    note: isHighCompetition 
      ? `${regions[0]} 지역 경쟁 높음. 상위 범위 예상.`
      : `${regions[0]} 기준. 키워드별 변동 있음.`,
  });
  
  // 예상 CPA
  const avgCvr = (kpiRange.cvr[0] + kpiRange.cvr[1]) / 2 / 100;
  const avgCpc = (cpcMin + cpcMax) / 2;
  const estimatedCPA = Math.round(avgCpc / avgCvr);
  
  kpis.push({
    metric: `예상 CPA (${input.conversionType}당 비용)`,
    range: `${formatKRW(Math.round(estimatedCPA * 0.7))} ~ ${formatKRW(Math.round(estimatedCPA * 1.3))}`,
    note: subStrategy?.averageTicket 
      ? `${input.subIndustry} 평균 객단가 ${subStrategy.averageTicket} 대비 ROI 검토 필요`
      : "객단가 대비 ROI 검토 필요",
  });
  
  // 예상 전환 수
  const estimatedConversions = Math.round(input.monthlyBudget / estimatedCPA);
  
  kpis.push({
    metric: `월 예상 ${input.conversionType} 수`,
    range: `${Math.max(1, Math.round(estimatedConversions * 0.6))}건 ~ ${Math.round(estimatedConversions * 1.2)}건`,
    note: subStrategy?.seasonalPeak 
      ? `${subStrategy.seasonalPeak} 시즌 상향. 초기 2~4주 최적화 기간 후 안정화.`
      : "초기 2~4주 최적화 기간 이후 안정화",
  });
  
  // ROAS (이커머스)
  if (input.industry === "쇼핑몰/이커머스") {
    kpis.push({
      metric: "목표 ROAS",
      range: "200% ~ 400%",
      note: `${products[0] || "상품"} 마진율 고려 손익분기점 설정 필요`,
    });
  }
  
  return kpis;
}

// ========================================
// 실행 우선순위 생성
// ========================================
export function generateActionPlan(input: ProposalInput): ProposalOutput["actionPlan"] {
  const painPointInfo = getWeightedPainPoints(input.painPoints);
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const parsedUSP = parseUSP(input.usp);
  const products = parseProducts(input.productService);
  
  const actions: ProposalOutput["actionPlan"] = [];
  let priority = 1;
  
  // 1. 랜딩 상태 기반 최우선 액션
  if (input.landingStatus === "랜딩페이지 없음") {
    actions.push({
      priority: priority++,
      action: `${input.subIndustry} 전환용 랜딩페이지 제작 - "${parsedUSP.mainValue}" 중심 구성`,
      timeline: "1~2주",
    });
  } else if (input.landingStatus === "플레이스만 있음") {
    actions.push({
      priority: priority++,
      action: `${input.conversionType} 유도용 간결한 랜딩페이지 제작`,
      timeline: "1~2주",
    });
  }
  
  // 2. 핵심 고민 해결 액션
  if (painPointInfo.primary) {
    const solution = painPointSolutions[painPointInfo.primary];
    if (solution) {
      actions.push({
        priority: priority++,
        action: `[${painPointInfo.primary}] ${solution.actionItems.slice(0, 2).join(", ")}`,
        timeline: "1~2주",
      });
    }
  }
  
  if (painPointInfo.secondary) {
    const solution = painPointSolutions[painPointInfo.secondary];
    if (solution && priority <= 4) {
      actions.push({
        priority: priority++,
        action: `[${painPointInfo.secondary}] ${solution.actionItems[0]}`,
        timeline: "2~3주",
      });
    }
  }
  
  // 3. 기본 실행 액션
  const baseActions = [
    { 
      action: `${input.subIndustry} 핵심 키워드 리서치 - "${products[0] || input.subIndustry}" 중심`, 
      timeline: "3~5일" 
    },
    { 
      action: `"${parsedUSP.mainValue}" 기반 광고 소재 제작 (텍스트 3종, 이미지 2종)`, 
      timeline: "5~7일" 
    },
    { 
      action: `광고 계정 세팅 및 캠페인 구조 설계`, 
      timeline: "3~5일" 
    },
    { 
      action: `광고 집행 시작 - 일예산 ${formatKRW(Math.round(input.monthlyBudget / 30))}으로 데이터 수집`, 
      timeline: "1~2주" 
    },
  ];
  
  for (const action of baseActions) {
    if (priority <= 7) {
      actions.push({ priority: priority++, ...action });
    }
  }
  
  // 4. 최적화 단계
  actions.push({
    priority: priority++,
    action: `성과 분석 및 최적화 - CTR/CVR/CPA 점검, 저효율 키워드 제외`,
    timeline: "2주차~",
  });
  
  return actions.slice(0, 8);
}

// ========================================
// 업종 맞춤 핵심 포인트 생성
// ========================================
export function generateIndustryPoints(input: ProposalInput): string[] {
  const strategy = industryStrategies[input.industry];
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const parsedUSP = parseUSP(input.usp);
  const products = parseProducts(input.productService);
  
  const points: string[] = [];
  
  if (subStrategy) {
    points.push(`[${input.subIndustry} 핵심] ${subStrategy.marketContext}`);
    points.push(`[고객 여정] ${subStrategy.customerJourney}`);
    points.push(`[구매 결정 요인] ${subStrategy.decisionFactors.slice(0, 4).join(" > ")}`);
    points.push(`[전환 소요 시간] ${subStrategy.conversionWindow}`);
    
    if (subStrategy.objectionHandling.length > 0) {
      points.push(`[주요 반박 처리] ${subStrategy.objectionHandling[0]}`);
    }
  }
  
  if (strategy) {
    points.push(`[전략 포커스] ${strategy.focus.join(", ")}`);
  }
  
  points.push(`[USP 활용] "${parsedUSP.mainValue}"를 모든 접점에서 일관되게 노출`);
  
  if (subStrategy?.seasonalPeak) {
    points.push(`[시즌 대비] ${subStrategy.seasonalPeak} - 해당 시기 예산/소재 사전 준비`);
  }
  
  return points;
}

// ========================================
// 키워드 방향 생성 (그룹화)
// ========================================
export function generateKeywordDirection(input: ProposalInput): KeywordGroup[] {
  const strategy = industryStrategies[input.industry];
  const subStrategy = subIndustryDeepStrategies[input.subIndustry];
  const products = parseProducts(input.productService);
  const regions = parseRegion(input.region);
  const parsedUSP = parseUSP(input.usp);
  
  const groups: KeywordGroup[] = [];
  
  // 1. 핵심 전환 키워드
  const coreKeywords: string[] = [];
  regions.slice(0, 2).forEach(region => {
    coreKeywords.push(`${region} ${input.subIndustry}`);
    if (products[0]) coreKeywords.push(`${region} ${products[0]}`);
  });
  if (input.conversionType === "견적 요청") {
    coreKeywords.push(`${input.subIndustry} 견적`, `${input.subIndustry} 비용`);
  } else if (input.conversionType === "상담 문의") {
    coreKeywords.push(`${input.subIndustry} 상담`, `${input.subIndustry} 문의`);
  }
  
  groups.push({
    category: "핵심 전환 키워드",
    keywords: coreKeywords.slice(0, 6),
    note: "구매/문의 의도가 높은 키워드. 입찰 집중 권장.",
  });
  
  // 2. 확장 키워드
  const expandKeywords: string[] = [];
  products.forEach(p => {
    expandKeywords.push(`${p} 추천`, `${p} 후기`);
  });
  if (subStrategy) {
    subStrategy.decisionFactors.slice(0, 2).forEach(factor => {
      expandKeywords.push(`${input.subIndustry} ${factor}`);
    });
  }
  
  groups.push({
    category: "확장 키워드",
    keywords: expandKeywords.slice(0, 6),
    note: "정보 탐색 단계 고객 유입. 중간 입찰가.",
  });
  
  // 3. 지역 결합 키워드
  const regionKeywords: string[] = [];
  regions.forEach(region => {
    regionKeywords.push(`${region} ${input.subIndustry} 추천`);
    regionKeywords.push(`${region} ${input.subIndustry} 업체`);
  });
  
  groups.push({
    category: "지역 결합 키워드",
    keywords: regionKeywords.slice(0, 6),
    note: "지역 기반 검색. 경쟁 낮고 전환율 높음.",
  });
  
  // 4. 비교/검토 키워드
  const comparisonKeywords: string[] = [
    `${input.subIndustry} 비교`,
    `${input.subIndustry} 순위`,
    `${input.subIndustry} 추천`,
    `좋은 ${input.subIndustry}`,
    `${input.subIndustry} 선택 기준`,
  ];
  
  if (products[0]) {
    comparisonKeywords.push(`${products[0]} 비교`, `${products[0]} 추천`);
  }
  
  groups.push({
    category: "비교/검토 키워드",
    keywords: comparisonKeywords.slice(0, 6),
    note: "여러 옵션 비교 중인 고객. USP 차별화 소재 필요.",
  });
  
  // 5. 제외 키워드
  const excludeKeywords = ["무료", "DIY", "직접", "혼자", "알바", "취업", "채용", "자격증"];
  if (input.industry === "쇼핑몰/이커머스") {
    excludeKeywords.push("만들기", "레시피");
  }
  
  groups.push({
    category: "제외 키워드",
    keywords: excludeKeywords.slice(0, 8),
    note: "구매 의도 없는 검색 제외로 예산 효율화.",
  });
  
  return groups;
}

// ========================================
// 전체 제안서 생성
// ========================================
export function generateProposal(input: ProposalInput): ProposalOutput {
  return {
    summary: generateSummary(input),
    channels: generateChannels(input),
    budgetPlan: generateBudgetPlan(input),
    targetStrategy: generateTargetStrategy(input),
    creativeStrategy: generateCreativeStrategy(input),
    landingStrategy: generateLandingStrategy(input),
    kpiGuide: generateKpiGuide(input),
    actionPlan: generateActionPlan(input),
    industryPoints: generateIndustryPoints(input),
    keywordDirection: generateKeywordDirection(input),
    adDiagnosis: generateAdDiagnosis(input),
    landingDiagnosis: generateLandingDiagnosis(input),
    copyImprovement: generateCopyImprovement(input),
  };
}
