import {
  Briefcase,
  Code2,
  Server,
  Target,
  Zap,
  CheckCircle,
  Layers,
  TrendingUp,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

// ——— 타입 ———
export type ChatMsg = {
  id: string;
  side: "left" | "right";
  type: "text" | "card";
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

// ——— 탭 메타 (1 경력·경험 / 2 일하는 방식 / 3 커리어 방향) ———
export const TABS: { id: QnATabId; label: string; icon: LucideIcon }[] = [
  { id: "request", label: "경력·경험", icon: Briefcase },
  { id: "completed", label: "일하는 방식", icon: Target },
  { id: "persona", label: "커리어 방향", icon: TrendingUp },
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
export const NEXT_TAB_DELAY_MS = 4000;

// ——— 탭별 채팅 메시지 (left = 질문, right = 답변) ———
export const CHAT_BY_TAB: Record<QnATabId, ChatMsg[]> = {
  // 1️⃣ 경력과 경험
  request: [
    { id: "r1", side: "left", type: "text", text: "어떤 개발 경험이 있나요? 어떤 기술을 사용했나요?" },
    { id: "r2", side: "right", type: "text", text: "웹 서비스 설계, 개발, 구축 및 운영까지 전 과정에 참여한 경험이 있습니다." },
    { id: "r3", side: "right", type: "text", text: "Java, Python, Next.js 기반으로 다양한 웹 서비스를 개발했습니다." },
    { id: "r4", side: "left", type: "text", text: "운영 경험도 있나요?" },
    { id: "r5", side: "right", type: "text", text: "네. 서비스 배포와 모니터링, 반복 업무 자동화까지 운영 단계까지 경험했습니다." },
  ],
  // 2️⃣ 일하는 방식 (강점 / 단점)
  completed: [
    { id: "c1", side: "left", type: "text", text: "강점은 무엇인가요?" },
    { id: "c2", side: "right", type: "text", text: "문제를 구조적으로 분석하고 반복 업무를 자동화하는 데 강점이 있습니다." },
    { id: "c3", side: "right", type: "text", text: "실제로 운영 과정에서 발생하는 반복 업무를 시스템화하여 업무 효율을 개선한 경험이 있습니다." },
    { id: "c4", side: "left", type: "text", text: "단점은 무엇인가요?" },
    { id: "c5", side: "right", type: "text", text: "처음에는 문제를 깊이 분석하려는 성향 때문에 시간이 오래 걸리는 경우가 있었습니다." },
    { id: "c6", side: "right", type: "text", text: "현재는 우선순위를 정하고 빠르게 실행한 뒤 개선하는 방식으로 보완하고 있습니다." },
  ],
  // 3️⃣ 커리어 방향 (퇴사 이유 / 목표)
  persona: [
    { id: "p1", side: "left", type: "text", text: "왜 퇴사하게 되었나요?" },
    { id: "p2", side: "right", type: "text", text: "다양한 역할을 수행하며 개발뿐 아니라 운영과 자동화 업무까지 경험하게 되었습니다." },
    { id: "p3", side: "left", type: "card" },
    { id: "p4", side: "right", type: "text", text: "앞으로는 이러한 경험을 바탕으로 보다 안정적인 환경에서 지속적으로 역량을 발전시키고 싶어 새로운 기회를 준비하게 되었습니다." },
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
    title: "운영 경험",
    description: "배포, 모니터링, 반복 업무 자동화까지 운영 단계를 다뤘습니다.",
    icon: Server,
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
