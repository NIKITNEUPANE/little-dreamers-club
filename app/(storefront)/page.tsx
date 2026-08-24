import React from 'react';
import { db } from '../../lib/db/store';
import { HeroSection } from '../../components/home/HeroSection';
import { NewArrivalsSection } from '../../components/home/NewArrivalsSection';
import { BestsellersSection } from '../../components/home/BestsellersSection';
import { BrandStorySection } from '../../components/home/BrandStorySection';
import { FeaturedCollectionsSection } from '../../components/home/FeaturedCollectionsSection';
import { EditorialPromoSection } from '../../components/home/EditorialPromoSection';
import { CategoryCardsSection } from '../../components/home/CategoryCardsSection';
import { PopularKidsToysSection } from '../../components/home/PopularKidsToysSection';
import { ToyBannersSection } from '../../components/home/ToyBannersSection';

export const revalidate = 60; // Refresh cache every 60 seconds

export default async function HomePage() {
  const [products, categories, collections, content] = await Promise.all([
    db.getProducts(),
    db.getCategories(),
    db.getCollections(),
    db.getStoreContent(),
  ]);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSection content={content.hero_section} />

      {/* 1st Content Section: New Arrivals */}
      <NewArrivalsSection products={products} />

      {/* 2nd Content Section: Loved by Little Dreamers (Bestsellers) */}
      <BestsellersSection products={products} />

      {/* 3rd Content Section: Brand Story ("Made for Little Dreams") */}
      <BrandStorySection />

      {/* 4th Content Section: Featured Collections */}
      <FeaturedCollectionsSection collections={collections} />

      {/* 5th Section: Promotional Editorial */}
      <EditorialPromoSection content={content.promo_editorial} />

      {/* 6th Section: Shop by Category */}
      <CategoryCardsSection categories={categories} />

      {/* 7th Section: Popular Kids Toys with Interactive Theme Filter */}
      <PopularKidsToysSection />

      {/* 8th Section: Promotional Toy Banners (15% Off + Boys/Girls split) */}
      <ToyBannersSection />
    </div>
  );
}
