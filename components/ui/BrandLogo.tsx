import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'full' | 'mark' | 'compact';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-10 w-auto',
    md: 'h-14 sm:h-16 w-auto',
    lg: 'h-20 w-auto',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      <div className="relative flex items-center">
        <Image
          src="/images/brand-logo-transparent.png"
          alt="Little Dreamers Club Logo"
          width={size === 'sm' ? 44 : size === 'lg' ? 84 : 64}
          height={size === 'sm' ? 44 : size === 'lg' ? 84 : 64}
          priority
          className={`${sizeClasses[size]} object-contain drop-shadow-xs`}
        />
      </div>
    </Link>
  );
};
