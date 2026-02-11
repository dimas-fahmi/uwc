import { type LucideProps, Star, StarHalf } from "lucide-react";
import type React from "react";
import { cn } from "@/src/ui/shadcn/lib/utils";

type StarRatingProps = {
  min: number;
  max: number;
} & LucideProps;

const StarRating: React.FC<StarRatingProps> = ({
  min,
  max,
  className,
  ...props
}) => {
  // Clamp min to max
  const rating = Math.min(min, max);
  const totalStars = max;

  // Calculate full and half stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const renderStar = (index: number) => {
    if (index < fullStars) {
      // Full star
      return (
        <Star
          key={index}
          size={24}
          {...props}
          className={cn("fill-primary text-primary", className)}
        />
      );
    } else if (index === fullStars && hasHalfStar) {
      // Half star
      return (
        <StarHalf
          key={index}
          size={24}
          {...props}
          className={cn("fill-primary text-primary", className)}
        />
      );
    } else {
      // Empty star
      return (
        <Star
          key={index}
          size={24}
          {...props}
          className={cn("text-foreground/10", className)}
        />
      );
    }
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: totalStars }, (_, index) => renderStar(index))}
    </div>
  );
};

export default StarRating;
