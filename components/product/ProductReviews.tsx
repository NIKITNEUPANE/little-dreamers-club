'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, MessageSquarePlus, Check } from 'lucide-react';
import { Review } from '../../lib/db/types';
import { db } from '../../lib/db/store';
import { formatDate } from '../../lib/utils';

interface ProductReviewsProps {
  productId: string;
  reviews?: Review[];
  overallRating: number;
  reviewCount: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  reviews = [],
  overallRating,
  reviewCount,
}) => {
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !body) return;
    setLoading(true);
    const newRev = await db.addReview(productId, {
      product_id: productId,
      reviewer_name: name,
      rating,
      title,
      body,
      verified_purchase: true,
    });
    setLocalReviews((prev) => [newRev, ...prev]);
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setIsFormOpen(false);
      setSubmitted(false);
      setName('');
      setTitle('');
      setBody('');
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-[#F7F4FB] border border-[#E8E2EE]">
        <div className="flex items-center gap-5">
          <div className="text-center">
            <span className="font-editorial text-4xl font-bold text-[#362945]">
              {overallRating.toFixed(1)}
            </span>
            <div className="flex items-center justify-center gap-0.5 text-[#D4AF37] mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.round(overallRating)
                      ? 'fill-[#D4AF37] text-[#D4AF37]'
                      : 'text-[#D8CEE3]'
                  }`}
                />
              ))}
            </div>
            <span className="text-[0.68rem] text-[#7E6A94] uppercase tracking-wider block mt-1">
              {reviewCount} Reviews
            </span>
          </div>

          <div className="h-12 w-px bg-[#E8E2EE] hidden sm:block" />

          <div>
            <h4 className="font-editorial text-base font-semibold text-[#362945]">
              Parent Favorites
            </h4>
            <p className="text-xs text-[#7E6A94] mt-0.5">
              100% verified customer experiences from little dreamers families.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Review Submission Form */}
      {isFormOpen && (
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#BEB2D4] shadow-dream animate-in fade-in duration-200">
          <h4 className="font-editorial text-lg font-semibold text-[#362945] mb-4">
            Share Your Experience
          </h4>
          {submitted ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#604E72] py-4">
              <Check className="w-4 h-4 text-[#D4AF37]" />
              <span>Thank you! Your verified review has been published.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#7E6A94] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#7E6A94] mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2 pt-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-[#D4AF37] hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#D8CEE3]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-medium text-[#7E6A94] ml-2">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7E6A94] mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Incredibly soft and washed like a dream"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7E6A94] mb-1">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Share details about the fabric, sizing, comfort, and how your little one loved it..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs text-[#7E6A94] hover:text-[#2A2433]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  {loading ? 'Submitting...' : 'Post Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {localReviews.length === 0 ? (
          <div className="text-center py-10 text-xs text-[#7E6A94]">
            No reviews yet. Be the first to review this little treasure!
          </div>
        ) : (
          localReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E2EE] shadow-2xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-[#D4AF37]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#D8CEE3]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-xs text-[#2A2433]">
                    {rev.reviewer_name}
                  </span>
                  {rev.verified_purchase && (
                    <span className="inline-flex items-center gap-1 text-[0.65rem] font-medium text-[#604E72] bg-[#EFEAF6] px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                      Verified Purchaser
                    </span>
                  )}
                </div>
                <span className="text-[0.68rem] text-[#9F8EB9]">
                  {formatDate(rev.created_at)}
                </span>
              </div>

              <h5 className="font-editorial text-sm font-semibold text-[#362945]">
                {rev.title}
              </h5>

              <p className="text-xs text-[#7E6A94] leading-relaxed">
                {rev.body}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
