import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ProductRange } from "@/components/ProductRange";
import { KeySpecs } from "@/components/KeySpecs";
import { PureWaterTech } from "@/components/PureWaterTech";
import { BRAND, PLANS, PURIFIERS, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description: "Explore the Akvinz RO water purifiers on rent from Rent O' Mate: Ultron+, Ultron, Metaneo and Spark, with up to 9-stage RO + UV + UF purification, copper and minerals, 8–10 L storage.",
  path: "/products",
});

// schema.org Product data for every purifier we rent, each offered on the monthly rental plans, so search engines
// and AI assistants can answer "which water purifier can I rent and for how much".
const productsData = {
  "@context": "https://schema.org",
  "@graph": PURIFIERS.map((purifier) => ({
    "@type": "Product",
    "@id": `${SITE_URL}/products#${purifier.id}`,
    name: `${purifier.brand} ${purifier.name}`,
    brand: { "@type": "Brand", name: purifier.brand },
    category: "RO water purifier",
    description: `${purifier.tagline}. ${purifier.stages.length}-stage purification: ${purifier.stages.join(", ")}. ${purifier.storageLitres} L storage. Available on rent from ${BRAND.name} with free installation, servicing and filter replacements.`,
    image: purifier.colours.map(({ image }) => (typeof image === "string" ? image : `${SITE_URL}${image.src}`)),
    color: purifier.colours.map(({ colour }) => colour).join(", "),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Purification stages", value: purifier.stages.length },
      { "@type": "PropertyValue", name: "Storage capacity", value: purifier.storageLitres, unitText: "L" },
      { "@type": "PropertyValue", name: "TDS adjustment", value: purifier.tdsAdjustment ? "Yes" : "No" },
    ],
    offers: PLANS.map((plan) => ({
      "@type": "Offer",
      name: `${plan.months}-month ${plan.name} rental plan`,
      url: `${SITE_URL}/products`,
      price: plan.price,
      priceCurrency: "INR",
      priceSpecification: { "@type": "UnitPriceSpecification", price: plan.price, priceCurrency: "INR", unitCode: "MON", unitText: "MONTH" },
      businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#business` },
    })),
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsData) }} />
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
