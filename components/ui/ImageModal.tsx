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
  /** 클릭 시점 스크롤 위치 (모달 열릴 때 배경 홈으로 이동 방지) */
  savedScrollY?: number;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  savedScrollY,
}: ImageModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="4xl"
      className="p-6"
      noScroll
      savedScrollY={savedScrollY}
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
