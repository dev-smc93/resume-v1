"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { personalInfo } from "@/data/resume-data";

interface PersonalInfoContentProps {
  /** 모달 등 외부에서 비활성화 시 오디오 일시정지 (예: 모달 닫을 때) */
  isActive?: boolean;
}

export default function PersonalInfoContent({ isActive = true }: PersonalInfoContentProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => setIsPlaying(false);
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, []);

  useEffect(() => {
    if (!isActive && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlayPause = () => {
    if (!audioRef.current || !personalInfo.personalDetails?.audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!personalInfo.personalDetails) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
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
      </div>

      {(personalInfo.personalDetails.mbti || personalInfo.personalDetails.traits?.length || personalInfo.personalDetails.values?.length) ? (
        <>
          <div>
            {(personalInfo.personalDetails.mbti || (personalInfo.personalDetails.traits && personalInfo.personalDetails.traits.length > 0)) && (
              <div className="mb-4 grid grid-cols-3 gap-4">
                {personalInfo.personalDetails.mbti && (
                  <div>
                    <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">MBTI</span>
                    <p className="text-lg font-semibold text-blue-400 dark:text-blue-600 mt-1 drop-shadow-md">
                      {personalInfo.personalDetails.mbti}
                    </p>
                  </div>
                )}
                {personalInfo.personalDetails.traits && personalInfo.personalDetails.traits.length > 0 && (
                  <div className={personalInfo.personalDetails.mbti ? "col-span-2" : "col-start-2 col-span-2"}>
                    <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">특징</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {personalInfo.personalDetails.traits.map((trait, index) => (
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
              </div>
            )}
            {personalInfo.personalDetails.values && personalInfo.personalDetails.values.length > 0 && (
              <div>
                <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">가치관</span>
                <div className="mt-2 space-y-2">
                  {personalInfo.personalDetails.values.map((value, index) => (
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
      ) : null}

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400 dark:text-gray-600 drop-shadow-md">자기 소개</span>
          {personalInfo.personalDetails.audioUrl && (
            <button
              type="button"
              onClick={togglePlayPause}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 dark:bg-blue-500/30 text-blue-400 dark:text-blue-600 hover:bg-blue-500/30 dark:hover:bg-blue-500/40 transition-colors"
              aria-label={isPlaying ? "일시정지" : "재생"}
            >
              {isPlaying ? (
                <Pause size={16} className="fill-current" />
              ) : (
                <Play size={16} className="fill-current ml-0.5" />
              )}
            </button>
          )}
        </div>
        {personalInfo.personalDetails.audioUrl && (
          <audio
            ref={audioRef}
            src={personalInfo.personalDetails.audioUrl}
            preload="metadata"
          />
        )}
        <p className="text-gray-300 dark:text-gray-700 mt-2 leading-relaxed drop-shadow-md whitespace-pre-line pl-4 border-l-2 border-teal-400 dark:border-teal-600">
          {personalInfo.personalDetails.introduction}
        </p>
      </div>
    </div>
  );
}
