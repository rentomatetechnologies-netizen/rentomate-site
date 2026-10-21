"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { LOWEST_PRICE, PLANS, PLANS_PAGE_PATH, PRODUCTS, type CatalogProduct } from "@/lib/site";
import { useSiteActions } from "@/components/SiteShell";

const LOCK_IN = `${[...PLANS].map((plan) => plan.months).sort((a, b) => a - b).join("/")} Months Lock-In`;

const ProductCard: React.FC<{ product: CatalogProduct; index: number; onSubscribe: () => void }> = ({ product, index, onSubscribe }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06 }}
    className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgb(15_23_42/0.10)]"
  >
    {product.badge && (
      <span className="absolute right-4 top-4 z-10 rounded-bl-[10px] rounded-tr-[10px] bg-emerald-700 px-3 py-1 text-[11px] font-bold text-white">{product.badge}</span>
    )}

    {/* Photo panel with the coloured feature strip underneath */}
    <div className="overflow-hidden rounded-[10px] bg-gradient-to-b from-slate-100 to-white">
      <div className="relative h-56">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
            className="object-contain p-4 drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sky-300">
            <Droplets className="h-12 w-12" aria-hidden />
            <span className="text-xs font-semibold text-slate-400">Photo coming soon</span>
          </div>
        )}
      </div>
      <p className={`bg-gradient-to-r ${product.accent} px-3 py-1.5 text-center text-xs font-semibold text-white`}>{product.strip}</p>
    </div>

    <h3 className="mt-4 text-lg font-bold leading-snug text-[#051838]">{product.name}</h3>
    <p className="mt-0.5 text-sm text-[#0067c7]">{product.tagline}</p>

    <ul className="mt-4 space-y-1.5">
      {product.features.map((feature) => (
        <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0084FF]" aria-hidden /> {feature}
        </li>
      ))}
    </ul>

    <div className="mt-auto pt-5">
      <div className="flex items-baseline justify-between gap-2 border-t border-dashed border-slate-200 pt-4">
        <p className="text-xl font-extrabold text-[#0067c7]">
          ₹{LOWEST_PRICE}
          <span className="text-sm font-bold">/mo</span>
        </p>
        <p className="text-xs text-slate-500">{LOCK_IN}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link
          href={PLANS_PAGE_PATH}
          className="inline-flex items-center justify-center rounded-full border border-[#0084FF] px-4 py-2.5 text-sm font-semibold text-[#0067c7] transition hover:bg-sky-50"
        >
          Know more
        </Link>
        <button
          type="button"
          onClick={onSubscribe}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-sky-500/20 transition hover:brightness-110"
        >
          Subscribe
        </button>
      </div>
    </div>
  </motion.article>
);

/** "Find the purifier that's right for you": the full purifier range as rental cards. */
export const ProductCatalog: React.FC = () => {
  const { openLeadForm } = useSiteActions();

  return (
    <section id="purifiers" className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#051838] sm:text-4xl">
            Find the Purifier that is <span className="text-[#0084FF]">Right for You</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Every purifier comes with free installation, lifetime maintenance and filter changes.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onSubscribe={openLeadForm} />
          ))}
        </div>
      </div>
    </section>
  );
};
