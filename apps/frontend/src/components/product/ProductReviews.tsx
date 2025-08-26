import React, { useState, useEffect } from 'react';
import { 
  HiStar,
  HiOutlineStar,
  HiPencilSquare,
  HiTrash,
  HiCheckBadge
} from 'react-icons/hi2';

interface Review {
  id: string;
  rating: number;
  title?: string;
  comment?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
  };
}

interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

interface ReviewData {
  reviews: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution[];
}

interface ProductReviewsProps {
  productId: string;
  userReview?: Review;
  onReviewSubmit?: (review: { rating: number; title: string; comment: string }) => void;
  onReviewUpdate?: (reviewId: string, review: { rating: number; title: string; comment: string }) => void;
  onReviewDelete?: (reviewId: string) => void;
  className?: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  userReview,
  onReviewSubmit,
  onReviewUpdate,
  onReviewDelete,
  className = ''
}) => {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [sortBy, setSortBy] = useState('createdAt');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
  }, [productId, sortBy, filterRating]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        sortBy,
        sortOrder: 'desc',
        ...(filterRating && { rating: filterRating.toString() })
      });

      const response = await fetch(`http://localhost:3001/api/reviews/product/${productId}?${params}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      
      const data = await response.json();
      setReviewData(data.data);
      setError(null);
    } catch (err) {
      setError('Kunne ikke laste anmeldelser. Prøv igjen senere.');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingReview && onReviewUpdate) {
      onReviewUpdate(editingReview.id, formData);
      setEditingReview(null);
    } else if (onReviewSubmit) {
      onReviewSubmit(formData);
    }
    
    setFormData({ rating: 5, title: '', comment: '' });
    setShowReviewForm(false);
    fetchReviews(); // Refresh reviews
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      rating: review.rating,
      title: review.title || '',
      comment: review.comment || ''
    });
    setShowReviewForm(true);
  };

  const handleDelete = async (reviewId: string) => {
    if (window.confirm('Er du sikker på at du vil slette denne anmeldelsen?')) {
      if (onReviewDelete) {
        onReviewDelete(reviewId);
        fetchReviews();
      }
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRate && onRate(star)}
            disabled={!interactive}
            className={`${interactive ? 'hover:scale-110 transition-transform cursor-pointer' : 'cursor-default'} ${
              star <= rating ? 'text-terracotta' : 'text-stone_light'
            }`}
          >
            {star <= rating ? (
              <HiStar className="w-5 h-5" />
            ) : (
              <HiOutlineStar className="w-5 h-5" />
            )}
          </button>
        ))}
      </div>
    );
  };

  const renderRatingDistribution = () => {
    if (!reviewData?.ratingDistribution.length) return null;

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const distribution = reviewData.ratingDistribution.find(d => d.rating === rating);
          const count = distribution?.count || 0;
          const percentage = distribution?.percentage || 0;
          
          return (
            <div key={rating} className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 w-12">
                <span>{rating}</span>
                <HiStar className="w-4 h-4 text-terracotta" />
              </div>
              <div className="flex-1 h-2 bg-stone_light rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sage transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-charcoal/60 w-12 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('no-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-stone_light organic-border p-6">
          <div className="h-6 bg-stone_light rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-4 bg-stone_light rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 organic-border p-6 ${className}`}>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchReviews}
          className="mt-3 btn-ghost text-sm"
        >
          Prøv igjen
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Review Summary */}
      <div className="bg-warm_white organic-border minimal-shadow p-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-light text-charcoal mb-2">
              {reviewData?.averageRating?.toFixed(1) || '0.0'}
            </div>
            {renderStars(Math.round(reviewData?.averageRating || 0))}
            <p className="text-sm text-charcoal/60 mt-2">
              {reviewData?.totalReviews || 0} anmeldelser
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="md:col-span-2">
            <h4 className="font-medium text-charcoal mb-4">Fordeling av vurderinger</h4>
            {renderRatingDistribution()}
          </div>
        </div>
      </div>

      {/* Write Review Section */}
      {!userReview && (
        <div className="bg-warm_white organic-border minimal-shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-charcoal">Skriv en anmeldelse</h3>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-ghost"
            >
              {showReviewForm ? 'Avbryt' : 'Anmeld produkt'}
            </button>
          </div>

          {showReviewForm && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Din vurdering *
                </label>
                {renderStars(formData.rating, true, (rating) => 
                  setFormData(prev => ({ ...prev, rating }))
                )}
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-charcoal mb-2">
                  Tittel (valgfritt)
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone_light organic-border focus:outline-none focus:ring-2 focus:ring-sage/50"
                  placeholder="Oppsummer din erfaring..."
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-charcoal mb-2">
                  Din anmeldelse (valgfritt)
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone_light organic-border focus:outline-none focus:ring-2 focus:ring-sage/50 resize-none"
                  placeholder="Del din erfaring med produktet..."
                  maxLength={500}
                />
                <div className="text-xs text-charcoal/50 mt-1">
                  {formData.comment.length}/500 tegn
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-sage text-white px-6 py-2 organic-border hover:bg-sage/90 transition-colors"
                >
                  {editingReview ? 'Oppdater anmeldelse' : 'Publiser anmeldelse'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewForm(false);
                    setEditingReview(null);
                    setFormData({ rating: 5, title: '', comment: '' });
                  }}
                  className="btn-ghost"
                >
                  Avbryt
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* User's Existing Review */}
      {userReview && (
        <div className="bg-sage/10 border border-sage/20 organic-border p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-medium text-charcoal">Din anmeldelse</h4>
              {renderStars(userReview.rating)}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(userReview)}
                className="p-2 text-sage hover:bg-sage/10 rounded-lg transition-colors"
                title="Rediger anmeldelse"
              >
                <HiPencilSquare className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(userReview.id)}
                className="p-2 text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                title="Slett anmeldelse"
              >
                <HiTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {userReview.title && (
            <h5 className="font-medium text-charcoal mb-2">{userReview.title}</h5>
          )}
          
          {userReview.comment && (
            <p className="text-charcoal/80 text-sm">{userReview.comment}</p>
          )}
          
          <p className="text-xs text-charcoal/60 mt-3">
            Publisert {formatDate(userReview.createdAt)}
            {userReview.isVerified && (
              <span className="inline-flex items-center gap-1 ml-2 text-sage">
                <HiCheckBadge className="w-4 h-4" />
                Bekreftet kjøp
              </span>
            )}
          </p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-charcoal">
            Anmeldelser ({reviewData?.totalReviews || 0})
          </h3>
          
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-stone_light organic-border text-sm focus:outline-none focus:ring-2 focus:ring-sage/50"
            >
              <option value="createdAt">Nyeste først</option>
              <option value="rating">Høyeste vurdering</option>
              <option value="rating-asc">Laveste vurdering</option>
            </select>
            
            <select
              value={filterRating || ''}
              onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
              className="px-3 py-2 border border-stone_light organic-border text-sm focus:outline-none focus:ring-2 focus:ring-sage/50"
            >
              <option value="">Alle vurderinger</option>
              <option value="5">5 stjerner</option>
              <option value="4">4 stjerner</option>
              <option value="3">3 stjerner</option>
              <option value="2">2 stjerner</option>
              <option value="1">1 stjerne</option>
            </select>
          </div>
        </div>

        {reviewData?.reviews?.length ? (
          <div className="space-y-6">
            {reviewData.reviews.map((review) => (
              <div key={review.id} className="bg-warm_white organic-border p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {renderStars(review.rating)}
                      {review.isVerified && (
                        <span className="inline-flex items-center gap-1 text-sage text-sm">
                          <HiCheckBadge className="w-4 h-4" />
                          Bekreftet kjøp
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-charcoal/60">
                      {review.user.name} • {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                
                {review.title && (
                  <h4 className="font-medium text-charcoal mb-2">{review.title}</h4>
                )}
                
                {review.comment && (
                  <p className="text-charcoal/80">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-warm_white organic-border">
            <p className="text-charcoal/60">Ingen anmeldelser ennå.</p>
            <p className="text-charcoal/60">Bli den første til å anmelde dette produktet!</p>
          </div>
        )}
      </div>
    </div>
  );
};