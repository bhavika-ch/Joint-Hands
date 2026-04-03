import { useState } from "react";
import { Hero } from "../Requirements/Hero";
import { JobCard } from "../Requirements/JobCard";
import { FilterSidebar } from "../Requirements/FilterSidebar";
import { JobListing } from "../Requirements/JobListing";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const recommendedJobs = [
  {
    title: "Frontend Developer",
    company: "Tech Innovations",
    matchPercentage: 92,
    matchReason: "Matches your React and TypeScript skills",
    location: "Remote",
    jobType: "Full-time",
  },
  {
    title: "Accessibility Specialist",
    company: "Inclusive Web Co.",
    matchPercentage: 88,
    matchReason: "Your accessibility experience is a great fit",
    location: "New York, NY",
    jobType: "Full-time",
  },
];

const allJobsData = [
  {
    title: "Senior Frontend Developer",
    company: "TechAccess Inc.",
    matchPercentage: 95,
    description:
      "Join our inclusive team building accessible web applications. We provide full remote work setup and flexible scheduling.",
    accessibilityFeatures: ["🏠 Remote Work", "🕐 Flexible Hours"],
    location: "Remote",
    jobType: "Full-time",
  },
  {
    title: "UX Designer",
    company: "Inclusive Design Co.",
    matchPercentage: 88,
    description:
      "Create user experiences that work for everyone. Our office is fully accessible with quiet work zones.",
    accessibilityFeatures: [
      "♿ Wheelchair Accessible",
      "🔇 Quiet Workspace",
      "🕐 Flexible Hours",
    ],
    location: "New York, NY",
    jobType: "Part-time",
  },
  {
    title: "Customer Success Manager",
    company: "AccessFirst Corp",
    matchPercentage: 92,
    description:
      "Help our clients succeed while working on your schedule. Mix of remote and office work based on your preferences.",
    accessibilityFeatures: ["🏠 Remote Work", "🕐 Flexible Hours"],
    location: "Hybrid",
    jobType: "Full-time",
  },
  {
    title: "Backend Engineer",
    company: "CodeWorks Pvt. Ltd.",
    matchPercentage: 90,
    description:
      "We’re building scalable microservices using Node.js and MongoDB. Work remotely with flexible hours.",
    accessibilityFeatures: ["🏠 Remote Work"],
    location: "Remote",
    jobType: "Contract",
  },
];

const Index = () => {
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [filters, setFilters] = useState({ jobType: "", location: "" });

  // ✅ Handles filter change from sidebar
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // ✅ Filters job list based on filter selection
  const filteredJobs = allJobsData.filter((job) => {
    const matchesType =
      !filters.jobType || job.jobType === filters.jobType;
    const matchesLocation =
      !filters.location || job.location === filters.location;
    return matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Hero />

      {!showAllJobs ? (
        <section className="container mx-auto px-6 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3 flex justify-center items-center gap-3">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
              Recommended for You
            </h2>
            <p className="text-gray-500 text-lg">
              Based on your skills, here are the top jobs you might love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {recommendedJobs.map((job, index) => (
              <div
                key={index}
                className="transform transition-all duration-300 hover:-translate-y-2"
              >
                <JobCard {...job} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => setShowAllJobs(true)}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              View All Jobs
            </Button>
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-6 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
              {filteredJobs.length} Jobs Found
            </h2>
            <p className="text-gray-500 text-lg">
              Based on your filters and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* ✅ Filter Sidebar */}
            <aside className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-gray-200 sticky top-24 h-fit">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </aside>

            {/* ✅ Filtered Jobs List */}
            <main className="lg:col-span-3 space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <JobListing {...job} />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 text-lg py-10">
                  No jobs found matching your filters.
                </p>
              )}
            </main>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
