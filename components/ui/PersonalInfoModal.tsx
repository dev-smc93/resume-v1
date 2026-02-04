"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";
import { personalInfo } from "@/data/resume-data";
import {
  modalBackdropVariants,
  modalContainerVariants,
  modalCardVariants,
  modalCardStyle,
} from "./modal-animations";

interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PersonalInfoModal({
  isOpen,
  onClose,
}: PersonalInfoModalProps) {
  if (!personalInfo.personalDetails) return null;

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
              className="bg-gray-800/80 dark:bg-white/80 rounded-2xl p-6 md:p-8 max-w-md w-full max-h-[80vh] overflow-y-auto overflow-x-hidden shadow-2xl relative backdrop-blur-sm"
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
                <User size={24} className="text-blue-400 dark:text-blue-600 drop-shadow-md" />
                <span className="drop-shadow-lg">인적사항</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">이름</span>
                  <p className="text-xl font-semibold text-blue-400 dark:text-blue-600 mt-1 drop-shadow-lg">
                    {personalInfo.name}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">생년월일</span>
                  <p className="text-lg font-semibold text-gray-300 dark:text-gray-700 mt-1 drop-shadow-md">
                    {personalInfo.personalDetails.birthDate}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">성별</span>
                  <p className="text-lg font-semibold text-gray-300 dark:text-gray-700 mt-1 drop-shadow-md">
                    {personalInfo.personalDetails.gender}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">자기 소개</span>
                  <p className="text-gray-300 dark:text-gray-700 mt-2 leading-relaxed drop-shadow-md whitespace-pre-line">
                    {personalInfo.personalDetails.introduction}
                  </p>
                </div>
                
                {personalInfo.personality && (
                  <>
                    <div className="border-t border-gray-700 dark:border-gray-300 pt-4 mt-4">
                      <div className="mb-4">
                        <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">MBTI</span>
                        <p className="text-lg font-semibold text-purple-400 dark:text-purple-600 mt-1 drop-shadow-md">
                          {personalInfo.personality.mbti}
                        </p>
                      </div>
                      
                      {personalInfo.personality.traits && personalInfo.personality.traits.length > 0 && (
                        <div className="mb-4">
                          <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">특징</span>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {personalInfo.personality.traits.map((trait, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 bg-blue-500/20 dark:bg-blue-500/30 text-blue-300 dark:text-blue-700 rounded-full text-sm font-medium drop-shadow-md"
                              >
                                {trait}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {personalInfo.personality.values && personalInfo.personality.values.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">가치관</span>
                          <div className="mt-2 space-y-2">
                            {personalInfo.personality.values.map((value, index) => (
                              <p
                                key={index}
                                className="text-gray-300 dark:text-gray-700 leading-relaxed drop-shadow-md pl-4 border-l-2 border-teal-400 dark:border-teal-600"
                              >
                                {value}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
