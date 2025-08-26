import React from 'react';
import { 
  HiStar, 
  HiOutlineStar,
  HiCheckBadge,
  HiPencilSquare,
  HiTrash
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

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
  showActions?: boolean;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  currentUserId,
  onEdit,
  onDelete,
  showActions = false,
  className = ''
}) => {
  const isOwner = currentUserId === review.user.id;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className={star <= rating ? 'text-terracotta' : 'text-stone_light'}>
            {star <= rating ? (
              <HiStar className="w-4 h-4" />
            ) : (
              <HiOutlineStar className="w-4 h-4" />
            )}
          </div>
        ))}
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

  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'i går';
    if (diffDays < 7) return `${diffDays} dager siden`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} uker siden`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} måneder siden`;
    return `${Math.ceil(diffDays / 365)} år siden`;
  };

  const handleEdit = () => {
    if (onEdit && isOwner) {
      onEdit(review);
    }
  };

  const handleDelete = () => {
    if (onDelete && isOwner) {
      if (window.confirm('Er du sikker på at du vil slette denne anmeldelsen?')) {
        onDelete(review.id);
      }
    }
  };

  return (
    <div className={`bg-warm_white organic-border minimal-shadow p-6 hover:shadow-md transition-shadow duration-300 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {renderStars(review.rating)}
            {review.isVerified && (
              <span className="inline-flex items-center gap-1 text-sage text-sm">
                <HiCheckBadge className="w-4 h-4" />
                <span className="text-xs">Bekreftet kjøp</span>
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-charcoal/60">
            <span className="font-medium">{review.user.name}</span>
            <span>•</span>
            <span title={formatDate(review.createdAt)}>
              {formatRelativeDate(review.createdAt)}
            </span>
            {review.updatedAt !== review.createdAt && (
              <>
                <span>•</span>
                <span className="text-xs" title={`Oppdatert ${formatDate(review.updatedAt)}`}>
                  oppdatert
                </span>
              </>
            )}
          </div>
        </div>

        {/* Action buttons */}
        {showActions && isOwner && (onEdit || onDelete) && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={handleEdit}
                className="p-2 text-sage hover:bg-sage/10 rounded-lg transition-colors duration-200"
                title="Rediger anmeldelse"
                aria-label="Rediger anmeldelse"
              >
                <HiPencilSquare className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="p-2 text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors duration-200"
                title="Slett anmeldelse"
                aria-label="Slett anmeldelse"
              >
                <HiTrash className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Review Title */}
      {review.title && (
        <h4 className="font-medium text-charcoal mb-3 text-lg leading-snug">
          {review.title}
        </h4>
      )}

      {/* Review Comment */}
      {review.comment && (
        <div className="text-charcoal/80 leading-relaxed">
          <p className="whitespace-pre-wrap">{review.comment}</p>
        </div>
      )}

      {/* User indicator for own review */}
      {isOwner && !showActions && (
        <div className="mt-4 pt-4 border-t border-stone_light">
          <div className="flex items-center gap-2 text-sm text-sage">
            <HiCheckBadge className="w-4 h-4" />
            <span>Din anmeldelse</span>
          </div>
        </div>
      )}
    </div>
  );
};