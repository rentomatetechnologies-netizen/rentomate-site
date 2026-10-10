"use client";

import React, { useMemo, useState } from "react";
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

type Comparison = "cans" | "buy" | "traditional";

const tabs: { id: Comparison; label: string; shortLabel: string; icon: LucideIcon }[] = [
  { id: "cans", label: "Renting vs Water Cans", shortLabel: "Water Cans", icon: PackageOpen },
  { id: "buy", label: "Renting vs Buying", shortLabel: "Buying", icon: Landmark },
  { id: "traditional", label: "Renting vs Traditional Methods", shortLabel: "Traditional", icon: FlaskConical },
];

const rentalPlans = [
  { months: 24, price: 449 },
  { months: 12, price: 699 },
];

const lowestPlanPrice = Math.min(...rentalPlans.map((plan) => plan.price));

const rangeMarks = (values: string[], value: number) => (
  <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-slate-500">
    {values.map((label, index) => (
      <span key={label} className={index === value ? "text-sky-700" : ""}>{label}</span>
    ))}
  </div>
);

const RangeInput = ({
  label,
  value,
  onChange,
  marks,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  marks: string[];
}) => (
  <div className="rounded border border-slate-100 bg-slate-50/70 px-3 py-2.5">
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
    {rangeMarks(marks, value)}
  </div>
);

export const WhyRentomate: React.FC = () => {
  const [comparison, setComparison] = useState<Comparison>("cans");
  const [cansPerWeek, setCansPerWeek] = useState(0);
  const [canCost, setCanCost] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(449);
  const [purchaseCost, setPurchaseCost] = useState(0);
  const [yearsUsed, setYearsUsed] = useState(0);
  const [maintenanceCost, setMaintenanceCost] = useState(0);

  const monthlyCanCost = useMemo(() => {
    const cans = [1, 2, 3, 4, 5][cansPerWeek];
    const price = [50, 70, 90, 110][canCost];
    return cans * price * 4.33;
  }, [canCost, cansPerWeek]);

  const buyingSavings = useMemo(() => {
    const cost = [15000, 20000, 25000, 30000, 35000][purchaseCost];
    const years = [1, 2, 3, 4, 5][yearsUsed];
    const maintenance = [3000, 4000, 5000, 6000][maintenanceCost];
    return Math.round((cost + maintenance * years) / (years * 12) - lowestPlanPrice);
  }, [maintenanceCost, purchaseCost, yearsUsed]);

  const content = comparison === "traditional" ? (
    <div className="space-y-4"><TraditionalComparison /><RentCta /></div>
  ) : (
    <div className="grid gap-4 lg:gap-5 lg:grid-cols-[0.94fr_1.06fr]">
      <CalculatorCard
        comparison={comparison}
        cansPerWeek={cansPerWeek}
        canCost={canCost}
        purchaseCost={purchaseCost}
        yearsUsed={yearsUsed}
        maintenanceCost={maintenanceCost}
        setCansPerWeek={setCansPerWeek}
        setCanCost={setCanCost}
        setPurchaseCost={setPurchaseCost}
        setYearsUsed={setYearsUsed}
        setMaintenanceCost={setMaintenanceCost}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        monthlyCanCost={monthlyCanCost}
        savings={buyingSavings}
      />
      <div className="flex flex-col gap-4 lg:gap-3"><BenefitsPanel comparison={comparison} /><RentCta /></div>
    </div>
  );

  return (
    <section id="why-rentomate" className="relative overflow-hidden bg-slate-50/70 pt-8 pb-10 sm:pt-10 sm:pb-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.12),transparent_35%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
          <span className="mb-2 inline-block rounded bg-sky-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">Why RentOMate</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[2.25rem] sm:leading-tight">Why rent a water purifier in Coimbatore?</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">Buying a purifier means an upfront purchase and owner-managed upkeep. RentOMate gives homes, apartments, and tenants a flexible way to use an Akvinz RO water purifier on a monthly plan.</p>
        </motion.div>

        <div role="tablist" className="mt-6 grid grid-cols-3 gap-1 rounded border border-slate-200 bg-white p-1 shadow-sm sm:mt-5 sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = comparison === tab.id;
            return <button key={tab.id} type="button" onClick={() => setComparison(tab.id)} role="tab" aria-selected={active} className={`flex min-h-10 flex-col items-center justify-center gap-1 rounded border px-1.5 py-2 text-center text-[11px] font-bold sm:min-h-12 sm:flex-row sm:gap-2 sm:px-3 sm:py-2.5 sm:text-xs transition-all ${active ? "border-sky-600 bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-500/20" : "border-transparent bg-white text-slate-600 sm:border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
              <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" /> <span className="sm:hidden">{tab.shortLabel}</span><span className="hidden sm:inline">{tab.label}</span>
            </button>;
          })}
        </div>

        <motion.div key={comparison} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="mt-4">{content}</motion.div>

      </div>
    </section>
  );
};

function CalculatorCard(props: {
  comparison: "cans" | "buy"; cansPerWeek: number; canCost: number; purchaseCost: number; yearsUsed: number; maintenanceCost: number; setCansPerWeek: (value: number) => void; setCanCost: (value: number) => void; setPurchaseCost: (value: number) => void; setYearsUsed: (value: number) => void; setMaintenanceCost: (value: number) => void; selectedPlan: number; setSelectedPlan: (value: number) => void; monthlyCanCost: number; savings: number;
}) {
  const [showResult, setShowResult] = useState(false);
  const isCans = props.comparison === "cans";
  const selectedPlan = rentalPlans.find((plan) => plan.price === props.selectedPlan) ?? rentalPlans[0];
  return <div className="overflow-hidden rounded border border-slate-200 bg-white p-5 shadow-sm">
    <AnimatePresence mode="wait" initial={false}>
      {showResult ? <motion.div key="result" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }} transition={{ duration: 0.3, ease: "easeOut" }}>
        <button type="button" onClick={() => setShowResult(false)} className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 transition hover:text-sky-900"><ArrowLeft className="h-4 w-4" /> Change details</button>
        {isCans ? <CanComparison monthlyCanCost={props.monthlyCanCost} plan={selectedPlan} /> : <div className="mt-5 rounded border border-sky-200 bg-sky-50 px-4 py-6 text-center text-sm text-slate-700">You could save <strong className="text-emerald-700">₹{props.savings.toLocaleString("en-IN")}/month</strong><br /><span className="text-xs">by renting with RentOMate from ₹{lowestPlanPrice}/month instead of buying.</span></div>}
      </motion.div> : <motion.div key="inputs" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.3, ease: "easeOut" }}>
    <h3 className="text-lg font-extrabold text-slate-900">See how renting works for you</h3>
    <p className="mt-1 text-sm text-slate-500">{isCans ? "Adjust your current water-can usage." : "Adjust the details below to compare your monthly cost."}</p>
    <div className="mt-4 space-y-2.5">
      {isCans ? <>
        <RangeInput label="Cans per week" value={props.cansPerWeek} onChange={props.setCansPerWeek} marks={["1", "2", "3", "4", "5"]} />
        <RangeInput label="Cost per can" value={props.canCost} onChange={props.setCanCost} marks={["₹50", "₹70", "₹90", "₹110"]} />
        <PlanSelector selectedPlan={props.selectedPlan} onSelect={props.setSelectedPlan} />
      </> : <>
        <RangeInput label="Purifier purchase cost" value={props.purchaseCost} onChange={props.setPurchaseCost} marks={["₹15k", "₹20k", "₹25k", "₹30k", "₹35k"]} />
        <RangeInput label="Years used" value={props.yearsUsed} onChange={props.setYearsUsed} marks={["1", "2", "3", "4", "5"]} />
        <RangeInput label="Yearly AMC / filter cost" value={props.maintenanceCost} onChange={props.setMaintenanceCost} marks={["₹3k", "₹4k", "₹5k", "₹6k"]} />
      </>}
    </div>
    <button type="button" onClick={() => setShowResult(true)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-700 hover:to-blue-700"><Calculator className="h-4 w-4" /> Calculate</button>
      </motion.div>}
    </AnimatePresence>
  </div>;
}

function PlanSelector({ selectedPlan, onSelect }: { selectedPlan: number; onSelect: (price: number) => void }) {
  return <div><p className="mb-2 text-[10px] font-extrabold uppercase tracking-wide text-slate-600">Compare with</p><div className="grid grid-cols-2 gap-2">{rentalPlans.map((plan) => <button key={plan.months} type="button" onClick={() => onSelect(plan.price)} className={`rounded border px-3 py-2.5 text-left text-xs transition ${selectedPlan === plan.price ? "border-sky-500 bg-sky-50 text-sky-800 shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"}`}><span className="block font-bold">{plan.months} Months</span><span className="mt-0.5 block font-semibold">₹{plan.price}/month</span></button>)}</div></div>;
}

function CanComparison({ monthlyCanCost, plan }: { monthlyCanCost: number; plan: { months: number; price: number } }) {
  const monthlySavings = monthlyCanCost - plan.price;
  const saves = monthlySavings > 0;
  const amount = Math.round(Math.abs(monthlySavings)).toLocaleString("en-IN");
  const annualAmount = Math.round(Math.abs(monthlySavings) * 12).toLocaleString("en-IN");
  const message = saves
    ? `You could save approximately ₹${amount}/month (₹${annualAmount}/year) with RentOMate.`
    : `For just ₹${amount} more per month, get RO+UV purified water on tap at home — no can orders, delivery waits or bottle storage.`;

  return <div className="mt-5 rounded border border-sky-200 bg-sky-50/70 p-4 text-sm text-slate-700"><h4 className="font-extrabold text-slate-900">Estimated Monthly Comparison</h4><div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3"><ComparisonValue label="Your estimated water-can cost" value={`₹${Math.round(monthlyCanCost).toLocaleString("en-IN")}/month`} /><ComparisonValue label="RentOMate" value={`₹${plan.price}/month`} />{saves && <><ComparisonValue label="Monthly savings" value={`₹${amount}/month`} /><ComparisonValue label="Annual savings" value={`₹${annualAmount}/year`} /></>}<ComparisonValue label="Water-can cost per year" value={`₹${Math.round(monthlyCanCost * 12).toLocaleString("en-IN")}/year`} /><ComparisonValue label="RentOMate per year" value={`₹${(plan.price * 12).toLocaleString("en-IN")}/year`} /></div><p className={`mt-4 border-t border-sky-200 pt-3 text-sm font-bold ${saves ? "text-emerald-700" : "text-sky-800"}`}>{message}</p><p className="mt-3 text-[11px] font-medium leading-relaxed text-slate-500">Estimate based on the water-can price and usage entered above. Actual costs may vary depending on delivery frequency, quantity and rental plan terms.</p></div>;
}

const ComparisonValue = ({ label, value }: { label: string; value: string }) => <div><p className="text-[11px] font-semibold leading-snug text-slate-500">{label}</p><p className="mt-0.5 font-extrabold text-slate-800">{value}</p></div>;

function BenefitsPanel({ comparison }: { comparison: "cans" | "buy" }) {
  const isCans = comparison === "cans";
  const title = isCans ? "Water can struggles" : "Buying a purifier comes with";
  const issues = isCans ? ["Regular ordering and delivery coordination", "Storage space for bottles is needed", "Delivery timing may be inconvenient", "An ongoing per-can expense"] : ["A higher upfront purchase cost", "Owner-managed filters and service", "Maintenance costs over time", "Moving the purifier is your responsibility"];
  const wins = isCans ? ["RO+UV purification at home", "Installation included, subject to feasibility", "Service support according to your plan", "Convenient monthly rental plans"] : ["A monthly rental instead of a big purchase", "One clear plan for your home", "Maintenance according to subscription terms", "12 or 24-month plan options"];
  return <div className="space-y-4 lg:space-y-3">
    <div className="relative overflow-hidden rounded border border-slate-200 bg-white p-5"><Droplets className="absolute bottom-4 right-5 h-16 w-16 text-sky-100" /><h3 className="text-lg font-extrabold text-slate-900">{title}</h3><ul className="relative mt-3 space-y-1.5">{issues.map((issue) => <li key={issue} className="flex gap-2 text-sm text-slate-600"><X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />{issue}</li>)}</ul></div>
    <div className="relative overflow-hidden rounded border border-sky-300 bg-gradient-to-br from-sky-50 to-blue-50 p-5"><CheckCircle2 className="absolute bottom-4 right-5 h-16 w-16 text-sky-200" /><h3 className="text-lg font-extrabold text-sky-800">With RentOMate, you get</h3><ul className="relative mt-3 space-y-1.5">{wins.map((win) => <li key={win} className="flex gap-2 text-sm font-medium text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{win}</li>)}</ul></div>
  </div>;
}

function TraditionalComparison() {
  const rows = [["Cloth filter", true, false, false, false], ["Boiling", false, true, false, false], ["Gravity filter", true, "partial", false, false], ["RO purifier", true, true, true, true]];
  return <div className="rounded border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><p className="text-sm leading-relaxed text-slate-600">Traditional methods can take time and may address only part of the problem. A modern RO purifier gives your household dependable, multi-stage purification.</p><h3 className="mt-5 text-base font-extrabold text-slate-900">How common purification methods compare</h3><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[600px] overflow-hidden rounded border border-slate-200 text-sm"><thead className="bg-slate-50 text-slate-600"><tr>{["Method", "Dirt", "Bacteria", "Heavy metals", "Dissolved salts"].map((heading) => <th key={heading} className="border-b border-slate-200 px-4 py-3 text-center text-xs font-bold first:text-left">{heading}</th>)}</tr></thead><tbody>{rows.map(([method, ...checks]) => <tr key={method as string} className="border-b border-slate-100 last:border-0"><td className="px-4 py-3 font-semibold text-slate-700">{method as string}</td>{checks.map((result, index) => <td key={index} className="px-4 py-3 text-center">{result === true ? <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-500" /> : result === "partial" ? <Minus className="mx-auto h-4 w-4 text-amber-500" /> : <X className="mx-auto h-4 w-4 text-rose-500" />}</td>)}</tr>)}</tbody></table></div></div>;
}

function RentCta() {
  return <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
    <p className="text-sm font-bold text-sky-700">A simpler way to enjoy purified water at home.</p>
    <a href="#plans" className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-700 hover:to-blue-700 sm:w-auto"><Sparkles className="h-4 w-4" /> Rent a Water Purifier</a>
  </div>;
}
