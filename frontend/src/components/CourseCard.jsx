import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, HandMetal, Captions } from "lucide-react";
import { Link } from "react-router-dom";

export const CourseCard = ({ course }) => {
  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <Card
      className="bg-gradient-to-br from-white/70 to-indigo-50/80 dark:from-gray-800 dark:to-gray-900 
      backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl 
      transition-all duration-500 overflow-hidden flex flex-col border border-border/30"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
        <img
          src={
            course.thumbnail ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0JCQCgLW6xVMjL1vPlX92VntjSUkFYbLY9g&s"
          }
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-gradient-to-r from-[#2563eb] to-[#4f46e5] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {course.level}
          </Badge>
        </div>

        {discount > 0 && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {discount}% OFF
          </Badge>
        )}
      </div>

      {/* Header */}
      <CardHeader className="pb-1 pt-5 px-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-xs font-semibold px-2 py-1 rounded-full">
            {course.category}
          </Badge>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{course.rating}</span>
          </div>
        </div>

        <h3 className="font-extrabold text-xl leading-snug line-clamp-2 hover:text-[#2563eb] transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground/80 line-clamp-2 mt-1">
          {course.description}
        </p>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-5 pb-3 flex-1">
        <div className="flex items-center gap-5 text-xs text-muted-foreground mt-3 mb-3">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          {course.hasSignLanguage && (
            <Badge
              variant="outline"
              className="text-xs border-[#2563eb] text-[#2563eb] flex items-center gap-1 bg-[#2563eb]/10"
            >
              <HandMetal className="h-3 w-3" />
              Sign Language
            </Badge>
          )}
          {course.hasCaptions && (
            <Badge
              variant="outline"
              className="text-xs border-[#4f46e5] text-[#4f46e5] flex items-center gap-1 bg-[#4f46e5]/10"
            >
              <Captions className="h-3 w-3" />
              Captions
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          By <span className="font-semibold text-foreground">{course.instructor}</span>
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between pt-3 px-5 pb-5 border-t border-border/30">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[#2563eb]">${course.price}</span>
          {course.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${course.originalPrice}
            </span>
          )}
        </div>

        <Link to={`/course/${course.id}`}>
          <Button
            size="sm"
            className="bg-gradient-to-r from-[#2563eb] to-[#4f46e5] text-white font-semibold rounded-lg 
              shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            View Course
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
