"use client";

import { User } from "lucide-react";
import BaseModal from "./BaseModal";
import PersonalInfoContent from "./PersonalInfoContent";

interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 클릭 시점 스크롤 위치 (스크롤 이동 방지) */
  savedScrollY?: number;
}

export default function PersonalInfoModal({
  isOpen,
  onClose,
  savedScrollY,
}: PersonalInfoModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="인적사항"
      titleIcon={<User size={24} className="text-blue-400 dark:text-blue-600 drop-shadow-md" />}
      maxWidth="md"
      savedScrollY={savedScrollY}
    >
      <PersonalInfoContent isActive={isOpen} />
    </BaseModal>
  );
}
