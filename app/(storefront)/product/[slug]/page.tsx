import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { db } from '../../../../lib/db/store';
import { ProductGallery } from '../../../../components/product/ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductReviews } from '../../../../components/product/ProductReviews';
import { ProductCard } from '../../../../components/product/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await db.getProducts();
  return products.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found — Little Dreamers Club',
    };
  }

  return {
    title: `${product.name} — Little Dreamers Club`,
    description: product.short_description || product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} — Little Dreamers Club`,
      description: product.short_description,
      images: [
        {
          url: product.images[0]?.image_url || '/images/hero-lifestyle.jpg',
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await db.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await db.getProducts({ categorySlug: undefined }))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Structured Data Schema for Google Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => img.image_url),
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Little Dreamers Club',
    },
    offers: {
      '@type': 'Offer',
      url: `https://littledreamersclub.com/product/${product.slug}`,
      priceCurrency: 'USD',
      price: product.base_price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: Math.max(1, product.review_count),
    },
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#7E6A94] mb-8 uppercase tracking-wider">
          <a href="/shop" className="hover:text-[#362945] transition-colors">Shop</a>
          <span>/</span>
          <a href={`/shop?category=${product.category_id.replace('cat-', '')}`} className="hover:text-[#362945] transition-colors">
            {product.category_name}
          </a>
          <span>/</span>
          <span className="text-[#604E72] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-[#E8E2EE]">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Interactive Product Info & Add to Cart */}
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Verified Reviews Section */}
        <div className="py-16 border-b border-[#E8E2EE]" id="reviews">
          <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#2A2433] mb-8">
            Customer Reviews
          </h3>
          <ProductReviews
            productId={product.id}
            reviews={product.reviews}
            overallRating={product.rating}
            reviewCount={product.review_count}
          />
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#2A2433]">
                  Pairs Wonderfully With
                </h3>
                <p className="text-xs sm:text-sm text-[#7E6A94] mt-1">
                  Complete the bedtime ritual with these curated companion pieces.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
