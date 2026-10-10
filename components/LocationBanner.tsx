"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

interface LocationBannerProps {
  onCheckAvailability?: () => void;
  skylineImageSrc?: string;
}

export const LocationBanner: React.FC<LocationBannerProps> = ({
  onCheckAvailability,
  skylineImageSrc = "/images/coimbatore-skyline.svg",
}) => {
  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden border-y border-slate-200/70">
      
      {/* Background Skyline Silhouette */}
      <div className="absolute inset-x-0 bottom-0 h-40 opacity-40 pointer-events-none flex justify-center">
        <Image
          src={skylineImageSrc}
          alt="Coimbatore skyline illustration"
          width={1200}
          height={160}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Title & Copy */}
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Local and Trusted</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Water Purifier Rental <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
                in Coimbatore
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              RentOMate provides Akvinz water purifier rental plans for homes, apartments, tenants, and shared living spaces across Coimbatore. Choose a 12-month or 24-month plan and check availability for your location.
            </p>
          </div>

          {/* Right Action Button */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0"
          >
            <button
              onClick={onCheckAvailability}
              className="px-6 py-4 rounded bg-white border-2 border-sky-500 hover:border-sky-600 text-sky-700 hover:text-sky-800 font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded bg-sky-100 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <span>Check Availability</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
