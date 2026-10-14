import type React from "react";
import Image from "next/image";
import { Droplets } from "lucide-react";
import { isOptimizableImage } from "@/lib/blog";

/** Post cover image with a branded placeholder when the admin hasn't uploaded one. */
export const BlogCover: React.FC<{ src: string; alt: string; sizes: string; preload?: boolean; className?: string }> = ({
  src,
  alt,
  sizes,
  preload,
  className = "",
}) => (
  <div className={`relative overflow-hidden bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100 ${className}`}>
    {src ? (
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} unoptimized={!isOptimizableImage(src)} className="object-cover" />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center">
        <Droplets className="h-12 w-12 text-sky-300" aria-hidden />
      </div>
    )}
  </div>
);
