import { useState } from "react";
import { CourseCard } from "./CourseCard";
import { courses } from "./coursest";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, HandMetal, Sparkles, Award } from "lucide-react";
import heroImage from "../assets/hero-learning.jpg";

const Coursesc1 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [...new Set(courses.map((c) => c.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ✅ HERO SECTION */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Learning Hero"
            className="w-full h-full object-cover brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 sm:px-10">
          <div className="max-w-3xl">
            <Badge className="mb-5 bg-blue-600/90 text-white backdrop-blur-md shadow-md text-sm sm:text-base py-1.5 px-3">
              <Sparkles className="h-4 w-4 mr-1" />
              AI-Powered Accessibility
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
              Learning Without <br /> Barriers
            </h1>

            <p className="text-xl sm:text-2xl mb-10 text-gray-100/90 leading-relaxed max-w-2xl">
              Experience immersive learning with real-time sign language, AI captions, and gesture
              control — designed for every learner.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="text-lg px-6 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
              >
                Browse Courses
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-6 py-5 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-transform hover:-translate-y-1"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ FEATURES SECTION */}
      <section className="py-20 border-b bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex items-start gap-4 bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="p-3 bg-blue-100 rounded-xl">
                <HandMetal className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">Sign Language Support</h3>
                <p className="text-base text-muted-foreground">
                  Real-time AI-powered sign language interpretation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Sparkles className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">Gesture Controls</h3>
                <p className="text-base text-muted-foreground">
                  Navigate and interact with content using hand gestures.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="p-3 bg-green-100 rounded-xl">
                <Award className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">Expert Instructors</h3>
                <p className="text-base text-muted-foreground">
                  Learn from real industry professionals with experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ COURSE LISTING SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Explore Courses</h2>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto md:mx-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 text-lg py-3 bg-white/70 backdrop-blur-md shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              className="text-base px-4 py-2"
              onClick={() => setSelectedCategory(null)}
            >
              All Courses
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="text-base px-4 py-2"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                No courses found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Coursesc1;
