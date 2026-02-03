"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  modalBackdropVariants,
  modalContainerVariants,
  modalCardVariants,
  modalCardStyle,
} from "./modal-animations";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title?: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
}: ImageModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            {...modalBackdropVariants}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            {...modalContainerVariants}
          >
            <motion.div
              className="bg-gray-800/90 dark:bg-white/90 rounded-2xl p-6 max-w-4xl w-full shadow-2xl relative backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
              {...modalCardVariants}
              style={modalCardStyle}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-700 transition-colors z-10 bg-gray-800/50 dark:bg-white/50 rounded-full p-2"
              >
                <X size={24} />
              </button>
              {title && (
                <h3 className="text-xl font-bold mb-4 text-gray-100 dark:text-gray-800 text-center">
                  {title}
                </h3>
              )}
              <div className="w-full h-[70vh] flex items-center justify-center overflow-hidden rounded-lg bg-gray-900 dark:bg-gray-100">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
