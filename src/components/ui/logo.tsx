import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white' | 'icon';
  width?: number;
  height?: number;
  href?: string;
}

export function Logo({ 
  className = "", 
  variant = 'default',
  width = 140,
  height = 40,
  href = "/" 
}: LogoProps) {
  const isWhite = variant === 'white';
  const isIcon = variant === 'icon';

  if (isIcon) {
    return (
      <Link href={href} className={`flex items-center justify-center ${className}`}>
        <Image 
          src="/LOGO AJA.png" 
          alt="SIGAP Icon" 
          width={height} 
          height={height} 
          className="object-contain" 
        />
      </Link>
    );
  }

  return (
    <Link href={href} className={`flex items-center gap-2 select-none ${className}`}>
      <Image 
        src="/LOGO AJA.png" 
        alt="SIGAP Icon" 
        width={height * 0.8} 
        height={height * 0.8} 
        className="object-contain" 
      />
      <div className="flex flex-col justify-center leading-none">
        <span className={`font-bold tracking-tight ${isWhite ? 'text-white' : 'text-sigap-darkest'}`} style={{ fontSize: height * 0.45 }}>
          SIGAP
        </span>
        <span className={`font-semibold tracking-[0.2em] uppercase ${isWhite ? 'text-white/80' : 'text-sigap-primary'}`} style={{ fontSize: height * 0.22, marginTop: height * 0.05 }}>
          UMKM
        </span>
      </div>
    </Link>
  );
}
