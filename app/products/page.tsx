import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductRange } from "@/components/ProductRange";
import { KeySpecs } from "@/components/KeySpecs";
import { PureWaterTech } from "@/components/PureWaterTech";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore the Akvinz Ultron RO+UV water purifier available on rent from RentOMate: 8-stage purification, copper and minerals, 8 L storage.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Products"
        title={<>Purifiers built for <span className="text-[#0084FF]">pure, great-tasting water</span></>}
        description="ISI certified Akvinz purifiers with 8-stage purification, copper enrichment and pH-balanced alkaline water, available on rent."
      />
      <ProductRange />
      <KeySpecs />
      <PureWaterTech />
    </>
  );
}
