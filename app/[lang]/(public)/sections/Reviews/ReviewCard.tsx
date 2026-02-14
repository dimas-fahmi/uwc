import { Quote } from "lucide-react";
import StarRating from "@/src/ui/components/ui/StarRating";

export interface Review {
  name: string;
  review: string;
  rating: number;
}

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="p-6 border rounded-2xl flex flex-col">
      <div className="p-6 space-y-4">
        <Quote size={16} />
        {/* Review */}
        <p className="text-sm font-light flex-1 flex items-center justify-center line-clamp-4">
          {review.review}
        </p>
        <Quote size={16} className="rotate-180 ms-auto" />
      </div>

      <div className="flex-1 flex flex-col justify-end">
        {/* Profile */}
        <h1 className="font-bold">{review.name}</h1>

        {/* Stars */}
        <StarRating min={review.rating} max={5} size={14} />
      </div>
    </div>
  );
};

export default ReviewCard;
