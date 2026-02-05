"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/resume-data";
import { useState, useEffect, useRef, useMemo } from "react";
import ImageModal from "@/components/ui/ImageModal";
import { useSectionInView } from "@/hooks/useSectionInView";
import { handleImageError } from "@/utils/image";

export default function Certifications() {
  const [ref, inView] = useSectionInView();

  const [offset, setOffset] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const speed = 0.06; // 이동 속도 (더 느리게)

  // 무한 루프를 위한 충분히 복제된 배열 (메모이제이션)
  const duplicatedCerts = useMemo(
    () => [
      ...certifications,
      ...certifications,
      ...certifications,
      ...certifications,
      ...certifications,
    ],
    [certifications]
  );

  // 반응형으로 화면 크기에 따라 보여줄 항목 수 조정
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerView(2); // 모바일: 2개
      } else if (width < 1024) {
        setItemsPerView(3); // 태블릿: 3개
      } else if (width < 1280) {
        setItemsPerView(4); // 중간 데스크톱: 4개
      } else {
        setItemsPerView(5); // 큰 데스크톱: 5개
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // 각 항목의 너비 계산 - CSS calc 사용
  const gapSize = 16; // gap-4 = 1rem = 16px
  const itemWidthPercent = 100 / itemsPerView;
  // 한 세트(원본 배열 길이)의 총 너비
  const singleSetWidth = certifications.length * itemWidthPercent;

  // 연속적으로 좌에서 우로 이동
  useEffect(() => {
    if (!inView || certifications.length === 0 || isHovered) return;

    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      setOffset((prev) => {
        const newOffset = prev + (speed * deltaTime) / 16; // 60fps 기준으로 정규화
        
        // 리셋 포인트에 도달하면 처음으로 돌아가기 (끊김 없이)
        if (newOffset >= singleSetWidth) {
          return newOffset - singleSetWidth;
        }
        
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
  }, [inView, certifications.length, singleSetWidth, itemsPerView, isHovered]);

  if (certifications.length === 0) return null;

  return (
    <div ref={ref} className="w-full overflow-hidden flex items-center min-h-[60vh]">
      <div 
        className="relative flex justify-center w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.ul
          className="flex gap-4 list-none p-0 m-0 items-center"
          animate={{
            x: `calc(50vw - ${offset}vw - ${(100 / itemsPerView) / 2}vw)`,
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
              <div className="bg-gray-800 dark:bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center h-full w-full">
                <div 
                  className="w-full h-48 md:h-56 lg:h-64 xl:h-72 mb-3 rounded-lg overflow-hidden bg-gray-700 dark:bg-gray-100 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage({
                    src: cert.image,
                    alt: cert.name,
                    title: cert.name,
                  })}
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-contain"
                    onError={handleImageError}
                  />
                </div>
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-100 dark:text-gray-800 mb-1">
                      {cert.name}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-600">
                      {cert.acquiredDate}
                    </p>
                  </div>
                  <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-gray-700 dark:bg-gray-100 text-gray-300 dark:text-gray-700">
                    {cert.type === "certification" ? "📜 자격증" : "🏆 수상"}
                  </span>
                </div>
              </div>
            </li>
            ))}
        </motion.ul>
      </div>
      
      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          title={selectedImage.title}
        />
      )}
    </div>
  );
}
