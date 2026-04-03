import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted!",
        description:
          "Your application has been successfully submitted. We'll contact you soon.",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate(`/job/${id}`)}
          className="mb-6 text-primary hover:text-primary hover:bg-primary/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Job Details
        </Button>

        <Card className="p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Apply for Position
          </h1>
          <p className="text-muted-foreground mb-8">
            Fill out the form below to submit your application
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" required placeholder="Enter your first name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" required placeholder="Enter your last name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required placeholder="your.email@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" required placeholder="+91 XXXXX XXXXX" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Current Location *</Label>
                <Input id="location" required placeholder="City, State" />
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Professional Information
              </h2>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input id="experience" type="number" required placeholder="Enter years of experience" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentRole">Current/Most Recent Role</Label>
                <Input id="currentRole" placeholder="Your current or last job title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/yourprofile" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio/Website</Label>
                <Input id="portfolio" type="url" placeholder="https://yourportfolio.com" />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Additional Information
              </h2>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter *</Label>
                <Textarea
                  id="coverLetter"
                  required
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accommodations">Accessibility Accommodations Needed</Label>
                <Textarea
                  id="accommodations"
                  placeholder="Please let us know if you require any specific accommodations during the interview process..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume">Resume/CV *</Label>
                <Input id="resume" type="file" required accept=".pdf,.doc,.docx" />
                <p className="text-sm text-muted-foreground">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/job/${id}`)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ApplyJob;
