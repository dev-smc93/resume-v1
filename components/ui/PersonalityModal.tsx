"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";
import { personalInfo } from "@/data/resume-data";

interface PersonalityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PersonalityModal({
  isOpen,
  onClose,
}: PersonalityModalProps) {
  if (!personalInfo.personality) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-gray-800/80 dark:bg-white/80 rounded-2xl p-8 max-w-md w-full shadow-2xl relative backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
              initial={{ 
                opacity: 0,
                rotateY: -90,
                scale: 0.8
              }}
              animate={{ 
                opacity: 1,
                rotateY: 0,
                scale: 1
              }}
              exit={{ 
                opacity: 0,
                rotateY: 90,
                scale: 0.8
              }}
              transition={{ 
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold mb-6 text-gray-100 dark:text-gray-800 flex items-center gap-2 drop-shadow-lg">
                <Info size={24} className="text-blue-400 dark:text-blue-600 drop-shadow-md" />
                <span className="drop-shadow-lg">성향 및 특성</span>
              </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">MBTI</span>
                    <p className="text-xl font-semibold text-blue-400 dark:text-blue-600 mt-1 drop-shadow-lg">
                      {personalInfo.personality.mbti}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">특성</span>
                    <ul className="mt-2 space-y-2">
                      {personalInfo.personality.traits.map((trait, index) => (
                        <li
                          key={index}
                          className="text-gray-300 dark:text-gray-700 flex items-center gap-2 drop-shadow-md"
                        >
                          <span className="text-blue-400 dark:text-blue-600 drop-shadow-md">•</span>
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {personalInfo.personality.values &&
                    personalInfo.personality.values.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">
                          가치관
                        </span>
                        <ul className="mt-2 space-y-2">
                          {personalInfo.personality.values.map((value, index) => (
                            <li
                              key={index}
                              className="text-gray-300 dark:text-gray-700 flex items-center gap-2 drop-shadow-md"
                            >
                              <span className="text-blue-400 dark:text-blue-600 drop-shadow-md">•</span>
                              {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
