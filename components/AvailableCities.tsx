"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { CITIES, SERVICE_LOCATIONS } from "@/lib/site";
import { whatsappLink } from "@/lib/contact";
import { useSiteActions } from "@/components/SiteShell";

// "Where We Serve": the cities from the header location picker, on a white band.
// The first city is featured with its service areas; the rest are listed beside it.
export const AvailableCities: React.FC = () => {
  const { openAvailability: onCheckAvailability } = useSiteActions();
  const [featured, ...otherCities] = SERVICE_LOCATIONS;
  const featuredAreas = CITIES.find((city) => city.name === featured)?.areas ?? [];

  return (
    <section id="cities" className="relative overflow-hidden bg-white py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.10),transparent_40%)]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-[10px] bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 ring-1 ring-sky-200">
            <MapPin className="h-3.5 w-3.5" /> Available Cities
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Where We <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Serve</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Rent O&apos; Mate purifiers are available in {SERVICE_LOCATIONS.length} cities across Tamil Nadu and Puducherry.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Featured city with its service areas */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-white p-6 shadow-sm sm:p-7 lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900">
                <MapPin className="h-6 w-6 text-sky-500" /> {featured}
              </h3>
              <span className="inline-flex items-center gap-1 rounded-[10px] bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5" /> Live
              </span>
            </div>
            {featuredAreas.length > 0 && (
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{featuredAreas.slice(0, 10).join(" · ")} and more.</p>
            )}
            <button
              type="button"
              onClick={onCheckAvailability}
              className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-110"
            >
              Check My Area <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Every other city */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="grid grid-cols-2 content-start gap-3 sm:grid-cols-3 lg:col-span-7"
          >
            {otherCities.map((city) => (
              <li
                key={city}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
              >
                <MapPin className="h-4 w-4 shrink-0 text-sky-500" />
                {city}
              </li>
            ))}
          </motion.ul>
        </div>

        <CityRequest />
      </div>
    </section>
  );
};

type CityRequestData = { city: string; pincode: string };

const CITY_REQUEST_KEY = "rentomate_city_request";

const inputClass =
  "w-full rounded-[10px] border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30";

// "Don't see your city?": collects city + pincode, hands them to the team on WhatsApp,
// then shows a reply once the visitor comes back to the site (and on later visits).
const subscribeToStorage = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

const readSavedRequest = () => {
  try {
    return window.localStorage.getItem(CITY_REQUEST_KEY);
  } catch {
    return null; // Storage blocked – start from the button.
  }
};

const CityRequest: React.FC = () => {
  const [step, setStep] = React.useState<"idle" | "form" | "waiting" | "done">("idle");
  const [form, setForm] = React.useState<CityRequestData>({ city: "", pincode: "" });
  const [error, setError] = React.useState("");

  // A request from an earlier visit goes straight to the reply.
  const savedRaw = React.useSyncExternalStore(subscribeToStorage, readSavedRequest, () => null);
  const saved = React.useMemo(() => {
    try {
      return savedRaw ? (JSON.parse(savedRaw) as CityRequestData) : null;
    } catch {
      return null;
    }
  }, [savedRaw]);
  const showReply = step === "done" || (step === "idle" && saved !== null);
  const replyCity = step === "done" ? form.city : saved?.city;

  // Show the reply when the visitor returns from WhatsApp.
  React.useEffect(() => {
    if (step !== "waiting") return;
    const onReturn = () => document.visibilityState === "visible" && setStep("done");
    document.addEventListener("visibilitychange", onReturn);
    window.addEventListener("focus", onReturn);
    return () => {
      document.removeEventListener("visibilitychange", onReturn);
      window.removeEventListener("focus", onReturn);
    };
  }, [step]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const request = { city: form.city.trim(), pincode: form.pincode.trim() };
    if (request.city.length < 2) return setError("Please enter your city.");
    if (!/^\d{6}$/.test(request.pincode)) return setError("Please enter a valid 6-digit pincode.");

    setError("");
    setForm(request);
    try {
      window.localStorage.setItem(CITY_REQUEST_KEY, JSON.stringify(request));
    } catch {
      // Storage blocked – the reply still shows for this visit.
    }
    const message = ["Hi Rent O' Mate! Please let me know when you start in my city.", `City: ${request.city}`, `Pincode: ${request.pincode}`].join("\n");
    const opened = window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    // If WhatsApp couldn't open in a new tab there's nothing to come back from, so reply straight away.
    setStep(opened ? "waiting" : "done");
  };

  const reset = () => {
    try {
      window.localStorage.removeItem(CITY_REQUEST_KEY);
    } catch {}
    setForm({ city: "", pincode: "" });
    setStep("form");
  };

  return (
    <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 sm:p-6">
      {showReply ? (
        <div className="space-y-3 text-sm leading-relaxed text-slate-600">
          <p>
            Currently, we are not serving <strong className="text-slate-900">{replyCity}</strong>, but it is definitely on our expansion wishlist. We&apos;ll keep
            you informed as soon as our services become available in your area.
          </p>
          <p>Thank you for your interest and patience!</p>
          <p>
            Warm regards,
            <br />
            <span className="font-bold text-slate-900">Team Rent O&apos; Mate</span>
          </p>
          <button type="button" onClick={reset} className="text-xs font-semibold text-sky-600 underline-offset-2 hover:underline">
            Request another city
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Don&apos;t see your city?</h3>
              <p className="mt-1 text-sm text-slate-600">Tell us where you are and we&apos;ll let you know as soon as Rent O&apos; Mate reaches you.</p>
            </div>
            {step === "idle" && (
              <button
                type="button"
                onClick={() => setStep("form")}
                className="inline-flex shrink-0 items-center gap-2 rounded-[10px] border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:border-sky-400 hover:bg-sky-50"
              >
                Request My City <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {step === "form" && (
            <form onSubmit={handleSubmit} noValidate className="mt-5 grid gap-3 sm:grid-cols-[1fr_180px_auto]">
              <input className={inputClass} placeholder="Your city *" aria-label="City" autoComplete="address-level2" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <input
                className={inputClass}
                placeholder="Pincode *"
                aria-label="Pincode"
                inputMode="numeric"
                maxLength={6}
                autoComplete="postal-code"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-110"
              >
                Send on WhatsApp <ArrowRight className="h-4 w-4" />
              </button>
              {error && <p role="alert" className="text-sm font-semibold text-red-600 sm:col-span-3">{error}</p>}
            </form>
          )}

          {step === "waiting" && <p className="mt-4 text-sm text-sky-700">Opening WhatsApp… send the message, then come back here.</p>}
        </>
      )}
    </div>
  );
};
