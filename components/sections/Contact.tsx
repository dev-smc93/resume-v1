"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { personalInfo } from "@/data/resume-data";

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

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
        transition={{ duration: 0.6 }}
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
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-600 mb-1">
                {item.label}
              </h3>
              <p className="text-base md:text-lg font-bold text-gray-100 dark:text-gray-800 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
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
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-100 dark:text-gray-800 flex items-center gap-2">
          <Send className="text-blue-400 dark:text-blue-600" size={28} />
          메시지 보내기
        </h3>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="이름"
              className="w-full px-4 py-3 rounded-lg border border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="이메일"
              className="w-full px-4 py-3 rounded-lg border border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              placeholder="메시지"
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            전송하기
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
