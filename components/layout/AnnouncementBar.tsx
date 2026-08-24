'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  text?: string;
  linkUrl?: string;
  linkLabel?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text = 'Complimentary gift wrapping & free shipping on all orders over $75',
  linkUrl = '/shop',
  linkLabel = 'Shop Now',
}) => {
  return (
    <div className="bg-gradient-to-r from-[#4A3E56] via-[#604E72] to-[#4A3E56] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#362945]/30">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center font-normal tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#E5C365] animate-pulse shrink-0 hidden sm:inline" />
        <span>{text}</span>
        {linkLabel && (
          <Link
            href={linkUrl}
            className="inline-flex items-center gap-1 font-medium text-[#FDE8B3] hover:underline underline-offset-4 ml-1 transition-colors"
          >
            <span>{linkLabel}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
};
