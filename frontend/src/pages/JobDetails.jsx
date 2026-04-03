import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Users,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = {
    id,
    title: "Accessibility Coordinator",
    company: "TechCorp Solutions",
    location: "Mumbai, Maharashtra",
    jobType: "Full-time",
    salary: "₹6-8 LPA",
    posted: "Posted 3 days ago",
    applicants: "23 applicants",
    matchPercentage: 95,
    description:
      "We are seeking a passionate Accessibility Coordinator to join our team and help make our products accessible to everyone. You will work closely with product, design, and engineering teams to ensure our digital products meet WCAG standards.",
    requirements: [
      "Bachelor's degree in relevant field or equivalent experience",
      "2+ years experience in accessibility coordination or related role",
      "Strong understanding of WCAG 2.1 guidelines",
      "Experience with screen readers and assistive technologies",
      "Excellent communication and documentation skills",
      "Knowledge of accessible design principles",
    ],
    responsibilities: [
      "Conduct accessibility audits of digital products",
      "Collaborate with design and development teams",
      "Create accessibility documentation and guidelines",
      "Train team members on accessibility best practices",
      "Test products with assistive technologies",
      "Ensure compliance with accessibility standards",
    ],
    benefits: [
      "Health insurance with disability coverage",
      "Flexible work hours",
      "Remote work options (3 days/week)",
      "Professional development budget",
      "Accessible office environment",
      "Mental health support",
      "Paid parental leave",
    ],
    accessibilityFeatures: [
      "Remote Work Available",
      "Wheelchair Accessible Office",
      "Flexible Hours",
      "On-site Support",
      "Assistive Technology Provided",
    ],
    companyInfo:
      "TechCorp Solutions is a leading technology company committed to building inclusive products. We have a diverse team and provide comprehensive support for employees with disabilities.",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-primary hover:text-primary hover:bg-primary/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>

        <Card className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{job.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">{job.company}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {job.jobType}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {job.posted}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {job.applicants}
                </span>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-success/10 text-success border-success/30 text-lg px-4 py-2"
            >
              {job.matchPercentage}% Match
            </Badge>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Accessibility Features
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.accessibilityFeatures.map((feature, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-accent/10 text-accent"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              About this Role
            </h2>
            <p className="text-muted-foreground leading-relaxed">{job.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Key Responsibilities
            </h2>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Benefits & Perks
            </h2>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              About {job.company}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{job.companyInfo}</p>
          </div>

          <Separator className="my-6" />

          <div className="flex justify-center">
            <Button
              size="lg"
              className="w-full md:w-auto px-12"
              onClick={() => navigate(`/apply/${id}`)}
            >
              Apply for this Position
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JobDetails;
