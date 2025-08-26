import { useState, useEffect } from 'react';

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

interface ReviewSubmission {
  rating: number;
  title: string;
  comment: string;
}

interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

interface ReviewStats {
  totalReviews: number;
  verifiedReviews: number;
  averageRating: number;
  ratingDistribution: RatingDistribution[];
}

export const useReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  // Fetch product reviews
  const fetchReviews = async (filters?: {
    rating?: number;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append('page', filters?.page?.toString() || '1');
      params.append('limit', filters?.limit?.toString() || '20');
      params.append('sortBy', filters?.sortBy || 'createdAt');
      params.append('sortOrder', filters?.sortOrder || 'desc');
      
      if (filters?.rating) {
        params.append('rating', filters.rating.toString());
      }

      const response = await fetch(
        `http://localhost:3001/api/reviews/product/${productId}?${params}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      setReviews(data.data.reviews || []);
      setReviewStats({
        totalReviews: data.data.totalReviews || 0,
        verifiedReviews: 0, // This would come from stats endpoint
        averageRating: data.data.averageRating || 0,
        ratingDistribution: data.data.ratingDistribution || []
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'En feil oppstod');
    } finally {
      setLoading(false);
    }
  };

  // Fetch review statistics
  const fetchReviewStats = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/reviews/product/${productId}/stats`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch review stats');
      }

      const data = await response.json();
      setReviewStats(data.data);
    } catch (err) {
      console.error('Error fetching review stats:', err);
    }
  };

  // Fetch user's review for this product
  const fetchUserReview = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/reviews/user?productId=${productId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        if (response.status !== 404) {
          throw new Error('Failed to fetch user review');
        }
        return;
      }

      const data = await response.json();
      if (data.data.reviews && data.data.reviews.length > 0) {
        setUserReview(data.data.reviews[0]);
      }
    } catch (err) {
      console.error('Error fetching user review:', err);
    }
  };

  // Submit a new review
  const submitReview = async (reviewData: ReviewSubmission): Promise<boolean> => {
    const token = getAuthToken();
    if (!token) {
      setError('Du må være logget inn for å skrive en anmeldelse');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3001/api/reviews/product/${productId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(reviewData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }

      const data = await response.json();
      setUserReview(data.data.review);
      
      // Refresh reviews and stats
      await Promise.all([fetchReviews(), fetchReviewStats()]);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'En feil oppstod ved innsending');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update existing review
  const updateReview = async (reviewId: string, reviewData: ReviewSubmission): Promise<boolean> => {
    const token = getAuthToken();
    if (!token) {
      setError('Du må være logget inn for å oppdatere anmeldelsen');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3001/api/reviews/${reviewId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(reviewData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update review');
      }

      const data = await response.json();
      setUserReview(data.data.review);
      
      // Refresh reviews and stats
      await Promise.all([fetchReviews(), fetchReviewStats()]);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'En feil oppstod ved oppdatering');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete review
  const deleteReview = async (reviewId: string): Promise<boolean> => {
    const token = getAuthToken();
    if (!token) {
      setError('Du må være logget inn for å slette anmeldelsen');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3001/api/reviews/${reviewId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete review');
      }

      setUserReview(null);
      
      // Refresh reviews and stats
      await Promise.all([fetchReviews(), fetchReviewStats()]);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'En feil oppstod ved sletting');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Initialize data on mount or productId change
  useEffect(() => {
    if (productId) {
      Promise.all([
        fetchReviews(),
        fetchReviewStats(),
        fetchUserReview()
      ]);
    }
  }, [productId]);

  return {
    reviews,
    userReview,
    reviewStats,
    loading,
    error,
    actions: {
      fetchReviews,
      submitReview,
      updateReview,
      deleteReview,
      refetchUserReview: fetchUserReview
    }
  };
};