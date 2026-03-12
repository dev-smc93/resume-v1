"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { ArrowDown, MessageCircle, User } from "lucide-react";
import { personalInfo } from "@/data/resume-data";
import VisitCounter from "@/components/ui/VisitCounter";
import VisitCounterModal from "@/components/ui/VisitCounterModal";
import { scrollToSection } from "@/utils/scroll";
import { captureScrollY } from "@/utils/personalInfoModalScroll";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] as const,
    },
  },
};

// Hero 백그라운드 영상 (1~3개, 2개 이상이면 순환 재생)
// public/video/hero/ 에 영상 추가 후 경로 등록
const HERO_VIDEOS: string[] = [
  "/video/hero/background.mp4",
  "/video/hero/background2.mp4",
  "/video/hero/background3.mp4",
];

const scrollIndicatorVariants = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
};

const CROSSFADE_DURATION_MS = 800;

export default function Hero() {
  const typingTexts = personalInfo.typingTexts || ["개발자"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [visitCount, setVisitCount] = useState(0);
  const [isVisitCounterModalOpen, setIsVisitCounterModalOpen] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollMoreRef = useRef<HTMLDivElement>(null);

  // 크로스페이드 (2개 이상 영상): A/B 전환
  const [crossfadeSourceIndex, setCrossfadeSourceIndex] = useState(0); // 현재 화면에 보이는 소스 인덱스
  const [frontIsA, setFrontIsA] = useState(true); // true=A가 앞, false=B가 앞
  const [opacityA, setOpacityA] = useState(1);
  const [opacityB, setOpacityB] = useState(0);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const crossfadeInitialized = useRef(false);

  const videoSources = useMemo(
    () => HERO_VIDEOS.filter(Boolean).slice(0, 3),
    []
  );
  const isRotation = videoSources.length > 1;
  const currentSrc = videoSources[videoIndex % videoSources.length];

  // 단일 영상: 기존 로직
  useEffect(() => {
    if (isRotation) return;
    const video = videoRef.current;
    if (!video || videoSources.length === 0) return;
    video.muted = true;
    const tryPlay = () => video.play().catch(() => {});
    const handlePlaying = () => setVideoPlaying(true);
    video.addEventListener("canplay", tryPlay, { once: true });
    video.addEventListener("playing", handlePlaying);
    tryPlay();
    const t = setTimeout(tryPlay, 800);
    return () => {
      clearTimeout(t);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [videoSources.length, isRotation]);

  // 단일 영상: src 반영
  useEffect(() => {
    if (isRotation) return;
    const video = videoRef.current;
    if (!video || !currentSrc) return;
    video.src = currentSrc;
    video.load();
    video.play().catch(() => {});
  }, [currentSrc, videoIndex, isRotation]);

  // 단일 영상: 루프 시 페이드
  useEffect(() => {
    if (isRotation) return;
    const video = videoRef.current;
    if (!video || videoSources.length === 0) return;
    const FADE_DURATION = 0.8;
    const handleTimeUpdate = () => {
      const { currentTime, duration } = video;
      if (duration <= 1) return;
      if (currentTime >= duration - FADE_DURATION) setVideoOpacity(0);
      else if (currentTime < FADE_DURATION) setVideoOpacity(1);
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [videoSources, videoSources.length, isRotation]);

  // 크로스페이드: 초기 설정 및 src 할당
  useEffect(() => {
    if (!isRotation || videoSources.length === 0) return;
    const va = videoARef.current;
    const vb = videoBRef.current;
    if (!va || !vb) return;

    va.muted = true;
    vb.muted = true;

    const srcFront = videoSources[crossfadeSourceIndex];
    const srcBack = videoSources[(crossfadeSourceIndex + 1) % videoSources.length];

    if (!crossfadeInitialized.current) {
      crossfadeInitialized.current = true;
      if (frontIsA) {
        va.src = srcFront;
        vb.src = srcBack;
      } else {
        va.src = srcBack;
        vb.src = srcFront;
      }
      va.load();
      vb.load();
      va.play().catch(() => {}); // front만 재생, back은 handleEnded에서 재생 (동시 재생 제한 회피)
    } else {
      // 전환 후 back에는 다음 전환용 소스 로드만 (play는 handleEnded에서 → 동시 재생 시 프론트가 멈춤 방지)
      const back = frontIsA ? vb : va;
      const nextForBack = videoSources[(crossfadeSourceIndex + 1) % videoSources.length];
      back.src = nextForBack;
      back.load();
    }
  }, [isRotation, videoSources, crossfadeSourceIndex, frontIsA]);

  // 크로스페이드: playing 감지
  useEffect(() => {
    if (!isRotation) return;
    const va = videoARef.current;
    const vb = videoBRef.current;
    if (!va || !vb) return;

    const handlePlaying = () => setVideoPlaying(true);
    va.addEventListener("playing", handlePlaying);
    vb.addEventListener("playing", handlePlaying);
    return () => {
      va.removeEventListener("playing", handlePlaying);
      vb.removeEventListener("playing", handlePlaying);
    };
  }, [isRotation]);

  // 크로스페이드: ended → 전환
  useEffect(() => {
    if (!isRotation || videoSources.length === 0) return;
    const front = frontIsA ? videoARef.current : videoBRef.current;
    const back = frontIsA ? videoBRef.current : videoARef.current;
    if (!front || !back) return;

    const handleEnded = () => {
      front.pause(); // 성능: 페이드아웃 시 디코딩 중단
      back.currentTime = 0; // 처음부터 재생
      back.play().catch(() => {}); // back은 이미 로드됨 → 지금 재생 시작 (브라우저 단일재생 정책 회피)
      if (frontIsA) {
        setOpacityA(0);
        setOpacityB(1);
      } else {
        setOpacityB(0);
        setOpacityA(1);
      }
      setTimeout(() => {
        setCrossfadeSourceIndex((i) => (i + 1) % videoSources.length);
        setFrontIsA((f) => !f);
        // back 비디오 src는 useEffect 의존성 반영으로 자동 처리
      }, CROSSFADE_DURATION_MS);
    };

    front.addEventListener("ended", handleEnded);
    return () => front.removeEventListener("ended", handleEnded);
  }, [isRotation, videoSources, frontIsA, crossfadeSourceIndex]);

  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // 타이핑 중
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
          setTypingSpeed(100);
        } else {
          // 타이핑 완료 후 잠시 대기
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // 삭제 중
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
          setTypingSpeed(50);
        } else {
          // 삭제 완료 후 다음 텍스트로
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
          setTypingSpeed(300);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, typingTexts, typingSpeed]);

  // 방문 카운트 증가 및 조회 (초기 로딩 경쟁 완화: 지연 호출 + 폴링 간격 확대)
  useEffect(() => {
    const fetchCount = async (method: "GET" | "POST" = "GET") => {
      try {
        const response = await fetch("/api/visits", { method });
        if (response.ok) {
          const data = await response.json();
          setVisitCount(data.count);
        }
      } catch {
        if (method === "POST") {
          try {
            const res = await fetch("/api/visits");
            if (res.ok) {
              const data = await res.json();
              setVisitCount(data.count);
            }
          } catch {}
        }
      }
    };

    // 1.5초 지연 후 POST (초기 렌더링/LCP와 경쟁 완화)
    const delayId = setTimeout(() => fetchCount("POST"), 1500);

    // 15초마다 GET 폴링 (4초 → 15초)
    const intervalId = setInterval(() => fetchCount("GET"), 15000);

    return () => {
      clearTimeout(delayId);
      clearInterval(intervalId);
    };
  }, []);

  // 모바일: touchEnd에서 즉시 스크롤 (click 지연 우회)
  useEffect(() => {
    const el = scrollMoreRef.current;
    if (!el) return;
    const handler = (e: TouchEvent) => {
      e.preventDefault();
      scrollToSection("experience");
    };
    el.addEventListener("touchend", handler, { passive: false });
    return () => el.removeEventListener("touchend", handler);
  }, []);

  return (
    <section className="relative min-h-screen min-h-[100svh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-blue-50 dark:via-white dark:to-purple-50 overflow-hidden">
      {/* MP4 백그라운드 비디오 (무한 재생, 음소거) - public/video/hero/background.mp4 */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {isRotation ? (
          <>
            <div
              className="absolute inset-0 w-full h-full transition-opacity duration-[800ms] ease-in-out"
              style={{ opacity: videoPlaying ? opacityA : 0 }}
            >
              <video
                ref={videoARef}
                muted
                playsInline
                preload="auto"
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectFit: "cover" }}
                aria-hidden
              />
            </div>
            <div
              className="absolute inset-0 w-full h-full transition-opacity duration-[800ms] ease-in-out"
              style={{ opacity: videoPlaying ? opacityB : 0 }}
            >
              <video
                ref={videoBRef}
                muted
                playsInline
                preload="auto"
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectFit: "cover" }}
                aria-hidden
              />
            </div>
          </>
        ) : (
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-[800ms] ease-in-out"
            style={{ opacity: videoPlaying ? videoOpacity : 0 }}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectFit: "cover" }}
              aria-hidden
            >
              <source src={currentSrc} type="video/mp4" />
            </video>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 dark:bg-gradient-to-br dark:from-blue-950/40 dark:via-gray-900/30 dark:to-purple-950/40" aria-hidden />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-2xl overflow-hidden relative cursor-pointer"
            style={{ borderRadius: "50%" }}
            onClick={() => { captureScrollY(); window.dispatchEvent(new CustomEvent("openPersonalInfoModal")); }}
          >
            {personalInfo.profileImage && !profileImageError ? (
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                width={128}
                height={128}
                sizes="128px"
                priority
                unoptimized
                className="w-full h-full object-cover rounded-full"
                onError={() => setProfileImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
            )}
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 text-center flex flex-col items-center gap-2"
          variants={itemVariants}
        >
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                {currentText}
              </span>
              <span className="animate-blink-fast text-blue-700 relative -top-1">|</span>
            </div>
          <span className="text-gray-300 dark:text-gray-600 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] dark:[text-shadow:0_2px_12px_rgba(0,0,0,0.7)]">이런 분 찾고 있나요?</span>
        </motion.h1>

        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-10"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => { captureScrollY(); window.dispatchEvent(new CustomEvent("openPersonalInfoModal")); }}
            className="flex items-center justify-center gap-2 px-4 py-3 md:px-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full hover:from-teal-600 hover:to-cyan-600 transition-colors shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User size={20} />
            <span className="hidden md:inline">인적사항</span>
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("contact")}
            className="flex items-center justify-center gap-2 px-4 py-3 md:px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} />
            <span className="hidden md:inline">문의하기</span>
          </motion.button>
        </motion.div>

        {/* 방문 카운터 - 스크롤하여 더 보기 위에 표시 */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <VisitCounter 
            count={visitCount} 
            onClick={() => setIsVisitCounterModalOpen(true)}
          />
        </motion.div>

        <motion.div
          ref={scrollMoreRef}
          className="inline-flex flex-col items-center gap-2 cursor-pointer w-fit mx-auto"
          onClick={() => scrollToSection("experience")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-base md:text-lg text-gray-400 dark:text-gray-500 hover:text-gray-300 dark:hover:text-gray-600 transition-colors">
            스크롤하여 더 보기
          </span>
          <motion.div
            variants={scrollIndicatorVariants}
            animate="animate"
          >
            <ArrowDown size={24} className="text-gray-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 방문 카운터 모달 */}
      <VisitCounterModal
        isOpen={isVisitCounterModalOpen}
        onClose={() => setIsVisitCounterModalOpen(false)}
      />
    </section>
  );
}
