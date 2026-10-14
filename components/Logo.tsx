"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  /** White lettering for dark backgrounds (the infinity mark keeps its colours). */
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "h-8 sm:h-9 w-auto",
  width = 175,
  height = 42,
  light = false,
}) => {
  return (
    <div className={`relative flex items-center select-none ${className}`}>
      <Image
        src={light ? "/rentomate-wordmark-white.png" : "/rentomate-wordmark-clean.png"}
        alt="RentOMate - Water Purifiers On Rent"
        width={width}
        height={height}
        priority
        className="object-contain h-full w-auto"
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );
};
