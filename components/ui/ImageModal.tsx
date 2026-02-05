"use client";

import BaseModal from "./BaseModal";
import { handleImageError } from "@/utils/image";

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
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="4xl"
      className="p-6"
    >
      <div className="w-full h-[70vh] flex items-center justify-center overflow-hidden rounded-lg bg-gray-900 dark:bg-gray-100">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-full object-contain"
          onError={handleImageError}
        />
      </div>
    </BaseModal>
  );
}
