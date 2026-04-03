import { MapPin, Briefcase, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const JobListing = ({
  id = "1",
  title,
  company,
  matchPercentage,
  description,
  accessibilityFeatures,
  location,
  jobType,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-lg text-muted-foreground">{company}</p>
        </div>
        <Badge
          variant="outline"
          className="bg-success/10 text-success border-success/30 flex items-center gap-1 text-base px-3 py-1"
        >
          <TrendingUp className="w-4 h-4" />
          {matchPercentage}% Match
        </Badge>
      </div>

      <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {accessibilityFeatures.map((feature, index) => (
          <Badge key={index} className="bg-accent text-accent-foreground">
            {feature}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {jobType}
          </span>
        </div>

        {/* ✅ Navigate to Job Details page */}
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => navigate(`/job/${id}`)}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};
