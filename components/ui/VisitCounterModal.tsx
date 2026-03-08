"use client";

import { TrendingUp, Calendar, Monitor, Smartphone, TabletSmartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BaseModal from "./BaseModal";
import { formatDate } from "@/utils/date";

interface VisitCounterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DailyVisit {
  date: string;
  count: number;
}

interface VisitLogItem {
  ip: string;
  userAgent: string;
  deviceType: string;
  lastVisited: string;
}

export default function VisitCounterModal({
  isOpen,
  onClose,
}: VisitCounterModalProps) {
  const [dailyVisits, setDailyVisits] = useState<DailyVisit[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [logsByDate, setLogsByDate] = useState<Record<string, VisitLogItem[]>>({});
  const [logsLoadingDate, setLogsLoadingDate] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchDailyVisits();
    }
  }, [isOpen]);

  const fetchDailyVisits = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/visits/daily");
      if (response.ok) {
        const data = await response.json();
        setDailyVisits(data.dailyCounts || []);
        
        // 전체 카운트 계산
        const total = data.dailyCounts?.reduce(
          (sum: number, item: DailyVisit) => sum + item.count,
          0
        ) || 0;
        setTotalCount(total);
      }
    } catch (error) {
      // 조용히 실패
    } finally {
      setLoading(false);
    }
  };

  const getDeviceLabelAndIcon = (deviceType: string) => {
    const type = deviceType.toLowerCase();
    if (type === "mobile") {
      return { label: "모바일", icon: Smartphone };
    }
    if (type === "tablet") {
      return { label: "태블릿", icon: TabletSmartphone };
    }
    if (type === "pc") {
      return { label: "PC", icon: Monitor };
    }
    return { label: "알 수 없음", icon: Monitor };
  };

  const toggleDateLogs = async (date: string) => {
    if (expandedDate === date) {
      setExpandedDate(null);
      return;
    }

    setExpandedDate(date);

    if (logsByDate[date]) {
      return;
    }

    setLogsLoadingDate(date);
    try {
      const response = await fetch(`/api/visits/logs?date=${date}`);
      if (response.ok) {
        const data = await response.json();
        setLogsByDate((prev) => ({
          ...prev,
          [date]: (data.logs || []) as VisitLogItem[],
        }));
      }
    } catch {
      // 조용히 실패
    } finally {
      setLogsLoadingDate(null);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="방문 통계"
      titleIcon={<TrendingUp size={24} className="text-blue-400 dark:text-blue-600 drop-shadow-md" />}
      maxWidth="2xl"
    >
      {loading ? (
                <div className="flex items-center justify-center py-12">
                  <motion.div
                    className="w-12 h-12 border-4 border-gray-600 dark:border-gray-400 border-t-blue-500 dark:border-t-blue-600 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 전체 통계 */}
                  <div className="bg-gray-700/50 dark:bg-gray-100/50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 dark:text-gray-600">전체 방문 수</span>
                      <span className="text-2xl font-bold text-blue-400 dark:text-blue-600">
                        {totalCount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* 일자별 목록 */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-200 dark:text-gray-700 flex items-center gap-2">
                      <Calendar size={20} className="text-blue-400 dark:text-blue-600" />
                      일자별 방문 수 (최근 30일)
                    </h4>
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto overflow-x-hidden">
                      {dailyVisits.length === 0 ? (
                        <div className="text-center py-8 text-gray-400 dark:text-gray-600">
                          방문 기록이 없습니다.
                        </div>
                      ) : (
                        dailyVisits.map((visit, index) => (
                          <div key={visit.date} className="min-w-0 w-full">
                            <motion.button
                              type="button"
                              onClick={() => toggleDateLogs(visit.date)}
                              className="w-full bg-gray-700/30 dark:bg-gray-100/30 rounded-lg p-4 flex items-center justify-between hover:bg-gray-700/50 dark:hover:bg-gray-100/50 transition-colors min-w-0"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1 text-left">
                                <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-600 flex-shrink-0" />
                                <span className="text-gray-300 dark:text-gray-700 font-medium truncate">
                                  {formatDate(visit.date)}
                                </span>
                              </div>
                              <span className="text-lg font-bold text-blue-400 dark:text-blue-600 flex-shrink-0 ml-2">
                                {visit.count.toLocaleString()}
                              </span>
                            </motion.button>

                            {/* 아코디언 상세 (방문 IP / 기기) */}
                            {expandedDate === visit.date && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2 mx-2 mb-1 rounded-lg bg-gray-800/60 dark:bg-gray-50/70 border border-gray-700/60 dark:border-gray-300/70">
                                  {logsLoadingDate === visit.date ? (
                                    <div className="flex items-center justify-center py-4">
                                      <motion.div
                                        className="w-6 h-6 border-2 border-gray-500 dark:border-gray-400 border-t-blue-500 dark:border-t-blue-600 rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{
                                          duration: 1,
                                          repeat: Infinity,
                                          ease: "linear",
                                        }}
                                      />
                                    </div>
                                  ) : (logsByDate[visit.date] || []).length === 0 ? (
                                    <div className="text-center py-3 text-xs text-gray-400 dark:text-gray-600">
                                      해당 일자의 상세 방문 로그가 없습니다.
                                    </div>
                                  ) : (
                                    <ul className="max-h-40 overflow-y-auto divide-y divide-gray-700/60 dark:divide-gray-300/60 text-xs">
                                      {(logsByDate[visit.date] || []).map((log, logIndex) => {
                                        const { label, icon: Icon } = getDeviceLabelAndIcon(log.deviceType);
                                        return (
                                          <li
                                            key={`${log.ip}-${logIndex}`}
                                            className="px-3 py-2 flex items-start gap-3"
                                          >
                                            <div className="mt-0.5">
                                              <Icon size={14} className="text-blue-400 dark:text-blue-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                              <div className="flex items-center justify-between gap-2">
                                                <span className="font-medium text-gray-200 dark:text-gray-800 truncate">
                                                  {log.ip}
                                                </span>
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-700/70 dark:bg-gray-200 text-gray-200 dark:text-gray-700">
                                                  {label}
                                                </span>
                                              </div>
                                              <div className="mt-0.5 text-[10px] text-gray-400 dark:text-gray-600 truncate">
                                                {log.userAgent}
                                              </div>
                                            </div>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
      )}
    </BaseModal>
  );
}
