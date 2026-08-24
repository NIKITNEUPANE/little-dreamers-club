import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { db } from '../../../../lib/db/store';
import { ProductCard } from '../../../../components/product/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = await db.getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = await db.getProducts({ collectionSlug: slug });

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20">
      {/* Editorial Collection Hero Banner */}
      <div className="relative bg-[#241B2E] text-white min-h-[320px] sm:min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={collection.image_url}
            alt={collection.name}
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241B2E] via-[#241B2E]/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs text-[#EFEAF6] hover:text-[#FDE8B3] uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Collections</span>
          </Link>

          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#FDE8B3] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Curated Capsule</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
              {collection.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#EDE8F5] leading-relaxed max-w-lg">
              {collection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E2EE] text-xs text-[#7E6A94]">
          <span>
            Displaying <strong className="text-[#362945]">{products.length}</strong> heirloom pieces
          </span>
          <span className="text-[#604E72] font-semibold uppercase tracking-wider">
            Curated by Little Dreamers Club
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E2EE] p-8">
            <p className="font-editorial text-xl text-[#362945]">This collection is being freshly restocked.</p>
            <Link
              href="/shop"
              className="inline-block mt-4 px-6 py-2.5 rounded-full bg-[#4A3E56] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Browse Other Pieces
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
