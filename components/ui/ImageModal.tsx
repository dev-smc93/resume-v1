"use client";

import Image from "next/image";
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
      noScroll
    >
      <div className="w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden rounded-lg bg-gray-900 dark:bg-gray-100 relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-contain"
          onError={(e) => handleImageError(e as React.SyntheticEvent<HTMLImageElement, Event>)}
        />
      </div>
    </BaseModal>
  );
}
