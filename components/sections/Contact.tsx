"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { personalInfo } from "@/data/resume-data";
import { useSectionInView } from "@/hooks/useSectionInView";
import { ANIMATION_DURATION } from "@/constants/animations";

export default function Contact() {
  const [ref, inView] = useSectionInView();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 입력 시 상태 메시지 초기화
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "전송에 실패했습니다.");
      }

      // 성공
      setSubmitStatus({
        type: "success",
        message: "메시지가 성공적으로 전송되었습니다!",
      });
      setFormData({ name: "", email: "", message: "" });

      // 5초 후 상태 메시지 자동 제거
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "전송에 실패했습니다.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: "이메일",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      label: "전화",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: MapPin,
      label: "위치",
      value: personalInfo.location,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`,
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div ref={ref} className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-blue-50 dark:to-purple-50 rounded-2xl p-8 md:p-12">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: ANIMATION_DURATION.NORMAL }}
      >
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.label === "위치" ? "_blank" : undefined}
              rel={item.label === "위치" ? "noopener noreferrer" : undefined}
              className="bg-gray-800 dark:bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-600 mb-1">
                {item.label}
              </h3>
              <p className="text-base md:text-lg font-bold text-gray-100 dark:text-gray-800 break-words">
                {item.value}
              </p>
            </motion.a>
          );
        })}
      </motion.div>

      <motion.div
        className="bg-gray-800 dark:bg-white rounded-lg p-8 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-100 dark:text-gray-800 flex items-center gap-2">
          <Send className="text-blue-400 dark:text-blue-600" size={28} />
          메시지 보내기
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="메시지"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          
          <AnimatePresence>
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-500/20 text-green-400 dark:text-green-600"
                    : "bg-red-500/20 text-red-400 dark:text-red-600"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle size={20} />
                ) : (
                  <XCircle size={20} />
                )}
                <span className="text-sm font-medium">{submitStatus.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>전송 중...</span>
              </>
            ) : (
              "전송하기"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
