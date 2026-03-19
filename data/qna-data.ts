import { Briefcase, Code2, Server, Package, ClipboardList, Target, Zap, CheckCircle, Layers, TrendingUp, ArrowUpRight, type LucideIcon } from "lucide-react";

// ——— 타입 ———
export type ChatMsg = {
  id: string;
  side: "left" | "right";
  type: "text" | "card" | "personalInfoLink";
  text?: string;
};

export type ContentCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

export type QnATabId = "request" | "completed" | "persona";

// ——— 탭 메타 (1 경력·경험 / 2 일하는 방식 / 3 앞으로 방향) ———
export const TABS: { id: QnATabId; label: string; icon: LucideIcon }[] = [
  { id: "request", label: "경력·경험", icon: Briefcase },
  { id: "completed", label: "일하는 방식", icon: Target },
  { id: "persona", label: "앞으로 방향", icon: TrendingUp },
];

export const TAB_ORDER: QnATabId[] = ["request", "completed", "persona"];

export function getNextTab(current: QnATabId): QnATabId {
  const i = TAB_ORDER.indexOf(current);
  return TAB_ORDER[(i + 1) % TAB_ORDER.length];
}

// ——— 타이밍 (ms) — 면접관이 읽기 편하도록 여유 있게 설정
export const TYPING_DURATION_MS = 2000;
export const GAP_AFTER_MESSAGE_MS = 1200;
export const FIRST_TYPING_DELAY_MS = 800;
export const NEXT_TAB_DELAY_MS = 6000;

// ——— 탭별 채팅 메시지 (left = 답변(지원자), right = 질문(면접관)) ———
export const CHAT_BY_TAB: Record<QnATabId, ChatMsg[]> = {
  // 1️⃣ 경력과 경험
  request: [
    { id: "r1", side: "right", type: "text", text: "어떤 경험이 있나요? 개발 위주인가요?" },
    { id: "r2", side: "left", type: "text", text: "웹 서비스 설계, 개발, 구축 및 운영까지 전 과정에 참여한 경험이 있습니다." },
    { id: "r3", side: "left", type: "text", text: "Java, Python, Next.js 기반으로 다양한 웹 서비스를 개발했습니다." },
    { id: "r4", side: "right", type: "text", text: "개발 외에 다른 경험도 있나요?" },
    { id: "r5", side: "left", type: "text", text: "네. 삼성전자에서 모바일 시료 배송·회수 및 이력 관리, 양산 전 제품 승인 테스트 수행과 결과 정리를 담당했습니다." },
    { id: "r6", side: "left", type: "text", text: "데스크탑·노트북 분해·조립 및 기능 테스트, 엑셀로 테스트 결과·시료 이력 관리한 경험도 있습니다." },
  ],
  // 2️⃣ 일하는 방식 (강점 / 단점)
  completed: [
    { id: "c1", side: "right", type: "text", text: "강점은 무엇인가요?" },
    { id: "c2", side: "left", type: "text", text: "문제를 구조적으로 분석하고 반복 업무를 자동화하는 데 강점이 있습니다." },
    { id: "c3", side: "left", type: "text", text: "실제로 운영 과정에서 발생하는 반복 업무를 시스템화하여 업무 효율을 개선한 경험이 있습니다." },
    { id: "c4", side: "right", type: "text", text: "단점은 무엇인가요?" },
    { id: "c5", side: "left", type: "text", text: "즉흥적으로 말로 풀어내는 데는 아직 부족한 부분이 있어, 실무에서는 문서나 구조로 정리해 공유하는 방식으로 소통을 보완했습니다." },
    { id: "c6", side: "left", type: "text", text: "키워드 중심·결론 먼저 말하기로도 계속 보완 중입니다." },
    { id: "c7", side: "right", type: "text", text: "성향이나 가치관은 어떻게 되나요?" },
    { id: "c8", side: "left", type: "text", text: "MBTI, 특성, 가치관을 정리해 두었습니다. 아래 인적 사항을 클릭하면 상세 하게 보실 수 있습니다." },
    { id: "c9", side: "left", type: "personalInfoLink" },
  ],
  // 3️⃣ 앞으로 방향 (퇴사 이유 / 목표)
  persona: [
    { id: "p1", side: "right", type: "text", text: "왜 퇴사하게 되었나요?" },
    { id: "p3", side: "left", type: "card" },
    { id: "p4", side: "left", type: "text", text: "앞으로는 이러한 경험을 바탕으로 보다 안정적인 환경에서 지속적으로 역량을 발전시키고 싶어 새로운 기회를 준비하게 되었습니다." },
  ],
};

// ——— 탭별 하단 카드 콘텐츠 (핵심 키워드·요약) ———
const EXPERIENCE_CONTENT: ContentCard[] = [
  {
    id: "exp1",
    title: "웹 전 과정 참여",
    description: "설계, 개발, 구축, 운영까지 한 사이클을 경험했습니다.",
    icon: Briefcase,
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "exp2",
    title: "Java / Python / Next.js",
    description: "다양한 스택으로 웹 서비스를 설계하고 개발했습니다.",
    icon: Code2,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "exp3",
    title: "자재·시료 관리",
    description: "삼성전자에서 모바일 시료 배송·회수 및 이력 관리 업무를 담당했습니다.",
    icon: Package,
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "exp4",
    title: "제품 테스트",
    description: "양산 전 승인 테스트, 데스크탑·노트북 기능 테스트 및 결과 정리 경험이 있습니다.",
    icon: ClipboardList,
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
];

const WORKSTYLE_CONTENT: ContentCard[] = [
  {
    id: "ws1",
    title: "구조적 분석·자동화",
    description: "문제를 구조적으로 분석하고 반복 업무를 시스템화합니다.",
    icon: Target,
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "ws2",
    title: "우선순위와 빠른 실행",
    description: "우선순위를 정하고 빠르게 실행한 뒤 개선하는 방식을 지향합니다.",
    icon: Zap,
    iconBg: "bg-orange-100 dark:bg-orange-900/40",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "ws3",
    title: "시스템화 경험",
    description: "운영 과정의 반복 업무를 시스템화해 업무 효율을 개선한 경험이 있습니다.",
    icon: CheckCircle,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

const CAREER_CONTENT: ContentCard[] = [
  {
    id: "cr2",
    title: "안정적 성장·새 기회",
    description: "보다 안정적인 환경에서 지속적으로 역량을 발전시키고 싶습니다.",
    icon: TrendingUp,
    iconBg: "bg-teal-100 dark:bg-teal-900/40",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    id: "cr1",
    title: "다양한 역할 경험",
    description: "개발, 운영, 자동화 업무까지 다양한 역할을 수행했습니다.",
    icon: Layers,
    iconBg: "bg-sky-100 dark:bg-sky-900/40",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  {
    id: "cr3",
    title: "역량 발전",
    description: "쌓은 경험을 바탕으로 새로운 기회에서 성장할 준비가 되어 있습니다.",
    icon: ArrowUpRight,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
];

export const CONTENT_BY_TAB: Record<QnATabId, ContentCard[]> = {
  request: EXPERIENCE_CONTENT,
  completed: WORKSTYLE_CONTENT,
  persona: CAREER_CONTENT,
};
