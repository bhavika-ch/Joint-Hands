import { MapPin, Briefcase, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const JobCard = ({
  title,
  company,
  matchPercentage,
  matchReason,
  location,
  jobType,
  variant = "compact",
}) => {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow border-l-4 border-l-primary/30">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground">{company}</p>
        </div>
        <Badge
          variant="outline"
          className="bg-success/10 text-success border-success/30 flex items-center gap-1"
        >
          <TrendingUp className="w-3 h-3" />
          {matchPercentage}%
        </Badge>
      </div>

      {matchReason && variant === "compact" && (
        <p className="text-sm text-muted-foreground italic mb-3 flex items-center gap-2">
          💡 {matchReason}
        </p>
      )}

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {location}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          {jobType}
        </span>
      </div>

      <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5">
        View →
      </Button>
    </Card>
  );
};
