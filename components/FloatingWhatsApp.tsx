"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = "https://wa.me/+919876543210?text=" + encodeURIComponent("Hi RentOMate! I want to enquire about renting a water purifier in Coimbatore.");

  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RentOMate on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-500/40 font-bold text-xs sm:text-sm group"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 fill-white text-white" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
      </div>
      <span className="hidden sm:inline">WhatsApp Us</span>
    </motion.a>
  );
};
