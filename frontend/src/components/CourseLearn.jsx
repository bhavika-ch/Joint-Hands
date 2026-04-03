import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourseById } from "./coursest";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SignLanguageDisplay } from "@/components/SignLanguageDisplay";
import { GestureDetector } from "@/components/GestureDetector";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Settings,
  HandMetal,
  Captions,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  X,
  Download, // ✅ added here
} from "lucide-react";

import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CourseLearn = () => {
  const { id } = useParams();
  const course = getCourseById(id || "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [signLanguageEnabled, setSignLanguageEnabled] = useState(true);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [gestureControlEnabled, setGestureControlEnabled] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
   const [showCertificate, setShowCertificate] = useState(false);
  const videoRef = useRef(null);
  const [videoTime, setVideoTime] = useState(0);

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

  const allLessons = course.curriculum.flatMap((section) => section.lessons);
  const currentLesson = allLessons[currentLessonIndex];

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const handleTimeUpdate = () => {
        setVideoTime(video.currentTime);
      };
      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        toast.info("Video paused");
      } else {
        videoRef.current
          .play()
          .catch((err) => {
            console.error("Play error:", err);
            toast.error("Could not play video");
          });
        toast.info("Video playing");
      }
    }
  };

    const handleDownloadCertificate = async () => {
    const certificate = document.getElementById("certificate");
    const canvas = await html2canvas(certificate, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("JointHands_Certificate.pdf");
    toast.success("Certificate downloaded successfully!");
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      toast.success("Next lesson loaded");
    } else {
      toast.info("This is the last lesson");
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      toast.success("Previous lesson loaded");
    } else {
      toast.info("This is the first lesson");
    }
  };

  const handleGesture = (gesture) => {
    console.log("Gesture detected:", gesture);

    if (gesture.includes("Play")) {
      if (!isPlaying && videoRef.current) {
        videoRef.current.play().catch((err) => console.error("Play error:", err));
      }
    } else if (gesture.includes("Pause")) {
      if (isPlaying && videoRef.current) {
        videoRef.current.pause();
      }
    } else if (gesture.includes("Next")) {
      handleNextLesson();
    } else if (gesture.includes("Previous")) {
      handlePreviousLesson();
    }
  };

  const sampleTranscript =
    "Welcome to this lesson. Today we'll be exploring the fundamental concepts that will help you build a strong foundation in this subject. Let's start by understanding the key principles...";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Link to={`/course/${id}`}>
          <Button variant="ghost" className="mb-4">
            ← Back to Course
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Video Player */}
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-contain"
                      onEnded={() => {
                        setIsPlaying(false);
                        toast.success("Lesson completed!");
                      }}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    >
                      <source
                        src="https://storage.coverr.co/videos/coverr-ui-designer-working-on-mobile-app-8076/preview"
                        type="video/mp4"
                      />
                      <source
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>

                    {!isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button
                          size="lg"
                          onClick={handlePlayPause}
                          className="rounded-full h-20 w-20 bg-primary hover:bg-primary/90 shadow-xl"
                        >
                          <Play className="h-10 w-10 ml-1" />
                        </Button>
                      </div>
                    )}

                    {gestureControlEnabled && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-secondary/90 text-secondary-foreground px-3 py-1 rounded-full text-xs flex items-center gap-2 backdrop-blur-sm">
                          <Sparkles className="h-3 w-3 animate-pulse" />
                          Gesture Control Active
                        </div>
                      </div>
                    )}

                    {/* Video progress bar */}
                    {isPlaying && videoRef.current && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${
                              (videoTime / (videoRef.current.duration || 1)) * 100
                            }%`,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Video Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePreviousLesson}
                      disabled={currentLessonIndex === 0}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handlePlayPause}>
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextLesson}
                      disabled={currentLessonIndex === allLessons.length - 1}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Captions */}
                  {captionsEnabled && (
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm p-4 rounded-lg border-2 border-primary/20 shadow-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Captions className="h-5 w-5 text-primary animate-pulse" />
                        <span className="text-sm font-bold text-foreground">Live Captions</span>
                      </div>
                      <div className="bg-background/80 rounded-lg p-3 border border-border/50">
                        <p className="text-base leading-relaxed font-medium text-foreground">
                          {sampleTranscript}
                        </p>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
                        Real-time speech recognition active
                      </div>
                    </div>
                  )}
                </div>

                {/* Sign Language Display */}
                <div className="h-full min-h-[400px]">
                  <SignLanguageDisplay
                    text={sampleTranscript}
                    isActive={signLanguageEnabled}
                  />
                </div>
              </div>

              {/* Lesson Info */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
                <p className="text-muted-foreground">Duration: {currentLesson.duration}</p>
              </div>

              {/* Accessibility Settings */}
              <Card className="p-4 bg-muted/30">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5" />
                  <h3 className="font-semibold">Accessibility Settings</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HandMetal className="h-4 w-4 text-secondary" />
                      <Label htmlFor="sign-language">Sign Language Interpretation</Label>
                    </div>
                    <Switch
                      id="sign-language"
                      checked={signLanguageEnabled}
                      onCheckedChange={setSignLanguageEnabled}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Captions className="h-4 w-4 text-info" />
                      <Label htmlFor="captions">Live Captions</Label>
                    </div>
                    <Switch
                      id="captions"
                      checked={captionsEnabled}
                      onCheckedChange={setCaptionsEnabled}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-accent" />
                      <Label htmlFor="gesture">Gesture Controls</Label>
                    </div>
                    <Switch
                      id="gesture"
                      checked={gestureControlEnabled}
                      onCheckedChange={setGestureControlEnabled}
                    />
                  </div>
                </div>
              </Card>
            </Card>
          </div>

          {/* Lesson List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <h3 className="font-semibold mb-4">Course Content</h3>
              <div className="space-y-4">
                {course.curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                      {section.section}
                    </h4>
                    <div className="space-y-1">
                      {section.lessons.map((lesson, lessonIndex) => {
                        const globalIndex = course.curriculum
                          .slice(0, sectionIndex)
                          .reduce((acc, s) => acc + s.lessons.length, 0) + lessonIndex;
                        const isActive = globalIndex === currentLessonIndex;

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setCurrentLessonIndex(globalIndex)}
                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                {lesson.isCompleted ? (
                                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-success" />
                                ) : (
                                  <div className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-current" />
                                )}
                                <span className="text-sm truncate">{lesson.title}</span>
                              </div>
                              <ChevronRight
                                className={`h-4 w-4 flex-shrink-0 ${
                                  isActive ? "opacity-100" : "opacity-0"
                                }`}
                              />
                            </div>
                            <p className="text-xs opacity-70 ml-6 mt-1">
                              {lesson.duration}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Gesture Detector */}
        <GestureDetector isEnabled={gestureControlEnabled} onGesture={handleGesture} />

        {/* Certificate Section */}
      {/* Certificate Section */}
<div className="mt-8 text-center">
  <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg border border-border/50">
    <h2 className="text-2xl font-bold mb-2 text-primary">Course Certificate</h2>
    <p className="text-muted-foreground mb-4">
      Complete all lessons to generate your personalized certificate of completion.
    </p>

    <div className="flex justify-center gap-4">
      <Button
        onClick={() => {
          toast.success("Certificate generated successfully!");
          setShowCertificate(true);
        }}
        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
      >
        🎓 Generate Certificate
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          import("jspdf").then(({ jsPDF }) => {
            const doc = new jsPDF();
            doc.setFontSize(22);
            doc.text("Certificate of Completion", 20, 30);
            doc.setFontSize(14);
            doc.text(
              `This is to certify that you have successfully completed the course:`,
              20,
              50
            );
            doc.setFont("helvetica", "bold");
            doc.text(`${course.title}`, 20, 65);
            doc.setFont("helvetica", "normal");
            doc.text(
              "We appreciate your dedication and learning spirit!",
              20,
              85
            );
            doc.text("Issued by: Joint Hands Learning Platform", 20, 105);
            doc.save(`${course.title}_Certificate.pdf`);
            toast.success("Certificate downloaded!");
          });
        }}
      >
        ⬇️ Download Certificate
      </Button>
    </div>
  </Card>

  {/* --- Certificate Modal --- */}
  {showCertificate && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl relative max-w-4xl w-full">
        <button
          onClick={() => setShowCertificate(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Realistic Certificate Design */}
        <div
          id="certificate"
          className="relative border-[12px] border-yellow-500 bg-gradient-to-br from-white via-yellow-50 to-yellow-100 text-center p-12 rounded-2xl shadow-inner"
        >
          <div className="absolute inset-0 border-[4px] border-yellow-700 rounded-2xl pointer-events-none"></div>

          {/* Company Branding */}
          <div className="absolute top-8 left-0 right-0 flex justify-center items-center gap-3">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">
              JOINT HANDS
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-2 mt-20 text-gray-800">
            Certificate of Achievement
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full"></div>

          <p className="text-lg text-gray-700 mb-6">This is proudly presented to</p>
          <h1 className="text-3xl font-extrabold text-primary mb-6">
            Priyanshu Kumar
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            For successfully completing the course
          </p>
          <h2 className="text-2xl font-semibold mb-4 italic">{course.title}</h2>
          <p className="text-gray-600 mb-6">
            With outstanding dedication and excellence in learning.
          </p>

          {/* Signatures and Date */}
          <div className="mt-10 flex justify-between px-12 items-center">
            <div>
              <p className="font-semibold text-gray-700">___________________</p>
              <p className="text-sm text-gray-600">Instructor</p>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                JOINT HANDS
              </div>
              <p className="text-sm text-gray-600 font-medium">
                Empowering Inclusive Learning
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">___________________</p>
              <p className="text-sm text-gray-600">Date</p>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <Button
            onClick={handleDownloadCertificate}
            className="bg-green-600 hover:bg-green-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={() => setShowCertificate(false)}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default CourseLearn;
