"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Building2, Armchair, Users2 } from "lucide-react";

interface ModernLivingProps {
  images?: {
    homes?: string;
    apartments?: string;
    tenants?: string;
    pg?: string;
  };
}

export const ModernLiving: React.FC<ModernLivingProps> = ({ images }) => {
  const categories = [
    {
      title: "Homes",
      desc: "Everyday purified water without ownership headaches.",
      icon: Home,
      image: images?.homes || "/images/living-homes.svg",
    },
    {
      title: "Apartments",
      desc: "A practical, plug-and-play rental option for modern residential living.",
      icon: Building2,
      image: images?.apartments || "/images/living-apartments.svg",
    },
    {
      title: "Tenants",
      desc: "Move without worrying about selling or transporting a heavy purifier.",
      icon: Armchair,
      image: images?.tenants || "/images/living-tenants.svg",
    },
    {
      title: "PG / Shared Homes",
      desc: "Flexible, hygienic water access for roommates and shared spaces.",
      icon: Users2,
      image: images?.pg || "/images/living-pg.svg",
    },
  ];

  return (
    <section className="py-24 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3"
          >
            Ideal for Every Lifestyle
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Made for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              Modern Living
            </span>
          </motion.h2>
        </div>

        {/* 4 Lifestyle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  
                  {/* Floating Icon Pill */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-sky-600 shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
