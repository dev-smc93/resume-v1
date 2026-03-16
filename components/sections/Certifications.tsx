"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { certifications } from "@/data/resume-data";
import { useState, useEffect, useRef, useMemo } from "react";
import ImageModal from "@/components/ui/ImageModal";
import { useSectionInView } from "@/hooks/useSectionInView";
import { handleImageError } from "@/utils/image";
import { flushSync } from "react-dom";
import { applyScrollLockImmediate } from "@/utils/personalInfoModalScroll";
import { setLockedScrollYSync } from "@/utils/scrollLockSync";
import { useScrollLock } from "@/contexts/ScrollLockContext";

export default function Certifications() {
  const { setLockedScrollY } = useScrollLock();
  const [inViewRef, inView] = useSectionInView();
  const sectionElRef = useRef<HTMLDivElement | null>(null);

  const [offset, setOffset] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverDirection, setHoverDirection] = useState<"<<" | "<" | "?" | ">" | ">>">("?"); // ??? ?? ???
  const [isMobile, setIsMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0); // ??????????? ???????(vw)
  const [isSwiping, setIsSwiping] = useState(false); // ??????????? ??
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);
  const savedScrollYRef = useRef<number | undefined>(undefined);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const speed = 0.04; // ??? ??? ???
  const hoverSpeedMultiplier = 2.4; // ??? ???????? ??? ?? (??????
  const hoverSpeedRef = useRef<number>(0); // -1 ~ 1, ??? ??????X????? ??? ??
  const isHoveredRef = useRef<boolean>(false);
  const modalOpenRef = useRef<boolean>(false);
  const offsetRef = useRef<number>(0);
  const touchStartClientX = useRef<number>(0);
  const touchStartOffsetRef = useRef<number>(0);
  const dragOffsetRef = useRef<number>(0);
  const hasMovedEnough = useRef(false);
  const dragOccurredRef = useRef(false);
  const swipeEndHandled = useRef(false);
  const mobileSwipeRef = useRef(false); // ??????? ???????? ?????????

  const slideHintText = "??? ???? ??? ????";
  const pixelToVw = (px: number) => (px / (typeof window !== "undefined" ? window.innerWidth : 1920)) * 100;
  const normalizeOffset = (o: number, setWidth: number) => ((o % setWidth) + setWidth) % setWidth;

  const getHoverDirection = (ratio: number): "<<" | "<" | "?" | ">" | ">>" => {
    if (ratio < 0.2) return "<<";
    if (ratio < 0.35) return "<";
    if (ratio <= 0.65) return "?";
    if (ratio <= 0.8) return ">";
    return ">>";
  };

  const hoverDirectionRef = useRef<"<<" | "<" | "?" | ">" | ">>">("?");

  const updateHoverFromClientX = (clientX: number) => {
    const el = sectionElRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = (clientX - rect.left) / rect.width;
    hoverSpeedRef.current = Math.max(-1, Math.min(1, (0.5 - ratio) * 2));
    const nextDir = getHoverDirection(ratio);
    if (hoverDirectionRef.current !== nextDir) {
      hoverDirectionRef.current = nextDir;
      setHoverDirection(nextDir);
    }
  };

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    modalOpenRef.current = !!selectedImage;
  }, [selectedImage]);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  // ?? ??????? ?????????? (????????)
  const duplicatedCerts = useMemo(() => [...certifications, ...certifications, ...certifications, ...certifications, ...certifications], [certifications]);

  // ?????????? ???????? ???????? ????
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // ???????
      if (width < 768) {
        setItemsPerView(2); // ???? 2??
      } else if (width < 1024) {
        setItemsPerView(3); // ????? 3??
      } else if (width < 1280) {
        setItemsPerView(4); // ?? ??????: 4??
      } else {
        setItemsPerView(5); // ????????: 5??
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // ??????????? ?? - CSS calc ???
  const gapSize = 16; // gap-4 = 1rem = 16px
  const itemWidthPercent = 100 / itemsPerView;
  // ?????(??? ?? ??)???????
  const singleSetWidth = certifications.length * itemWidthPercent;

  // ??????????? ??document ??? ????
  useEffect(() => {
    if (!isSwiping) return;

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length) {
        const delta = e.touches[0].clientX - touchStartClientX.current;
        if (Math.abs(delta) > 5) hasMovedEnough.current = true;
        const vw = pixelToVw(delta);
        dragOffsetRef.current = vw;
        setDragOffset(vw);
        e.preventDefault();
      }
    };

    const onEnd = () => {
      if (swipeEndHandled.current) return;
      swipeEndHandled.current = true;
      const startOffset = touchStartOffsetRef.current;
      const currentDragVw = dragOffsetRef.current;
      setOffset(() => normalizeOffset(startOffset - currentDragVw, singleSetWidth));
      setDragOffset(0);
      dragOffsetRef.current = 0;
      setIsSwiping(false);
      mobileSwipeRef.current = false;
      dragOccurredRef.current = hasMovedEnough.current;
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onEnd);
    document.addEventListener("touchcancel", onEnd);

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", onEnd);
    };
  }, [isSwiping, singleSetWidth]);

  // ??? ??????: ???????? ???, ??? ??????X ???????? ??????? ?????? (??????????? ?????????)
  useEffect(() => {
    if (!inView || certifications.length === 0) return;

    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (mobileSwipeRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const useHoverSpeed = isHoveredRef.current && !modalOpenRef.current;
      const speedMultiplier = useHoverSpeed ? hoverSpeedRef.current * hoverSpeedMultiplier : 1;
      const effectiveSpeed = speed * speedMultiplier;

      setOffset((prev) => {
        const newOffset = prev + (effectiveSpeed * deltaTime) / 16;

        if (newOffset >= singleSetWidth) return newOffset - singleSetWidth;
        if (newOffset < 0) return newOffset + singleSetWidth;

        return newOffset;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      lastTimeRef.current = 0;
    };
  }, [inView, certifications.length, singleSetWidth, itemsPerView]);

  if (certifications.length === 0) return null;

  return (
    <div
      ref={(node) => {
        sectionElRef.current = node;
        (inViewRef as (n: HTMLDivElement | null) => void)(node);
      }}
      className="w-full overflow-hidden flex flex-col items-center min-h-[60vh] min-h-[60svh] relative"
      onMouseEnter={(e) => {
        if (!isMobile) {
          setIsHovered(true);
          updateHoverFromClientX(e.clientX);
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          setIsHovered(false);
          hoverDirectionRef.current = "?";
          setHoverDirection("?");
          hoverSpeedRef.current = 0;
        }
      }}
      onMouseMove={(e) => {
        if (!isMobile) updateHoverFromClientX(e.clientX);
      }}
      onTouchStart={() => setIsHovered(false)}
    >
      {/* ??? ????? (???????, ???????? ?? ???) */}
      {isHovered && !isMobile && (
        <motion.div
          className="absolute top-4 z-10 px-4 py-2 bg-blue-500/70 dark:bg-blue-600/70 text-white text-sm font-medium rounded-lg shadow-lg backdrop-blur-sm pointer-events-none flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: [0.7, 1, 0.7],
            y: 0,
          }}
          transition={{
            opacity: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: 0.3,
            },
          }}
        >
          {hoverDirection === "<<" || hoverDirection === "<" ? (
            <>
              <span className="opacity-90">{hoverDirection}</span>
              <span>좌우로 마우스를 움직여 슬라이드</span>
            </>
          ) : hoverDirection === ">>" || hoverDirection === ">" ? (
            <>
              <span>좌우로 마우스를 움직여 슬라이드</span>
              <span className="opacity-90">{hoverDirection}</span>
            </>
          ) : (
            "좌우로 마우스를 움직여 슬라이드"
          )}
        </motion.div>
      )}

      <div className="relative flex justify-center w-full flex-1 py-6 px-4 md:py-0 md:px-0">
        <div
          className="flex-1 min-h-0 flex justify-center overflow-hidden"
          onTouchStart={(e) => {
            if (isMobile && e.touches.length) {
              swipeEndHandled.current = false;
              touchStartClientX.current = e.touches[0].clientX;
              touchStartOffsetRef.current = offsetRef.current;
              hasMovedEnough.current = false;
              dragOccurredRef.current = false;
              mobileSwipeRef.current = true;
              setIsSwiping(true);
            }
          }}
        >
          <motion.ul
            className="flex gap-4 list-none p-0 m-0 items-center"
            animate={{
              x: `calc(50vw - ${offset - dragOffset}vw - ${100 / itemsPerView / 2}vw)`,
            }}
            transition={{
              duration: 0,
            }}
            style={{
              width: "max-content",
            }}
          >
            {duplicatedCerts.map((cert, index) => (
              <li
                key={`${cert.id}-${index}`}
                className="flex-shrink-0"
                style={{
                  width: `calc((100vw - ${gapSize * (itemsPerView - 1)}px) / ${itemsPerView})`,
                  maxWidth: `calc((100vw - ${gapSize * (itemsPerView - 1)}px) / ${itemsPerView})`,
                  minWidth: 0,
                }}
              >
                <div
                  className="bg-gray-800 dark:bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center h-full w-full"
                  onTouchStart={(e) => {
                    if (isMobile) e.stopPropagation();
                  }}
                >
                  <div
                    className="w-full h-48 md:h-56 lg:h-64 xl:h-72 mb-3 rounded-lg overflow-hidden bg-gray-700 dark:bg-gray-100 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      if (dragOccurredRef.current) {
                        dragOccurredRef.current = false;
                        return;
                      }
                      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
                      savedScrollYRef.current = scrollY;
                      applyScrollLockImmediate(scrollY);
                      setLockedScrollYSync(scrollY);
                      flushSync(() => setLockedScrollY(scrollY));
                      setSelectedImage({
                        src: cert.image,
                        alt: cert.name,
                        title: cert.name,
                      });
                      if (isMobile) setIsHovered(false);
                    }}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      width={200}
                      height={200}
                      sizes="(max-width: 768px) 50vw, 200px"
                      className="w-full h-full object-contain"
                      onError={(e) => handleImageError(e as React.SyntheticEvent<HTMLImageElement, Event>)}
                    />
                  </div>
                  <div className="text-center flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-100 dark:text-gray-800 mb-1">{cert.name}</p>
                      <p className="text-sm text-gray-400 dark:text-gray-600">{cert.acquiredDate}</p>
                    </div>
                    <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-gray-700 dark:bg-gray-100 text-gray-300 dark:text-gray-700">
                      {cert.type === "certification" ? "📜 자격증" : cert.type === "award" ? "🏆 수상" : "📋 위촉"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          title={selectedImage.title}
          savedScrollY={savedScrollYRef.current}
        />
      )}
    </div>
  );
}
