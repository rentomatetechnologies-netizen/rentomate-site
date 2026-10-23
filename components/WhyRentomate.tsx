"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Calculator,
  Check,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Landmark,
  Minus,
  PackageOpen,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { PLANS, PRICE_PER_DAY, inr, type Plan } from "@/lib/site";

type Comparison = "cans" | "buy" | "traditional";

const tabs: { id: Comparison; label: string; shortLabel: string; icon: LucideIcon }[] = [
  { id: "cans", label: "Renting vs Water Cans", shortLabel: "Water Cans", icon: PackageOpen },
  { id: "buy", label: "Renting vs Buying", shortLabel: "Buying", icon: Landmark },
  { id: "traditional", label: "Renting vs Traditional Methods", shortLabel: "Traditional", icon: FlaskConical },
];

// Calculator inputs, based on the "Water Can Supply vs Rent O' Mate" and "Own vs Extend Life" posters.
// Can water follows the Rent O' Mate savings sheet: a year is 52 weeks and cans start at ₹40.
const CAN_PRICES = [40, 50, 60, 70, 80];
const CAN_TYPES = [
  { label: "Unbranded", priceIndex: 0 },
  { label: "Known Brand", priceIndex: 1 },
  { label: "Not Sure", priceIndex: 0 },
];
const WEEKS_PER_YEAR = 52;
const CAN_STEPS = 5;

/**
 * Fewest cans a week for which cans cost more than the plan, even at the cheapest can price,
 * so the customer always saves (₹449 plan → 3 cans, ₹699 plan → 5 cans).
 */
const minCansFor = (plan: Plan) => Math.floor((plan.price * 12) / (CAN_PRICES[0] * WEEKS_PER_YEAR)) + 1;
const canOptionsFor = (plan: Plan) => Array.from({ length: CAN_STEPS }, (_, step) => minCansFor(plan) + step);
// Purchase cost and years used are picked as ranges; the calculation uses the top of the range picked.
const PURCHASE_COST_RANGES = [
  [8000, 10000],
  [10000, 12000],
  [12000, 14000],
  [14000, 16000],
  [16000, 18000],
  [18000, 20000],
];
const YEARS_USED_RANGES = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
];
const YEARLY_UPKEEP = [2500, 3000, 3500, 4000];

const SMART_SAVER = PLANS.find((plan) => plan.months === 24) ?? PLANS[0];

const RangeInput = ({ label, value, onChange, marks }: { label: string; value: number; onChange: (value: number) => void; marks: string[] }) => (
  <div className="rounded-[10px] border border-slate-100 bg-slate-50/70 px-3 py-2.5">
    <label className="block text-[10px] font-extrabold uppercase tracking-wide text-slate-600">{label}</label>
    <input
      aria-label={label}
      type="range"
      min="0"
      max={marks.length - 1}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="mt-1.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-sky-600"
    />
    <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-slate-500">
      {marks.map((mark, index) => (
        <span key={mark} className={index === value ? "text-sky-700" : ""}>{mark}</span>
      ))}
    </div>
  </div>
);

export const WhyRentomate: React.FC = () => {
  const [comparison, setComparison] = useState<Comparison>("cans");
  // Set while a calculated result is shown; pops the "With Rent O' Mate" card in a matching colour.
  const [highlight, setHighlight] = useState<Highlight>(null);
  const chooseComparison = (next: Comparison) => {
    setComparison(next);
    setHighlight(null);
  };

  return (
    <section id="why-rentomate" className="relative overflow-hidden bg-[#0a0a0a] pt-10 pb-12 sm:pt-12 sm:pb-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.18),transparent_40%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
          <span className="mb-2 inline-block rounded-[10px] bg-sky-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-300 ring-1 ring-sky-400/25">Why Rent</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.25rem] sm:leading-tight">Renting a Water Purifier Makes More Sense Than Your Current Setup</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">Whether you buy water cans, own a purifier or rely on traditional methods, see how a Rent O&apos; Mate purifier on rent compares.</p>
        </motion.div>

        <div role="tablist" className="mt-6 grid grid-cols-3 gap-1 rounded-[10px] border border-slate-200 bg-white p-1 shadow-sm sm:mt-5 sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = comparison === tab.id;
            return <button key={tab.id} type="button" onClick={() => chooseComparison(tab.id)} role="tab" aria-selected={active} className={`flex min-h-10 flex-col items-center justify-center gap-1 rounded-[10px] border px-1.5 py-2 text-center text-[11px] font-bold sm:min-h-12 sm:flex-row sm:gap-2 sm:px-3 sm:py-2.5 sm:text-xs transition-all ${active ? "border-sky-600 bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-500/20" : "border-transparent bg-white text-slate-600 sm:border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
              <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" /> <span className="sm:hidden">{tab.shortLabel}</span><span className="hidden sm:inline">{tab.label}</span>
            </button>;
          })}
        </div>

        <motion.div key={comparison} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="mt-4">
          {comparison === "traditional" ? (
            <div className="space-y-4"><TraditionalComparison /><RentCta /></div>
          ) : (
            <div className="grid gap-4 lg:gap-5 lg:grid-cols-[0.94fr_1.06fr]">
              {comparison === "cans" ? <CanCalculator onResult={setHighlight} /> : <BuyCalculator onResult={setHighlight} />}
              <div className="flex flex-col gap-4 lg:gap-3"><BenefitsPanel comparison={comparison} highlight={highlight} /><RentCta /></div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

/** "save": renting costs less. "value": renting costs more but still wins on hassle. null: no result shown. */
type Highlight = "save" | "value" | null;
type ResultHandler = (highlight: Highlight) => void;

/** Shared shell: inputs slide out, result slides in. Reports how the shown result compares for renting. */
function CalculatorShell({ subtitle, inputs, result, rentWins, onResult }: { subtitle: string; inputs: React.ReactNode; result: React.ReactNode; rentWins: boolean; onResult: ResultHandler }) {
  const [showResult, setShowResultState] = useState(false);
  const setShowResult = (show: boolean) => {
    setShowResultState(show);
    onResult(show ? (rentWins ? "save" : "value") : null);
  };
  return <div className="overflow-hidden rounded-[10px] border border-slate-200 bg-white p-5 shadow-sm">
    <AnimatePresence mode="wait" initial={false}>
      {showResult ? <motion.div key="result" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }} transition={{ duration: 0.3, ease: "easeOut" }}>
        <button type="button" onClick={() => setShowResult(false)} className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 transition hover:text-sky-900"><ArrowLeft className="h-4 w-4" /> Change details</button>
        {result}
      </motion.div> : <motion.div key="inputs" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.3, ease: "easeOut" }}>
        <h3 className="text-lg font-extrabold text-slate-900">See How Renting Works for You</h3>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        <div className="mt-4 space-y-2.5">{inputs}</div>
        <button type="button" onClick={() => setShowResult(true)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-700 hover:to-blue-700"><Calculator className="h-4 w-4" /> Calculate</button>
      </motion.div>}
    </AnimatePresence>
  </div>;
}

function CanCalculator({ onResult }: { onResult: ResultHandler }) {
  const [canType, setCanType] = useState(2);
  const [canCost, setCanCost] = useState(CAN_TYPES[2].priceIndex);
  const [plan, setPlan] = useState<Plan>(SMART_SAVER);
  const [cans, setCans] = useState(minCansFor(SMART_SAVER));

  const chooseType = (index: number) => {
    setCanType(index);
    setCanCost(CAN_TYPES[index].priceIndex);
  };

  // Each plan only offers can counts where renting wins; keep the chosen count inside the new range.
  const canOptions = canOptionsFor(plan);
  const choosePlan = (next: Plan) => {
    const options = canOptionsFor(next);
    setPlan(next);
    setCans((current) => Math.min(Math.max(current, options[0]), options[options.length - 1]));
  };

  const price = CAN_PRICES[canCost];
  const years = plan.months / 12;
  const weeks = WEEKS_PER_YEAR * years;
  const canTotal = cans * price * weeks;
  const rentTotal = plan.price * plan.months;
  const saving = canTotal - rentTotal;
  const savingPerYear = Math.round(saving / years);

  const inputs = <>
    <div>
      <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wide text-slate-600">Type of cans</p>
      <div className="grid grid-cols-3 gap-2">
        {CAN_TYPES.map((type, index) => <button key={type.label} type="button" onClick={() => chooseType(index)} className={`rounded-[10px] border px-2 py-2.5 text-xs font-bold transition ${canType === index ? "border-sky-500 bg-sky-50 text-sky-800 shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"}`}>{type.label}</button>)}
      </div>
    </div>
    <RangeInput label="Cans per week (20 L)" value={cans - canOptions[0]} onChange={(step) => setCans(canOptions[step])} marks={canOptions.map(String)} />
    <RangeInput label="Cost per can" value={canCost} onChange={setCanCost} marks={CAN_PRICES.map((value) => `₹${value}`)} />
    <PlanSelector selected={plan} onSelect={choosePlan} />
  </>;

  const result = <div className="mt-5 rounded-[10px] border border-sky-200 bg-sky-50/70 p-4 text-sm text-slate-700">
    <h4 className="font-extrabold text-slate-900">Your {plan.months}-Month Comparison</h4>
    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
      <ComparisonValue label="Water can supply" value={`${cans} × ${inr(price)} × ${weeks} weeks`} />
      <ComparisonValue label={`Rent O' Mate ${plan.name}`} value={`${inr(plan.price)} × ${plan.months} months`} />
      <ComparisonValue label="Total spend on cans" value={inr(canTotal)} tone="bad" />
      <ComparisonValue label="Total spend on Rent O' Mate" value={inr(rentTotal)} tone="good" />
      <ComparisonValue label="Filter change, service & AMC" value="Not applicable" />
      <ComparisonValue label="Installation, filters, service & AMC" value="FREE" tone="good" />
    </div>
    <p className="mt-4 border-t border-sky-200 pt-3 text-sm font-bold text-emerald-700">
      You save {inr(saving)} in {plan.months} months with Rent O&apos; Mate{years > 1 ? ` (${inr(savingPerYear)} a year)` : ""} — better water, less hassle.
    </p>
    <p className="mt-3 text-[11px] font-medium leading-relaxed text-slate-500">Estimate based on {WEEKS_PER_YEAR} weeks a year and the can price and usage entered above. Actual costs may vary.</p>
  </div>;

  return <CalculatorShell subtitle="Tell us about your current water-can usage." inputs={inputs} result={result} rentWins={saving > 0} onResult={onResult} />;
}

function BuyCalculator({ onResult }: { onResult: ResultHandler }) {
  const [purchaseCost, setPurchaseCost] = useState(1);
  const [yearsUsed, setYearsUsed] = useState(0);
  const [upkeep, setUpkeep] = useState(0);

  const years = YEARS_USED_RANGES[yearsUsed][1];
  const purchase = PURCHASE_COST_RANGES[purchaseCost][1];
  const yearlyUpkeep = YEARLY_UPKEEP[upkeep];
  const ownTotal = purchase + yearlyUpkeep * years;
  const rentTotal = SMART_SAVER.price * 12 * years;
  const monthsForSameMoney = Math.floor(ownTotal / SMART_SAVER.price);
  const extraMonths = monthsForSameMoney - years * 12;

  const inputs = <>
    <RangeInput label="Purifier purchase cost" value={purchaseCost} onChange={setPurchaseCost} marks={PURCHASE_COST_RANGES.map(([low, high]) => `₹${low / 1000}–${high / 1000}k`)} />
    <RangeInput label="Years used" value={yearsUsed} onChange={setYearsUsed} marks={YEARS_USED_RANGES.map(([low, high]) => `${low}–${high} yrs`)} />
    <RangeInput label="Yearly filter, AMC & repairs" value={upkeep} onChange={setUpkeep} marks={YEARLY_UPKEEP.map((value) => `₹${value / 1000}k`)} />
  </>;

  const result = <div className="mt-5 rounded-[10px] border border-sky-200 bg-sky-50/70 p-4 text-sm text-slate-700">
    <h4 className="font-extrabold text-slate-900">Owning vs Renting for {years} {years === 1 ? "Year" : "Years"}</h4>
    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
      <ComparisonValue label="Purchase cost" value={inr(purchase)} />
      <ComparisonValue label={`Rent O' Mate (${inr(SMART_SAVER.price)}/month)`} value={`${years * 12} months`} />
      <ComparisonValue label={`Filter, AMC & repairs (${years} yr)`} value={inr(yearlyUpkeep * years)} />
      <ComparisonValue label="Installation, filters, service & AMC" value="FREE" tone="good" />
      <ComparisonValue label="Total spend to own" value={inr(ownTotal)} tone="bad" />
      <ComparisonValue label="Total spend on Rent O' Mate" value={inr(rentTotal)} tone="good" />
    </div>
    <p className="mt-4 border-t border-sky-200 pt-3 text-sm font-bold text-emerald-700">
      {extraMonths > 0
        ? `The same ${inr(ownTotal)} covers ${monthsForSameMoney} months of Rent O' Mate — ${extraMonths} extra months of pure water, zero maintenance.`
        : `Unlimited purified water for about ₹${PRICE_PER_DAY} a day, with zero maintenance and no breakdown bills.`}
    </p>
    <p className="mt-3 text-[11px] font-medium leading-relaxed text-slate-500">Estimate based on the values entered above, using the top of each range, compared with the {SMART_SAVER.months}-month {SMART_SAVER.name} plan.</p>
  </div>;

  return <CalculatorShell subtitle="Compare the real cost of owning a purifier." inputs={inputs} result={result} rentWins={ownTotal > rentTotal} onResult={onResult} />;
}

function PlanSelector({ selected, onSelect }: { selected: Plan; onSelect: (plan: Plan) => void }) {
  return <div><p className="mb-2 text-[10px] font-extrabold uppercase tracking-wide text-slate-600">Compare with</p><div className="grid grid-cols-2 gap-2">{PLANS.map((plan) => <button key={plan.months} type="button" onClick={() => onSelect(plan)} className={`rounded-[10px] border px-3 py-2.5 text-left text-xs transition ${selected.months === plan.months ? "border-sky-500 bg-sky-50 text-sky-800 shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"}`}><span className="block font-bold">{plan.months} Months · {plan.name}</span><span className="mt-0.5 block font-semibold">₹{plan.price}/month</span></button>)}</div></div>;
}

const ComparisonValue = ({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) => <div><p className="text-[11px] font-semibold leading-snug text-slate-500">{label}</p><p className={`mt-0.5 font-extrabold ${tone === "good" ? "text-emerald-700" : tone === "bad" ? "text-rose-600" : "text-slate-800"}`}>{value}</p></div>;

const BENEFITS = {
  cans: {
    title: "Water Can Struggles",
    issues: [
      "Unreliable water source",
      "Unknown purification process",
      "Plastic cans left in the sun during transport can leach microplastics into the water",
      "Carrying heavy cans and finding storage space",
      "Frequent reorders and an ongoing per-can expense",
    ],
    wins: [
      "24x7 pure water from a known source — your own tap",
      "Advanced multi-stage purification",
      "Service support and filter swaps free of charge",
      "7-day free trial, cancel at any time*",
      "ISI certified machines",
      "Flexible 12 or 24-month plans",
    ],
  },
  buy: {
    title: "Owning a Purifier Means",
    issues: [
      "High maintenance",
      "Frequent repairs",
      "Filter and AMC at extra cost",
      "Unexpected breakdowns",
      "Machine life ends sooner",
    ],
    wins: [
      `Unlimited purified water for about ₹${PRICE_PER_DAY}/day`,
      "Zero maintenance cost",
      "Free filter changes",
      "Free service and AMC",
      "No breakdown worries",
    ],
  },
};

const HIGHLIGHT_STYLES = {
  save: { glow: "14,165,233", card: "border-sky-500 from-sky-50 to-blue-50", heading: "text-sky-800", icon: "text-sky-200", badge: "bg-emerald-600", label: "Best value for you" },
  value: { glow: "245,158,11", card: "border-amber-400 from-amber-50 to-orange-50", heading: "text-amber-800", icon: "text-amber-200", badge: "bg-amber-500", label: "Worth it — zero hassle" },
};

function BenefitsPanel({ comparison, highlight }: { comparison: "cans" | "buy"; highlight: Highlight }) {
  const { title, issues, wins } = BENEFITS[comparison];
  const style = highlight ? HIGHLIGHT_STYLES[highlight] : null;
  return <div className="space-y-4 lg:space-y-3">
    <div className="relative overflow-hidden rounded-[10px] border border-slate-200 bg-white p-5"><Droplets className="absolute bottom-4 right-5 h-16 w-16 text-sky-100" /><h3 className="text-lg font-extrabold text-slate-900">{title}</h3><ul className="relative mt-3 space-y-1.5">{issues.map((issue) => <li key={issue} className="flex gap-2 text-sm text-slate-600"><X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />{issue}</li>)}</ul></div>
    <motion.div
      key={highlight ?? "none"}
      animate={style
        ? { scale: [1, 1.05, 0.99, 1.02], boxShadow: [`0 0 0 0 rgba(${style.glow},0)`, `0 0 0 6px rgba(${style.glow},0.35)`, `0 0 28px 4px rgba(${style.glow},0.45)`] }
        : { scale: 1, boxShadow: "0 0 0 0 rgba(14,165,233,0)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-[10px] border bg-gradient-to-br p-5 transition-colors ${style ? style.card : "border-sky-300 from-sky-50 to-blue-50"}`}
    >
      <CheckCircle2 className={`absolute bottom-4 right-5 h-16 w-16 ${style ? style.icon : "text-sky-200"}`} />
      <AnimatePresence>
        {style && <motion.span initial={{ opacity: 0, y: -8, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.8 }} transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 18 }} className={`absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md ${style.badge}`}><Sparkles className="h-3 w-3" /> {style.label}</motion.span>}
      </AnimatePresence>
      <h3 className={`text-lg font-extrabold ${style ? `${style.heading} pr-40` : "text-sky-800"}`}>With Rent O&apos; Mate, You Get</h3>
      <ul className="relative mt-3 space-y-1.5">{wins.map((win) => <li key={win} className="flex gap-2 text-sm font-medium text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{win}</li>)}</ul>
    </motion.div>
  </div>;
}

function TraditionalComparison() {
  const rows = [["Cloth filter", true, false, false, false], ["Boiling", false, true, false, false], ["Gravity filter", true, "partial", false, false], ["RO purifier", true, true, true, true]];
  return <div className="rounded-[10px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><p className="text-sm leading-relaxed text-slate-600">Traditional methods are time-consuming and offer only limited solutions. A modern RO purifier delivers reliable, multi-stage water purification for your entire household.</p><h3 className="mt-5 text-base font-extrabold text-slate-900">How Common Purification Methods Compare</h3><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[600px] overflow-hidden rounded-[10px] border border-slate-200 text-sm"><thead className="bg-slate-50 text-slate-600"><tr>{["Method", "Dirt", "Bacteria", "Heavy metals", "Dissolved salts"].map((heading) => <th key={heading} className="border-b border-slate-200 px-4 py-3 text-center text-xs font-bold first:text-left">{heading}</th>)}</tr></thead><tbody>{rows.map(([method, ...checks]) => <tr key={method as string} className="border-b border-slate-100 last:border-0"><td className="px-4 py-3 font-semibold text-slate-700">{method as string}</td>{checks.map((result, index) => <td key={index} className="px-4 py-3 text-center">{result === true ? <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-500" /> : result === "partial" ? <Minus className="mx-auto h-4 w-4 text-amber-500" /> : <X className="mx-auto h-4 w-4 text-rose-500" />}</td>)}</tr>)}</tbody></table></div></div>;
}

function RentCta() {
  return <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
    <p className="text-sm font-bold text-sky-300">A simpler way to enjoy purified water at home.</p>
    <a href="/ro-on-rent#plans" className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-[10px] bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-700 hover:to-blue-700 sm:w-auto"><Sparkles className="h-4 w-4" /> Rent a Water Purifier</a>
  </div>;
}
