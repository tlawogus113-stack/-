// 업종 대분류 및 세부 업종 데이터
export const industries: Record<string, string[]> = {
  "병원/의원": [
    "피부과",
    "성형외과",
    "치과",
    "한의원",
    "정형외과",
    "내과",
    "안과",
    "산부인과",
    "정신건강의학과",
    "재활의학과",
  ],
  "교육": [
    "어학원",
    "입시학원",
    "예체능학원",
    "자격증학원",
    "온라인강의",
    "과외/튜터링",
    "유아교육",
    "성인교육",
  ],
  "쇼핑몰/이커머스": [
    "패션",
    "뷰티",
    "식품",
    "생활/가전",
    "니치 상품",
    "브랜드몰",
    "종합쇼핑몰",
  ],
  "부동산": [
    "아파트분양",
    "오피스텔",
    "상가분양",
    "토지",
    "중개/임대",
    "경매/공매",
  ],
  "미용/뷰티": [
    "헤어샵",
    "네일샵",
    "피부관리",
    "반영구/타투",
    "속눈썹",
    "왁싱",
  ],
  "전문서비스": [
    "법률서비스",
    "회계/세무",
    "특허/상표",
    "번역/통역",
    "컨설팅",
  ],
  "B2B/기업서비스": [
    "IT/소프트웨어",
    "마케팅대행",
    "인력파견",
    "사무용품",
    "기업교육",
    "물류/창고",
  ],
  "지역서비스": [
    "음식점",
    "카페",
    "헬스장",
    "펜션/숙박",
    "세탁/수선",
    "반려동물",
  ],
  "인테리어/시공": [
    "주거 인테리어",
    "상업 인테리어",
    "부분 시공",
    "리모델링",
    "욕실/주방 시공",
  ],
  "철거/원상복구": [
    "원상복구",
    "상가 철거",
    "사무실 철거",
    "부분 철거",
  ],
  "문의형 서비스업": [
    "법률 상담",
    "세무/노무",
    "수리/설비",
    "청소/이사",
    "창업/가맹",
  ],
};

// 광고 목표 옵션
export const adGoals = [
  "매출 증대",
  "브랜드 인지도 향상",
  "신규 고객 유치",
  "리드(문의) 확보",
  "재구매율 증가",
  "지역 인지도 강화",
];

// 전환 유형 옵션
export const conversionTypes = [
  "상담 문의",
  "견적 요청",
  "온라인 구매",
  "전화 문의",
  "방문 예약",
  "회원가입",
  "앱 설치",
];

// 현재 고민 옵션 (다중 선택)
export const painPoints = [
  "전환(문의/구매)이 적음",
  "유입은 있으나 이탈이 많음",
  "광고비 대비 효율이 낮음",
  "타겟 고객 도달이 어려움",
  "경쟁사 대비 노출이 부족",
  "랜딩페이지 품질이 낮음",
  "키워드 선정이 어려움",
  "광고 소재가 부족함",
  "문의는 오지만 계약이 안 됨",
  "광고 성과 측정이 어려움",
];

// 고객 행동 특성 옵션 (다중 선택)
export const customerBehaviors = [
  "가격 비교를 많이 함",
  "리뷰/후기를 중시함",
  "빠른 응대를 원함",
  "전문성/신뢰를 중시함",
  "브랜드를 선호함",
  "충동 구매 성향",
  "신중한 의사결정",
  "모바일 이용이 많음",
];

// 현재 운영 채널 옵션 (다중 선택)
export const currentChannels = [
  "네이버 검색광고",
  "네이버 쇼핑광고",
  "구글 검색광고",
  "구글 디스플레이",
  "인스타그램 광고",
  "페이스북 광고",
  "카카오 광고",
  "유튜브 광고",
  "블로그/SNS 운영",
  "없음",
];

// 응대 방식 옵션
export const responseTypes = [
  "전화 응대 가능",
  "카카오톡 상담 선호",
  "온라인 폼 접수",
  "방문 상담 필수",
  "24시간 응대 가능",
];

// 랜딩 상태 옵션
export const landingStatus = [
  "자체 웹사이트 있음",
  "스마트스토어 운영 중",
  "플레이스만 있음",
  "랜딩페이지 없음",
  "개선 예정",
];

// 랜딩 체크리스트 옵션 (신규)
export const landingChecklist = [
  "CTA 명확함",
  "후기/사례 있음",
  "가격/견적 안내 있음",
  "문의폼 간단함",
  "모바일 최적화 양호",
  "전문성/신뢰 요소 있음",
];

// 예산 레벨 정의
export type BudgetLevel = "low" | "mid-low" | "mid" | "high";

export const budgetLevelLabels: Record<BudgetLevel, string> = {
  low: "소규모",
  "mid-low": "중소규모",
  mid: "중규모",
  high: "대규모",
};

// 아키타입 정의 (확장)
export type Archetype = "premium" | "value" | "urgent" | "review-based" | "comparison-driven" | "expert-led" | "standard";

export const archetypeLabels: Record<Archetype, string> = {
  premium: "프리미엄/고급",
  value: "가성비/실속",
  urgent: "긴급/신속",
  "review-based": "후기/사례 중심",
  "comparison-driven": "비교/검토형",
  "expert-led": "전문가 주도",
  standard: "일반",
};

// 업종별 채널 추천 우선순위
export const industryChannelPriority: Record<string, string[]> = {
  "인테리어/시공": ["네이버 검색광고", "네이버 플레이스", "블로그 마케팅", "구글 검색광고"],
  "철거/원상복구": ["네이버 검색광고", "네이버 플레이스", "구글 검색광고"],
  "문의형 서비스업": ["네이버 검색광고", "구글 검색광고", "블로그 마케팅", "카카오 비즈보드"],
  "쇼핑몰/이커머스": ["네이버 쇼핑광고", "네이버 검색광고", "메타 광고", "구글 쇼핑"],
  "병원/의원": ["네이버 검색광고", "네이버 플레이스", "인스타그램 광고", "블로그 마케팅"],
  "교육": ["네이버 검색광고", "구글 검색광고", "메타 광고", "유튜브 광고"],
  "부동산": ["네이버 검색광고", "네이버 부동산", "구글 검색광고", "카카오 광고"],
  "미용/뷰티": ["네이버 플레이스", "인스타그램 광고", "네이버 검색광고", "블로그 마케팅"],
  "전문서비스": ["네이버 검색광고", "구글 검색광고", "블로그 마케팅", "링크드인"],
  "B2B/기업서비스": ["구글 검색광고", "네이버 검색광고", "링크드인", "구글 디스플레이"],
  "지역서비스": ["네이버 플레이스", "네이버 검색광고", "인스타그램 광고", "당근마켓"],
};

// 업종별 KPI 범위
export const industryKpiRanges: Record<string, { ctr: [number, number]; cvr: [number, number] }> = {
  "인테리어/시공": { ctr: [3, 8], cvr: [5, 15] },
  "철거/원상복구": { ctr: [5, 12], cvr: [10, 25] },
  "문의형 서비스업": { ctr: [3, 7], cvr: [5, 20] },
  "쇼핑몰/이커머스": { ctr: [2, 6], cvr: [1, 5] },
  "병원/의원": { ctr: [2, 5], cvr: [3, 12] },
  "교육": { ctr: [2, 5], cvr: [2, 8] },
  "부동산": { ctr: [2, 6], cvr: [1, 5] },
  "미용/뷰티": { ctr: [3, 7], cvr: [5, 15] },
  "전문서비스": { ctr: [2, 5], cvr: [3, 10] },
  "B2B/기업서비스": { ctr: [1, 4], cvr: [1, 5] },
  "지역서비스": { ctr: [3, 8], cvr: [5, 15] },
};

// 업종별 핵심 전략 포인트
export const industryStrategies: Record<string, {
  focus: string[];
  keywordPattern: string;
  ctaType: string;
  trustFactors: string[];
}> = {
  "인테리어/시공": {
    focus: ["포트폴리오 강조", "신뢰 구축", "상담 유도"],
    keywordPattern: "[지역] + [시공 유형]",
    ctaType: "무료 상담 신청",
    trustFactors: ["시공 사례", "고객 후기", "경력/자격증", "AS 보장"],
  },
  "철거/원상복구": {
    focus: ["신속 대응", "직접 문의 유도", "가격 경쟁력"],
    keywordPattern: "[지역] + [서비스]",
    ctaType: "즉시 전화 문의",
    trustFactors: ["당일 방문", "무료 견적", "경력", "보험 가입"],
  },
  "문의형 서비스업": {
    focus: ["리드 품질", "전문성 강조", "신뢰 구축"],
    keywordPattern: "[서비스] + [지역/상황]",
    ctaType: "무료 상담 예약",
    trustFactors: ["자격증/전문성", "성공 사례", "고객 후기", "상담 품질"],
  },
  "쇼핑몰/이커머스": {
    focus: ["가격 경쟁력", "리뷰/평점", "상품 차별화"],
    keywordPattern: "[상품명] + [혜택/특성]",
    ctaType: "지금 구매하기",
    trustFactors: ["리뷰 수", "평점", "배송 속도", "가격 혜택"],
  },
  "병원/의원": {
    focus: ["전문성", "신뢰", "접근성"],
    keywordPattern: "[지역] + [진료과/시술]",
    ctaType: "예약 상담",
    trustFactors: ["의료진 경력", "시술 사례", "환자 후기", "시설"],
  },
  "교육": {
    focus: ["성과/합격률", "커리큘럼", "강사진"],
    keywordPattern: "[과목/시험] + [목표]",
    ctaType: "무료 상담/체험",
    trustFactors: ["합격/성과 사례", "강사 이력", "커리큘럼", "수강생 후기"],
  },
  "부동산": {
    focus: ["입지 조건", "투자 가치", "전문 상담"],
    keywordPattern: "[지역] + [매물 유형]",
    ctaType: "관심고객 등록",
    trustFactors: ["매물 정보", "시세 분석", "전문 상담", "분양 조건"],
  },
  "미용/뷰티": {
    focus: ["결과물", "가격", "접근성"],
    keywordPattern: "[지역] + [시술/서비스]",
    ctaType: "예약하기",
    trustFactors: ["시술 사례", "가격", "위치", "리뷰"],
  },
  "전문서비스": {
    focus: ["전문성", "성공 사례", "신뢰"],
    keywordPattern: "[서비스] + [상황/니즈]",
    ctaType: "무료 상담",
    trustFactors: ["자격/경력", "성공 사례", "전문 분야", "상담 품질"],
  },
  "B2B/기업서비스": {
    focus: ["ROI", "전문성", "사례"],
    keywordPattern: "[서비스] + [산업/규모]",
    ctaType: "문의하기",
    trustFactors: ["고객사 사례", "전문성", "가격 경쟁력", "대응 속도"],
  },
  "지역서비스": {
    focus: ["접근성", "리뷰", "가격"],
    keywordPattern: "[지역] + [서비스]",
    ctaType: "방문/예약",
    trustFactors: ["위치", "리뷰", "가격", "서비스 품질"],
  },
};

// 전환유형별 전략 포인트
export const conversionStrategies: Record<string, {
  focus: string;
  landingElements: string[];
  adCopyTone: string;
}> = {
  "상담 문의": {
    focus: "신뢰와 전문성 강조",
    landingElements: ["전문가 소개", "상담 프로세스", "성공 사례", "간편 문의 폼"],
    adCopyTone: "전문적이고 신뢰감 있는 톤",
  },
  "견적 요청": {
    focus: "절차와 비용의 명확성",
    landingElements: ["서비스 범위", "가격 기준", "견적 프로세스", "간편 견적 폼"],
    adCopyTone: "명확하고 실용적인 톤",
  },
  "온라인 구매": {
    focus: "혜택과 상품 중심",
    landingElements: ["상품 상세", "가격/혜택", "리뷰", "간편 결제"],
    adCopyTone: "혜택 중심의 직접적인 톤",
  },
  "전화 문의": {
    focus: "즉각적인 연결과 응대",
    landingElements: ["전화번호 강조", "운영시간", "빠른 응대 강조"],
    adCopyTone: "친근하고 즉각적인 톤",
  },
  "방문 예약": {
    focus: "접근성과 편의성",
    landingElements: ["위치/지도", "예약 시스템", "주차/교통 정보"],
    adCopyTone: "편리함을 강조하는 톤",
  },
  "회원가입": {
    focus: "가입 혜택과 가치",
    landingElements: ["가입 혜택", "서비스 소개", "간편 가입 폼"],
    adCopyTone: "혜택 중심의 유도적 톤",
  },
  "앱 설치": {
    focus: "앱 사용 가치와 편의성",
    landingElements: ["앱 기능 소개", "사용자 리뷰", "설치 버튼"],
    adCopyTone: "간결하고 직접적인 톤",
  },
};

// 고민별 솔루션 매핑 (가중치 추가)
export const painPointSolutions: Record<string, {
  priority: number;
  weight: number;
  category: "traffic" | "conversion" | "quality" | "messaging";
  solution: string;
  actionItems: string[];
  rootCause: string;
}> = {
  "전환(문의/구매)이 적음": {
    priority: 1,
    weight: 10,
    category: "conversion",
    solution: "랜딩페이지 개선 및 전환 퍼널 최적화",
    actionItems: ["CTA 버튼 강화", "폼 간소화", "신뢰 요소 추가", "페이지 속도 개선"],
    rootCause: "전환 퍼널 또는 메시지 정합성 문제",
  },
  "유입은 있으나 이탈이 많음": {
    priority: 2,
    weight: 9,
    category: "conversion",
    solution: "랜딩페이지 품질 및 타겟 정합성 개선",
    actionItems: ["콘텐츠 관련성 강화", "페이지 구조 개선", "로딩 속도 최적화", "모바일 UX 개선"],
    rootCause: "광고-랜딩 메시지 불일치 또는 페이지 품질 문제",
  },
  "광고비 대비 효율이 낮음": {
    priority: 1,
    weight: 10,
    category: "quality",
    solution: "타겟팅 정밀화 및 예산 재배분",
    actionItems: ["저효율 키워드 제외", "고효율 채널 집중", "입찰가 최적화", "시간대별 조정"],
    rootCause: "예산 분산 또는 타겟 정확도 문제",
  },
  "타겟 고객 도달이 어려움": {
    priority: 2,
    weight: 7,
    category: "traffic",
    solution: "키워드 확장 및 타겟팅 재설정",
    actionItems: ["롱테일 키워드 추가", "연관 검색어 분석", "잠재고객 타겟팅", "리마케팅 설정"],
    rootCause: "키워드 커버리지 부족 또는 타겟 설정 오류",
  },
  "경쟁사 대비 노출이 부족": {
    priority: 3,
    weight: 6,
    category: "traffic",
    solution: "입찰 전략 조정 및 품질 점수 개선",
    actionItems: ["입찰가 상향 검토", "광고 품질 개선", "확장 소재 활용", "시간대 전략 수립"],
    rootCause: "입찰 경쟁력 또는 광고 품질 문제",
  },
  "랜딩페이지 품질이 낮음": {
    priority: 1,
    weight: 10,
    category: "conversion",
    solution: "랜딩페이지 전면 개선",
    actionItems: ["콘텐츠 재구성", "디자인 개선", "신뢰 요소 추가", "CTA 최적화"],
    rootCause: "랜딩페이지 구조 및 콘텐츠 문제",
  },
  "키워드 선정이 어려움": {
    priority: 2,
    weight: 5,
    category: "traffic",
    solution: "키워드 리서치 및 구조화",
    actionItems: ["경쟁사 키워드 분석", "검색량 조사", "키워드 그룹핑", "제외 키워드 설정"],
    rootCause: "키워드 전략 부재",
  },
  "광고 소재가 부족함": {
    priority: 3,
    weight: 5,
    category: "messaging",
    solution: "다양한 광고 소재 제작",
    actionItems: ["USP 기반 소재", "혜택 강조 소재", "긴급성 소재", "후기 활용 소재"],
    rootCause: "소재 다양성 부족",
  },
  "문의는 오지만 계약이 안 됨": {
    priority: 1,
    weight: 9,
    category: "quality",
    solution: "리드 품질 개선 및 상담 프로세스 점검",
    actionItems: ["타겟 재정의", "사전 필터링 질문 추가", "상담 스크립트 개선", "후속 응대 강화"],
    rootCause: "리드 품질 또는 상담 프로세스 문제",
  },
  "광고 성과 측정이 어려움": {
    priority: 2,
    weight: 4,
    category: "quality",
    solution: "전환 추적 및 성과 측정 체계 구축",
    actionItems: ["전환 추적 코드 설치", "UTM 파라미터 체계화", "CRM 연동", "리포팅 템플릿 구축"],
    rootCause: "측정 인프라 부재",
  },
};

// 아키타입 감지 키워드 (확장)
export const archetypeKeywords: Record<Archetype, string[]> = {
  premium: ["프리미엄", "고급", "럭셔리", "VIP", "최고급", "하이엔드", "명품", "프라이빗"],
  value: ["저렴", "가성비", "실속", "알뜰", "할인", "특가", "저가", "합리적"],
  urgent: ["빠른", "당일", "즉시", "긴급", "신속", "24시간", "바로", "급한"],
  "review-based": ["후기", "사례", "실제", "인증", "고객", "리뷰", "평가", "결과"],
  "comparison-driven": ["비교", "vs", "차이", "어디", "추천", "순위", "best"],
  "expert-led": ["전문", "경력", "자격", "인증", "수상", "협회", "박사", "대표"],
  standard: [],
};

// 예시 입력 데이터 (확장)
export const exampleInputs = [
  {
    advertiserName: "홍길동 인테리어",
    industry: "인테리어/시공",
    subIndustry: "주거 인테리어",
    adGoal: "리드(문의) 확보",
    conversionType: "상담 문의",
    monthlyBudget: 3000000,
    targetAudience: "30~40대 신혼부부, 이사 예정자",
    region: "서울 강남, 송파, 서초",
    productService: "아파트 인테리어, 신혼집 꾸미기",
    usp: "15년 경력, 합리적인 가격, 1:1 맞춤 시공",
    painPoints: ["전환(문의/구매)이 적음", "유입은 있으나 이탈이 많음"],
    customerBehaviors: ["리뷰/후기를 중시함", "전문성/신뢰를 중시함"],
    currentChannels: ["네이버 검색광고", "블로그/SNS 운영"],
    responseType: "카카오톡 상담 선호",
    landingStatus: "자체 웹사이트 있음",
    websiteUrl: "https://example-interior.com",
    currentAdCopy: "강남 아파트 인테리어 전문, 무료 상담",
    landingChecklistItems: ["후기/사례 있음", "전문성/신뢰 요소 있음"],
  },
  {
    advertiserName: "스피드 철거",
    industry: "철거/원상복구",
    subIndustry: "상가 철거",
    adGoal: "신규 고객 유치",
    conversionType: "전화 문의",
    monthlyBudget: 1500000,
    targetAudience: "상가 임대인, 사업자",
    region: "서울 전지역, 경기 일부",
    productService: "상가 철거, 원상복구, 폐기물 처리",
    usp: "당일 방문 견적, 20년 경력, 보험 가입",
    painPoints: ["타겟 고객 도달이 어려움", "경쟁사 대비 노출이 부족"],
    customerBehaviors: ["빠른 응대를 원함", "가격 비교를 많이 함"],
    currentChannels: ["네이버 검색광고"],
    responseType: "전화 응대 가능",
    landingStatus: "플레이스만 있음",
    websiteUrl: "",
    currentAdCopy: "",
    landingChecklistItems: [],
  },
  {
    advertiserName: "뷰티온 화장품",
    industry: "쇼핑몰/이커머스",
    subIndustry: "뷰티",
    adGoal: "매출 증대",
    conversionType: "온라인 구매",
    monthlyBudget: 5000000,
    targetAudience: "20~30대 여성",
    region: "전국",
    productService: "기초화장품, 스킨케어 세트",
    usp: "피부과 전문의 개발, 민감성 피부 전용, 무료 반품",
    painPoints: ["광고비 대비 효율이 낮음", "전환(문의/구매)이 적음"],
    customerBehaviors: ["리뷰/후기를 중시함", "가격 비교를 많이 함"],
    currentChannels: ["네이버 쇼핑광고", "인스타그램 광고"],
    responseType: "카카오톡 상담 선호",
    landingStatus: "스마트스토어 운영 중",
    websiteUrl: "https://smartstore.naver.com/beautyon",
    currentAdCopy: "피부과 전문의가 만든 저자극 스킨케어",
    landingChecklistItems: ["후기/사례 있음", "가격/견적 안내 있음", "모바일 최적화 양호"],
  },
  {
    advertiserName: "법무법인 정의",
    industry: "문의형 서비스업",
    subIndustry: "법률 상담",
    adGoal: "리드(문의) 확보",
    conversionType: "상담 문의",
    monthlyBudget: 4000000,
    targetAudience: "이혼/상속 분쟁 당사자",
    region: "서울, 경기",
    productService: "이혼 소송, 상속 분쟁, 재산 분할",
    usp: "15년 이혼 전문 변호사, 1,200건 승소 경험, 비밀 보장",
    painPoints: ["문의는 오지만 계약이 안 됨", "광고비 대비 효율이 낮음"],
    customerBehaviors: ["전문성/신뢰를 중시함", "신중한 의사결정"],
    currentChannels: ["네이버 검색광고", "블로그/SNS 운영"],
    responseType: "전화 응대 가능",
    landingStatus: "자체 웹사이트 있음",
    websiteUrl: "https://law-justice.co.kr",
    currentAdCopy: "이혼 전문 변호사, 무료 상담",
    landingChecklistItems: ["CTA 명확함", "전문성/신뢰 요소 있음"],
  },
];
