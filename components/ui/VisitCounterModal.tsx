"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import {
  modalBackdropVariants,
  modalContainerVariants,
  modalCardVariants,
  modalCardStyle,
} from "./modal-animations";

interface VisitCounterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DailyVisit {
  date: string;
  count: number;
}

export default function VisitCounterModal({
  isOpen,
  onClose,
}: VisitCounterModalProps) {
  const [dailyVisits, setDailyVisits] = useState<DailyVisit[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

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
      console.error("Failed to fetch daily visits:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
    return `${year}.${month}.${day} (${weekday})`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            {...modalBackdropVariants}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            {...modalContainerVariants}
          >
            <motion.div
              className="bg-gray-800/80 dark:bg-white/80 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto overflow-x-hidden shadow-2xl relative backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
              {...modalCardVariants}
              style={modalCardStyle}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-700 transition-colors z-10"
              >
                <X size={24} />
              </button>
              
              <h3 className="text-2xl font-bold mb-6 text-gray-100 dark:text-gray-800 flex items-center gap-2 drop-shadow-lg">
                <TrendingUp size={24} className="text-blue-400 dark:text-blue-600 drop-shadow-md" />
                <span className="drop-shadow-lg">방문 통계</span>
              </h3>

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
                          <motion.div
                            key={visit.date}
                            className="bg-gray-700/30 dark:bg-gray-100/30 rounded-lg p-4 flex items-center justify-between hover:bg-gray-700/50 dark:hover:bg-gray-100/50 transition-colors min-w-0 w-full"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-600 flex-shrink-0"></div>
                              <span className="text-gray-300 dark:text-gray-700 font-medium truncate">
                                {formatDate(visit.date)}
                              </span>
                            </div>
                            <span className="text-lg font-bold text-blue-400 dark:text-blue-600 flex-shrink-0 ml-2">
                              {visit.count.toLocaleString()}
                            </span>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
