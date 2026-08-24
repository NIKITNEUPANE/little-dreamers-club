'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductImage } from '../../lib/db/types';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const displayImages = images.length > 0 ? images : [
    {
      id: 'placeholder',
      product_id: 'prod',
      image_url: '/images/pajama-set-1.jpg',
      alt_text: productName,
      sort_order: 1,
      is_primary: true,
    }
  ];

  const currentImage = displayImages[selectedIndex] || displayImages[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail Bar */}
      {displayImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] shrink-0 pb-2 md:pb-0">
          {displayImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#F5F0E8] border-2 transition-all shrink-0 ${
                selectedIndex === idx
                  ? 'border-[#604E72] shadow-xs'
                  : 'border-[#E8E2EE] opacity-70 hover:opacity-100 hover:border-[#BEB2D4]'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={img.image_url}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Display Image */}
      <div className="relative flex-1 aspect-square rounded-3xl overflow-hidden bg-[#F5F0E8] border border-[#E8E2EE] shadow-dream group">
        <Image
          src={currentImage.image_url}
          alt={currentImage.alt_text || productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Zoom trigger overlay button */}
        <button
          onClick={() => setIsZoomOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-[#FAF8F5]/90 backdrop-blur-xs border border-[#E8E2EE] text-[#4A3E56] hover:bg-white hover:text-[#2A2433] shadow-xs transition-all"
          aria-label="Zoom image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Carousel arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FAF8F5]/80 backdrop-blur-xs text-[#4A3E56] hover:bg-white shadow-xs transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FAF8F5]/80 backdrop-blur-xs text-[#4A3E56] hover:bg-white shadow-xs transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Mobile dots indicator */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 md:hidden">
            {displayImages.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedIndex === idx ? 'w-5 bg-[#604E72]' : 'bg-[#FFFFFF]/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#2A2433]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
            aria-label="Close zoom modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full h-full">
            <Image
              src={currentImage.image_url}
              alt={productName}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
