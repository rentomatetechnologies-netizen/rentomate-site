"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LOWEST_PRICE, PLANS, PLANS_PAGE_PATH, PURIFIERS, enrichmentSummary, type Purifier, type PurifierColour } from "@/lib/site";
import { useSiteActions } from "@/components/SiteShell";

const LOCK_IN = `${[...PLANS].map((plan) => plan.months).sort((a, b) => a - b).join("/")} Months Lock-In`;

// Card bullet points, built from the purifier's specs so they always match the home page carousel.
const featuresFor = (product: Purifier) =>
  [
    `${product.storageLitres} L storage tank`,
    `${product.stages.length}-stage purification`,
    enrichmentSummary(product),
    product.tdsAdjustment ? "TDS adjustment" : null,
  ].filter((feature): feature is string => Boolean(feature));

const ProductCard: React.FC<{ product: Purifier; index: number; onSubscribe: () => void }> = ({ product, index, onSubscribe }) => {
  const [colourId, setColourId] = useState<PurifierColour["id"]>(product.colours[0].id);
  const colour = product.colours.find((item) => item.id === colourId) ?? product.colours[0];

  return (
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

    {/* Photo panel (both colours crossfade) with the coloured feature strip underneath */}
    <div className="overflow-hidden rounded-[10px] bg-gradient-to-b from-slate-100 to-white">
      <div className="relative h-56">
        {product.colours.map((item) => (
          <Image
            key={item.id}
            src={item.image}
            alt={`${product.brand} ${product.name} in ${item.colour}`}
            aria-hidden={item.id !== colour.id || undefined}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
            className={`object-contain p-4 drop-shadow-xl transition duration-300 group-hover:scale-105 ${item.id === colour.id ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      <p className={`bg-gradient-to-r ${product.accent} px-3 py-1.5 text-center text-xs font-semibold text-white`}>{product.strip}</p>
    </div>

    <div className="mt-4 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-lg font-bold leading-snug text-[#051838]">{product.brand} {product.name}</h3>
        <p className="mt-0.5 text-sm text-[#0067c7]">{product.tagline}</p>
      </div>
      <div role="radiogroup" aria-label={`${product.shortName} colour`} className="mt-1 flex shrink-0 gap-1.5">
        {product.colours.map((item) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={item.id === colour.id}
            aria-label={item.colour}
            title={item.colour}
            onClick={() => setColourId(item.id)}
            className={`h-6 w-6 rounded-full ring-1 ring-slate-300 transition ${item.id === colour.id ? "ring-2 ring-sky-500 ring-offset-2" : "hover:scale-110"}`}
            style={{ background: item.swatch }}
          />
        ))}
      </div>
    </div>

    <ul className="mt-4 space-y-1.5">
      {featuresFor(product).map((feature) => (
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
};

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
          {PURIFIERS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onSubscribe={openLeadForm} />
          ))}
        </div>
      </div>
    </section>
  );
};
