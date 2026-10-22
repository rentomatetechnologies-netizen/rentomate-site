import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ProductRange } from "@/components/ProductRange";
import { KeySpecs } from "@/components/KeySpecs";
import { PureWaterTech } from "@/components/PureWaterTech";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description: "Explore the Akvinz Ultron RO+UV water purifier available on rent from Rent O' Mate: 8-stage purification, copper and minerals, 8 L storage.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Products"
        breadcrumbs={[{ label: "Products", href: "/products" }]}
        title={<>Purifiers built for <span className="text-[#0084FF]">pure, great-tasting water</span></>}
        description="ISI certified Akvinz purifiers with 8-stage purification, copper enrichment and pH-balanced alkaline water, available on rent."
      />
      <ProductCatalog />
      <ProductRange />
      <KeySpecs />
      <PureWaterTech />
    </>
  );
}
