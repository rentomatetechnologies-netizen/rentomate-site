import React from "react";
import { Atom, Droplets, FlaskConical, ShieldCheck, Waves, type LucideIcon } from "lucide-react";
import { KEY_SPECS } from "@/lib/site";

const icons: LucideIcon[] = [Droplets, Atom, FlaskConical, Waves, ShieldCheck];

// Product key specs, shown directly below the hero product display.
export const KeySpecs: React.FC = () => (
  <section aria-label="Key specifications" className="bg-white pb-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 rounded-[10px] bg-gradient-to-r from-sky-50 via-blue-50/70 to-cyan-50 px-5 py-6 sm:grid-cols-3 sm:px-8 lg:grid-cols-5">
        {KEY_SPECS.map((spec, index) => {
          const Icon = icons[index];
          return (
            <div key={spec.title} className="flex items-center gap-3">
              <Icon className="h-8 w-8 shrink-0 text-sky-600" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-extrabold leading-tight text-[#051838]">{spec.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-slate-500">{spec.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
