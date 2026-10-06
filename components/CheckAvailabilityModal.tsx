"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, CheckCircle2, Search, ArrowRight, MessageCircle } from "lucide-react";

interface CheckAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckAvailabilityModal: React.FC<CheckAvailabilityModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const coimbatoreAreas = [
    "RS Puram",
    "Gandhipuram",
    "Peelamedu",
    "Saravanampatti",
    "Saibaba Colony",
    "Singanallur",
    "Ramanathapuram",
    "Vadavalli",
    "Kovaipudur",
    "Thudiyalur",
    "Hopes College",
    "Ganapathy",
    "Kalapatti",
    "Sundarapuram",
    "Ukkadam",
    "Race Course",
    "Town Hall",
    "Podanur",
    "Kuniyamuthur",
    "Perur",
    "Chitra / Airport Area",
  ];

  const filtered = coimbatoreAreas.filter((area) =>
    area.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const getWhatsAppBooking = (area: string) => {
    const msg = encodeURIComponent(`Hi RentOMate! I am located in ${area}, Coimbatore and want to get a water purifier installed on rent.`);
    return `https://wa.me/+919876543210?text=${msg}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-slate-100 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Coimbatore Delivery Checker
                </h3>
                <p className="text-xs text-slate-500">
                  Same-day or next-day doorstep installation available
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Type your area (e.g., RS Puram, Saravanampatti)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>

            {/* Area Chips */}
            <div className="max-h-52 overflow-y-auto pr-1 space-y-1.5 mb-6">
              {filtered.length > 0 ? (
                filtered.map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      selectedArea === area
                        ? "bg-sky-50 text-sky-700 border border-sky-300"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-sky-500" />
                      {area}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Free Installation
                    </span>
                  </button>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-500">
                  Don't see your specific neighborhood? We cover all Coimbatore Corporation & Suburban limits!
                </div>
              )}
            </div>

            {/* Confirm & WhatsApp Action */}
            {selectedArea ? (
              <a
                href={getWhatsAppBooking(selectedArea)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/25 active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Book Instant Installation in {selectedArea}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <a
                href={getWhatsAppBooking(searchTerm || "Coimbatore")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Enquire Delivery via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
