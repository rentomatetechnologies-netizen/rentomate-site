"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({
  className = "h-8 sm:h-9 w-auto",
  width = 175,
  height = 42,
}) => {
  return (
    <div className={`relative flex items-center select-none ${className}`}>
      <Image
        src="/rentomate-wordmark-clean.png"
        alt="RentOMate - Water Purifiers On Rent"
        width={width}
        height={height}
        priority
        className="object-contain h-full w-auto"
      />
    </div>
  );
};
