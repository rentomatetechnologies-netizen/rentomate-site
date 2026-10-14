import React from "react";
import { Atom, Droplets, FlaskConical, ShieldCheck, Waves, type LucideIcon } from "lucide-react";
import { KEY_SPECS } from "@/lib/site";

const icons: LucideIcon[] = [Droplets, Atom, FlaskConical, Waves, ShieldCheck];

// Four copies so each half of the marquee is wider than a large screen; the track scrolls by half (two copies) and loops seamlessly.
const COPIES = 4;

// Product key specs: a full-width black strip directly below the hero.
export const KeySpecs: React.FC = () => (
  <section aria-label="Key specifications" className="mb-10 overflow-hidden bg-[#0a0a0a] py-6">
    <div className="key-specs__track flex w-max">
      {Array.from({ length: COPIES }, (_, copy) => (
        <div key={copy} aria-hidden={copy > 0 || undefined} className="flex shrink-0 items-center gap-x-12 px-6 sm:px-8">
          {KEY_SPECS.map((spec, index) => {
            const Icon = icons[index];
            return (
              <div key={spec.title} className="flex min-w-[220px] items-center gap-3">
                <Icon className="h-8 w-8 shrink-0 text-sky-400" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-extrabold leading-tight text-white">{spec.title}</p>
                  <p className="mt-0.5 text-xs leading-snug text-slate-400">{spec.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  </section>
);
