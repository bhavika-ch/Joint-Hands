import { useParams, Link, useNavigate } from "react-router-dom";
import { getCourseById } from "./coursest";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CourseCard } from "./CourseCard";
import {
  Star,
  Users,
  Clock,
  Award,
  CheckCircle2,
  PlayCircle,
  HandMetal,
  Captions,
  Sparkles,
  ShoppingCart,
} from "lucide-react";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(id || "");

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link to="/">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    toast.success("Redirecting to checkout...");
    setTimeout(() => {
      navigate(`/course/${course.id}/learn`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2563eb] to-[#4f46e5] text-white">
        <div className="container mx-auto px-4 py-12">
          <Link to="/">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:bg-white/10"
            >
              ← Back to Courses
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side */}
            <div className="lg:col-span-2">
              <Badge className="mb-3 bg-white/20 text-white font-medium">
                {course.category}
              </Badge>

              <h1 className="text-4xl font-extrabold mb-4">{course.title}</h1>
              <p className="text-lg mb-6 text-white/90">
                {course.longDescription}
              </p>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-white/70">rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">
                    {course.students.toLocaleString()}
                  </span>
                  <span className="text-white/70">students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full bg-white/20"
                />
                <div>
                  <p className="font-semibold">
                    Created by {course.instructor}
                  </p>
                  <p className="text-sm text-white/80">Expert Instructor</p>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 border-none shadow-xl">
                <CardContent className="p-6">
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-bold text-[#2563eb]">
                      ${course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={handleEnroll}
                    className="w-full mb-3 bg-gradient-to-r from-[#2563eb] to-[#4f46e5] text-white hover:shadow-lg transition-all"
                    size="lg"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Enroll Now
                  </Button>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{course.lessons} lessons included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HandMetal className="h-4 w-4 text-blue-500" />
                      <span>Sign language support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Captions className="h-4 w-4 text-indigo-500" />
                      <span>Live captions available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      <span>Gesture controls enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#2563eb]" />
                    What You'll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {(course.whatYouWillLearn || []).map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Curriculum */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-[#2563eb]" />
                    Course Curriculum
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(course.curriculum || []).map((section, index) => (
                    <div key={index}>
                      <h3 className="font-semibold mb-3">{section.section}</h3>
                      <div className="space-y-2">
                        {(section.lessons || []).map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                      {index < course.curriculum.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(course.requirements || []).map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#2563eb] mt-2" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Instructor */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Your Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                      alt={course.instructor}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{course.instructor}</h3>
                      <p className="text-sm text-muted-foreground">
                        Expert Instructor
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Professional educator with years of experience in{" "}
                    {course.category.toLowerCase()} and a passion for accessible
                    education.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Courses */}
          {(course.relatedCourses || []).length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {course.relatedCourses.map((relatedCourse) => (
                  <CourseCard key={relatedCourse.id} course={relatedCourse} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
