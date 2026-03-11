"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/hooks/useSectionInView";
import { ANIMATION_DURATION } from "@/constants/animations";
import {
  CHAT_BY_TAB,
  CONTENT_BY_TAB,
  TABS,
  TAB_ORDER,
  getNextTab,
  TYPING_DURATION_MS,
  GAP_AFTER_MESSAGE_MS,
  FIRST_TYPING_DELAY_MS,
  NEXT_TAB_DELAY_MS,
  type QnATabId,
} from "@/data/qna-data";
import { Paperclip } from "lucide-react";

const PERSONA_CARD_IN_CHAT = CONTENT_BY_TAB.persona[0];

function openPersonalInfoFromQnA() {
  window.dispatchEvent(new CustomEvent("openPersonalInfoModal"));
}

export default function QnA() {
  const [ref, inView] = useSectionInView();
  const [activeTab, setActiveTab] = useState<QnATabId>("request");
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingSide, setTypingSide] = useState<"left" | "right">("left");
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const currentMessages = CHAT_BY_TAB[activeTab];

  // 마지막 채팅 버블이 화면을 넘으면, 핸드폰 안 채팅 목록만 맨 아래로 자동 스크롤 (입력창은 고정)
  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;
    const id = setTimeout(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, 80);
    return () => clearTimeout(id);
  }, [visibleCount, isTyping]);

  // 채팅 입력 중 모션 → 메시지 표시. 완료 시 다음 탭으로 자동 이동
  useEffect(() => {
    if (!inView) return;
    const messages = CHAT_BY_TAB[activeTab];
    const clearAll = () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
    const scheduleNext = (nextIndex: number, delayMs: number) => {
      if (nextIndex >= messages.length) {
        timeoutsRef.current.push(
          setTimeout(() => {
            setActiveTab((prev) => getNextTab(prev));
            setVisibleCount(0);
            setIsTyping(false);
          }, NEXT_TAB_DELAY_MS),
        );
        return;
      }
      timeoutsRef.current.push(
        setTimeout(() => {
          setTypingSide(messages[nextIndex].side);
          setIsTyping(true);
          timeoutsRef.current.push(
            setTimeout(() => {
              setIsTyping(false);
              setVisibleCount(nextIndex + 1);
              scheduleNext(nextIndex + 1, GAP_AFTER_MESSAGE_MS);
            }, TYPING_DURATION_MS),
          );
        }, delayMs),
      );
    };
    setVisibleCount(0);
    setIsTyping(false);
    scheduleNext(0, FIRST_TYPING_DELAY_MS);
    return () => clearAll();
  }, [inView, activeTab]);

  const handleTabClick = (tabId: QnATabId) => {
    setActiveTab(tabId);
    setVisibleCount(0);
    setIsTyping(false);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const activeTabIndex = TAB_ORDER.indexOf(activeTab);

  return (
    <div ref={ref} className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
        {/* 왼쪽: 모바일 폰 목업 + 채팅 UI */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.1 }}
        >
          <div className="relative w-[280px] md:w-[320px]">
            {/* 폰 프레임 - 높이 확대 */}
            <div className="rounded-[2.5rem] bg-black pt-7 pb-2 px-2 shadow-2xl border-4 border-gray-800 h-[580px] md:h-[640px] flex flex-col">
              {/* 상단 베젤: 카메라 + 스피커 */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-700 border border-gray-600" aria-hidden />
                <div className="w-10 h-1.5 rounded-full bg-gray-700" aria-hidden />
              </div>
              <div className="rounded-[2rem] overflow-hidden bg-white dark:bg-gray-900 flex-1 flex flex-col min-h-0 mt-0">
                {/* iOS 스타일 상태바: 초록 배경 + 흰색 시간·신호·배터리 */}
                <div className="bg-emerald-500 px-5 pt-3 pb-1 flex items-center justify-between shrink-0">
                  <span className="text-white text-[13px] font-medium tabular-nums">9:41</span>
                  <div className="flex items-center gap-1.5">
                    {/* 신호 강도 (4칸) */}
                    <div className="flex items-end gap-0.5">
                      <span className="w-1 bg-white rounded-sm opacity-90" style={{ height: 4 }} />
                      <span className="w-1 bg-white rounded-sm opacity-95" style={{ height: 6 }} />
                      <span className="w-1 bg-white rounded-sm" style={{ height: 8 }} />
                      <span className="w-1 bg-white rounded-sm" style={{ height: 10 }} />
                    </div>
                    {/* 배터리 아이콘: 테두리 + 두꺼운 흰색 게이지바 + 우측 노브 */}
                    <div className="ml-1.5 flex items-center">
                      <div className="relative w-5 h-3 rounded-[3px] border-[1.5px] border-white overflow-hidden">
                        <div className="absolute left-[2px] right-[5px] top-[2px] bottom-[2px] rounded-[1px] !bg-white" />
                      </div>
                      <div className="w-0.5 h-2 rounded-r -ml-px border-0 shrink-0" style={{ backgroundColor: "#fff" }} aria-hidden />
                    </div>
                  </div>
                </div>
                {/* 앱 헤더 (초록 이어짐) */}
                <div className="bg-emerald-500 px-4 pb-3 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-600 flex-shrink-0 flex items-center justify-center">
                      <img
                        src="/profile.jpg"
                        alt="프로필"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">주요 Q&A</p>
                      <p className="text-emerald-100 text-xs">{TABS.find((t) => t.id === activeTab)?.label ?? "경력·커리어"}</p>
                    </div>
                  </div>
                  {/* 페이지 인디케이터 (메뉴 버튼 자리, 탭과 연동) */}
                  <div className="flex items-center gap-1.5">
                    {TAB_ORDER.map((_, index) => (
                      <span
                        key={index}
                        className={`block h-1.5 rounded-full transition-all duration-300 ${
                          index === activeTabIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
                        }`}
                        aria-hidden
                      />
                    ))}
                  </div>
                </div>
                {/* 채팅 영역: 목록만 스크롤, 입력창은 하단 고정, 배경 약간 하늘색 고정 */}
                <div className="pt-3 pb-3 pl-3 pr-5 bg-sky-50/90 flex-1 flex flex-col min-h-0">
                  <p className="text-center text-gray-400 dark:text-gray-500 text-xs py-2 shrink-0">오늘</p>
                  {/* 채팅 목록만 스크롤, 마지막 버블이 화면 넘으면 맨 아래로 자동 스크롤 */}
                  <div
                    ref={chatScrollRef}
                    className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide"
                  >
                    <div className="space-y-2 pb-4">
                    {currentMessages.slice(0, visibleCount).map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className={`flex ${msg.side === "left" ? "justify-start" : "justify-end"}`}
                      >
                        {msg.type === "text" && (
                          <div
                            className={`max-w-[85%] rounded-2xl shadow-sm px-3 py-2 ${
                              msg.side === "left" ? "rounded-tl-sm bg-white dark:bg-gray-700" : "rounded-br-sm bg-emerald-500 text-white"
                            }`}
                          >
                            <p className={`text-sm ${msg.side === "left" ? "phone-chat-bubble-text dark:text-gray-200" : ""}`}>{msg.text}</p>
                          </div>
                        )}
                        {msg.type === "personalInfoLink" && (
                          <button
                            type="button"
                            onClick={openPersonalInfoFromQnA}
                            className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white dark:bg-gray-700 shadow-sm px-3 py-2 flex items-center gap-2 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                          >
                            <span className="text-sm font-medium phone-chat-bubble-text dark:text-gray-200">인적사항</span>
                            <Paperclip className="w-4 h-4 shrink-0 phone-chat-bubble-text dark:text-gray-200" aria-hidden />
                          </button>
                        )}
                        {msg.type === "card" && (() => {
                          const CardIcon = PERSONA_CARD_IN_CHAT.icon;
                          return (
                            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white dark:bg-gray-700 shadow-md overflow-hidden">
                              <div className="p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${PERSONA_CARD_IN_CHAT.iconBg}`}>
                                    <CardIcon className={`w-4 h-4 ${PERSONA_CARD_IN_CHAT.iconColor}`} />
                                  </div>
                                  <span className="font-bold text-sm phone-chat-bubble-text dark:text-gray-100">{PERSONA_CARD_IN_CHAT.title}</span>
                                </div>
                                <p className="text-xs leading-relaxed phone-chat-bubble-text dark:text-gray-300">{PERSONA_CARD_IN_CHAT.description}</p>
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    ))}
                    {/* 입력 중 모션: 채팅 버블 아래에 표시 */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        className={`flex items-end gap-1.5 ${typingSide === "left" ? "justify-start" : "justify-end"}`}
                      >
                        {typingSide === "left" && (
                          <div className="w-8 h-8 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-600 flex-shrink-0 shadow-sm flex items-center justify-center">
                            <img src="/profile.jpg" alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div
                          className={`rounded-2xl shadow-sm px-4 py-2.5 flex items-center gap-1 ${
                            typingSide === "left" ? "rounded-tl-sm bg-white dark:bg-gray-700" : "rounded-br-sm bg-emerald-500"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full animate-typing-dots ${typingSide === "left" ? "bg-gray-400 dark:bg-gray-500" : "bg-white/80"}`}
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className={`w-1.5 h-1.5 rounded-full animate-typing-dots ${typingSide === "left" ? "bg-gray-500 dark:bg-gray-400" : "bg-white"}`}
                            style={{ animationDelay: "0.2s" }}
                          />
                          <span
                            className={`w-1.5 h-1.5 rounded-full animate-typing-dots ${typingSide === "left" ? "bg-gray-600 dark:bg-gray-300" : "bg-white/80"}`}
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </motion.div>
                    )}
                    </div>
                  </div>
                  {/* 입력창 - 하단 고정, 전송 버튼이 잘리지 않도록 오른쪽 여백 확보 */}
                  <div className="flex items-center gap-2 pt-4 pb-0.5 shrink-0 pr-1">
                    <input
                      type="text"
                      placeholder="메시지를 입력하세요..."
                      readOnly
                      className="flex-1 min-w-0 rounded-full bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-600 placeholder-gray-400"
                    />
                    <button type="button" aria-label="전송" className="w-10 h-10 flex-shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                      <span className="text-lg">➤</span>
                    </button>
                  </div>
                </div>
                {/* 홈 인디케이터(제스처 바) - 진짜 핸드폰처럼 */}
                <div className="bg-sky-50/90 pb-2 pt-1 flex justify-center shrink-0">
                  <div className="w-24 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 shadow-sm" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }} aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 오른쪽: 버튼 그룹 + 사용자 페르소나 */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.2 }}
        >
          {/* 알약 버튼 그룹 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    isActive ? "bg-emerald-500 text-white shadow-md" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 탭에 따른 하단 내용 (테두리 없음) */}
          <div className="space-y-5">
            {CONTENT_BY_TAB[activeTab].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-800/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: ANIMATION_DURATION.NORMAL,
                    delay: 0.3 + index * 0.1,
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
