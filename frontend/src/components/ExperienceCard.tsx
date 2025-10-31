import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ExperienceCardProps {
  _id: string; // ✅ add this
  image: string;
  title: string;
  location: string;
  description: string;
  price: number;
}

const ExperienceCard = ({
  _id,
  image,
  title,
  location,
  description,
  price,
}: ExperienceCardProps) => {
  const navigate = useNavigate();

  // ✅ navigate using experience ID instead of passing full data
  const handleViewDetails = () => {
    navigate(`/details/${_id}`);
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-xs mx-auto">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title and Location */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <Badge variant="secondary" className="ml-2 flex-shrink-0">
            {location}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="text-2xl font-bold text-foreground">₹{price}</span>
          </div>
          <Button onClick={handleViewDetails} variant="default" size="default">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
