import Image from "next/image";
import React from "react";
import Link from "next/link";

type LogoProps = {
  className?: string;
  width?: number;
};

export default function Logo({ className, width }: LogoProps) {
  const logoURL = "/logo.svg";
  const logoAltText = "Logo of JourneyNotes";

  return (
    <Link href="/">
      <Image
        src={logoURL}
        alt={logoAltText}
        width={width || 175}
        height={30}
        className={className}
      />
    </Link>
  );
}
