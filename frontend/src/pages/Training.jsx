import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Accessibility, 
  GraduationCap,
  Trophy,
  Star,
  Clock,
  PlayCircle,
  Award,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const Training = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to UX Design",
      level: "Beginner",
      duration: "6 weeks",
      lessons: 24,
      progress: 65,
      rating: 4.8,
      students: 1234,
      category: "Design",
      features: ["Captions", "Audio Lessons", "Interactive Exercises"]
    },
    {
      id: 2,
      title: "Data Analysis with Python",
      level: "Intermediate",
      duration: "8 weeks",
      lessons: 32,
      progress: 30,
      rating: 4.9,
      students: 2156,
      category: "Data Science",
      features: ["Screen Reader Optimized", "Code Examples", "Quizzes"]
    },
    {
      id: 3,
      title: "Digital Marketing Fundamentals",
      level: "Beginner",
      duration: "4 weeks",
      lessons: 16,
      progress: 0,
      rating: 4.7,
      students: 987,
      category: "Marketing",
      features: ["ASL Videos", "Interactive Projects", "Captions"]
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      level: "Beginner",
      duration: "12 weeks",
      lessons: 48,
      progress: 0,
      rating: 4.9,
      students: 3421,
      category: "Development",
      features: ["Audio Lessons", "Code Playground", "Mentorship"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
     

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20" variant="outline">
            <GraduationCap className="h-4 w-4 mr-2" />
            Build Skills, Earn Certificates
          </Badge>
          <h1 className="text-5xl font-bold mb-4">
            Your Learning Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Accessible courses designed for your success, with captions, audio lessons, and interactive exercises
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-2">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <PlayCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-1">3</p>
              <p className="text-muted-foreground">Courses In Progress</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <p className="text-3xl font-bold mb-1">5</p>
              <p className="text-muted-foreground">Certificates Earned</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <p className="text-3xl font-bold mb-1">1,240</p>
              <p className="text-muted-foreground">Points Earned</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-1">78%</p>
              <p className="text-muted-foreground">Avg. Completion</p>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Continue Learning</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {courses.filter(c => c.progress > 0).map((course) => (
              <Card key={course.id} className="border-2 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Badge className="mb-3" variant="outline">{course.category}</Badge>
                      <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-accent" />
                          {course.rating}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">Progress</span>
                          <span className="text-muted-foreground">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <Accessibility className="h-3 w-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Continue Course
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Courses Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Explore More Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="border-2 hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20" variant="outline">
                      {course.level}
                    </Badge>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <PlayCircle className="h-4 w-4" />
                      {course.lessons} lessons
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(course.rating)
                              ? "fill-current text-accent"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({course.students.toLocaleString()} students)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.features.slice(0, 2).map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        <Accessibility className="h-3 w-3 mr-1" />
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full" variant="outline">
                    {course.progress > 0 ? "Continue" : "Start Course"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="border-2 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-12 text-center">
              <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Ready to Level Up Your Skills?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of learners earning recognized certificates and landing their dream jobs
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8">
                Browse All Courses
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Training;
