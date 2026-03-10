import {
  FileText,
  CheckCircle,
  Smile,
  Pizza,
  Package,
  Sunrise,
  MapPin,
  Phone,
  Calendar,
  Star,
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

// ——— 탭 메타 ———
export const TABS: { id: QnATabId; label: string; icon: LucideIcon }[] = [
  { id: "request", label: "수거 신청", icon: FileText },
  { id: "completed", label: "수거 완료", icon: CheckCircle },
  { id: "persona", label: "이런 분께", icon: Smile },
];

export const TAB_ORDER: QnATabId[] = ["request", "completed", "persona"];

export function getNextTab(current: QnATabId): QnATabId {
  const i = TAB_ORDER.indexOf(current);
  return TAB_ORDER[(i + 1) % TAB_ORDER.length];
}

// ——— 타이밍 (ms) ———
export const TYPING_DURATION_MS = 1200;
export const GAP_AFTER_MESSAGE_MS = 600;
export const FIRST_TYPING_DELAY_MS = 500;
export const NEXT_TAB_DELAY_MS = 2500;

// ——— 탭별 채팅 메시지 ———
export const CHAT_BY_TAB: Record<QnATabId, ChatMsg[]> = {
  request: [
    { id: "r1", side: "left", type: "text", text: "수거 신청 방법을 안내해 드릴게요 📋" },
    { id: "r2", side: "right", type: "text", text: "네, 부탁드려요" },
    { id: "r3", side: "left", type: "text", text: "주소와 희망 수거 날짜를 알려주시면 됩니다." },
    { id: "r4", side: "right", type: "text", text: "다음 주 월요일로 신청할게요!" },
    { id: "r5", side: "left", type: "text", text: "접수 완료했습니다. 담당자가 연락드릴게요 👍" },
  ],
  completed: [
    { id: "c1", side: "left", type: "text", text: "오늘 수거가 완료되었습니다 ✅" },
    { id: "c2", side: "right", type: "text", text: "감사합니다!" },
    { id: "c3", side: "left", type: "text", text: "다음 수거일은 2주 후입니다. 알림 드릴게요." },
    { id: "c4", side: "right", type: "text", text: "알겠어요" },
  ],
  persona: [
    { id: "p1", side: "left", type: "text", text: "안녕하세요 🙂 수거 신청 도와드릴게요." },
    { id: "p2", side: "right", type: "text", text: "네, 신청할게요" },
    { id: "p3", side: "left", type: "card" },
    { id: "p4", side: "right", type: "text", text: "이거로 할게요!" },
    { id: "p5", side: "left", type: "text", text: "감사합니다. 담당자가 연락드릴게요 👍" },
  ],
};

// ——— 탭별 하단 카드 콘텐츠 ———
const PERSONAS: ContentCard[] = [
  {
    id: "delivery",
    title: "배달 자주 시키는 분",
    description: "포장재, 용기, 박스 한 봉투에. 분리수거 고민 끝",
    icon: Pizza,
    iconBg: "bg-orange-100 dark:bg-orange-900/40",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "parcel",
    title: "택배 많이 받는 분",
    description: "박스 접어 묶는 번거로움 없이 봉투에 바로",
    icon: Package,
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-700 dark:text-amber-400",
  },
  {
    id: "office",
    title: "아침이 바쁜 직장인",
    description: "출근 전 버리러 갈 필요 없음. 자는 동안 처리",
    icon: Sunrise,
    iconBg: "bg-yellow-100 dark:bg-yellow-900/40",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
];

const REQUEST_CONTENT: ContentCard[] = [
  {
    id: "req1",
    title: "신청 방법",
    description: "카카오톡으로 주소와 희망 날짜만 보내주시면 됩니다.",
    icon: FileText,
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "req2",
    title: "주소·날짜 입력",
    description: "정확한 주소와 수거 희망일을 알려주세요.",
    icon: MapPin,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "req3",
    title: "담당자 연락",
    description: "접수 후 담당자가 확인 전화 드립니다.",
    icon: Phone,
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
];

const COMPLETED_CONTENT: ContentCard[] = [
  {
    id: "comp1",
    title: "수거 완료 확인",
    description: "당일 수거 완료 시 알림으로 안내해 드립니다.",
    icon: CheckCircle,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "comp2",
    title: "다음 수거일",
    description: "정기 수거일은 2주마다 자동 안내됩니다.",
    icon: Calendar,
    iconBg: "bg-sky-100 dark:bg-sky-900/40",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  {
    id: "comp3",
    title: "만족도",
    description: "수거 후 간단한 만족도 조사에 참여해 주세요.",
    icon: Star,
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

export const CONTENT_BY_TAB: Record<QnATabId, ContentCard[]> = {
  request: REQUEST_CONTENT,
  completed: COMPLETED_CONTENT,
  persona: PERSONAS,
};
