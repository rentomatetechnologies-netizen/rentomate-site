"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import isiLogo from "@/assets/images/badges/isi.png";
import { getSavedLead, submitLead, type Lead, type SavedLead } from "@/lib/lead";
import { LOWEST_PRICE } from "@/lib/site";

const empty: Lead = { name: "", phone: "", pincode: "", referralCode: "" };

const inputClass =
  "w-full rounded-[10px] border border-white/80 bg-white/55 px-4 py-3 shadow-[inset_0_1px_2px_rgb(15_23_42/0.06)] backdrop-blur-md text-sm text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500";

/**
 * Opening popup that captures name, phone, pincode and referral code.
 * It shows on every page load until the visitor has submitted once on this device.
 */
export const LeadCaptureModal: React.FC<{ isOpen: boolean; onOpen: () => void; onClose: () => void }> = ({ isOpen, onOpen, onClose }) => {
  const [form, setForm] = useState<Lead>(empty);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<SavedLead | null>(null);

  useEffect(() => {
    if (getSavedLead()) return;
    const timer = window.setTimeout(onOpen, 900);
    return () => window.clearTimeout(timer);
  }, [onOpen]);

  const update = (field: keyof Lead) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const phone = form.phone.replace(/\D/g, "").slice(-10);
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[6-9]\d{9}$/.test(phone)) return setError("Please enter a valid 10-digit mobile number.");
    if (!/^\d{6}$/.test(form.pincode.trim())) return setError("Please enter a valid 6-digit pincode.");

    setError("");
    setSubmitting(true);
    try {
      setDone(await submitLead({ ...form, name: form.name.trim(), phone, pincode: form.pincode.trim(), referralCode: form.referralCode.trim() }));
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px]" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[10px] border border-white/80 bg-gradient-to-br from-white/75 via-white/75 to-sky-50/75 shadow-[0_30px_70px_-15px_rgb(15_23_42/0.45),inset_0_1px_1px_rgb(255_255_255/0.95),inset_0_0_0_1px_rgb(255_255_255/0.35)] backdrop-blur-2xl backdrop-saturate-[1.8]"
          >
            {/* Glass sheen */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgb(255_255_255/0.55)_0%,rgb(255_255_255/0)_38%,rgb(255_255_255/0)_62%,rgb(255_255_255/0.25)_100%)]" />

            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 rounded-[10px] p-2 text-slate-500 transition-colors hover:bg-white/60 hover:text-slate-800">
              <X className="h-5 w-5" />
            </button>

            {/* Header banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-sky-100/75 to-blue-100/75 px-6 pb-5 pt-14 sm:px-8 sm:pt-7">
              <Image src="/images/brand/rentomate-wordmark.png" alt="Rent O' Mate" width={3967} height={788} className="absolute right-14 top-5 h-6 w-auto" />
              <div className="sm:max-w-[62%]">
                <h2 id="lead-title" className="text-2xl font-extrabold leading-tight tracking-tight text-[#051838] sm:text-[1.7rem]">
                  Own Less. <span className="text-[#0084FF]">Live Smart.</span>
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-700">We will take care of everything else.</p>
                <ul className="mt-3 space-y-1 text-xs font-medium text-slate-700 sm:text-sm">
                  <li>• Zero machine and installation costs


                  </li>
                  <li>• Lifetime free maintenance </li>
                  <li>• Filter Replacement at No Cost </li>
                  <li>• 7-day risk-free trial</li>
                  {/* <li>• Plans start at ₹449/month</li> */}
                </ul>
                <p className="mt-3 inline-block rounded-full bg-[#0070F3] px-4 py-1 text-sm font-bold text-white">
                  Plans start @₹{LOWEST_PRICE}/month
                </p>
                <div className="mt-4 flex w-fit flex-col items-center">
                  <span className="text-[10px] font-semibold text-slate-500">Our Products are</span>
                  <Image src={isiLogo} alt="ISI mark" className="mt-1 h-11 w-auto mix-blend-multiply" />
                  <span className="text-sm font-semibold text-[#051838]">Certified</span>
                </div>
              </div>
              <Image src="/images/products/ultron-midnight-black.png" alt="" width={220} height={220} className="pointer-events-none absolute -bottom-2 right-6 hidden h-48 w-auto drop-shadow-xl sm:block" />
            </div>

            {done ? (
              <div className="relative px-6 py-8 text-center sm:px-8">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                <h3 className="mt-3 text-xl font-extrabold text-slate-900">Thanks, {done.name.split(" ")[0]}!</h3>
                <p className="mt-1 text-sm text-slate-600">Our team will call you back shortly.</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Your customer code</p>
                <p className="mt-1 inline-block rounded-[10px] border border-dashed border-sky-400 bg-sky-50 px-4 py-2 font-mono text-lg font-bold tracking-wider text-sky-800">{done.customerCode}</p>
                <button type="button" onClick={onClose} className="mt-6 block w-full rounded-full bg-gradient-to-r from-sky-600 to-blue-600 py-3 text-sm font-bold text-white">
                  Continue to website
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative px-6 py-6 sm:px-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input className={inputClass} placeholder="Your name *" autoComplete="name" value={form.name} onChange={update("name")} />
                  <input className={inputClass} placeholder="Mobile number *" type="tel" inputMode="numeric" autoComplete="tel" value={form.phone} onChange={update("phone")} />
                  <input className={inputClass} placeholder="Pincode *" inputMode="numeric" maxLength={6} autoComplete="postal-code" value={form.pincode} onChange={update("pincode")} />
                  <input className={inputClass} placeholder="Referral code (optional)" value={form.referralCode} onChange={update("referralCode")} />
                </div>
                {error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}
                <button type="submit" disabled={submitting} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-700 hover:to-blue-700 disabled:opacity-70">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />} Get a call back
                </button>
                <p className="mt-3 text-center text-[11px] text-slate-500">Submit your enquiry, and the Rent O&apos; Mate team will get in touch with you.</p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
