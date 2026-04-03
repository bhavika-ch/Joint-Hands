import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Accessibility,
  Users,
  MessageCircle,
  Calendar,
  Heart,
  Share2,
  UserPlus,
  Video,
  BookOpen,
  Sparkles,
} from "lucide-react";
import VoicePost from "./VoicePost";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Alex Thompson",
      avatar: "AT",
      role: "Software Developer",
      time: "2 hours ago",
      content:
        "Just landed my dream job as a frontend developer! Thank you to this amazing community and especially my mentor Maria for all the guidance. The accessible interview prep tools made all the difference. 🎉",
      likes: 124,
      comments: 23,
      tags: ["Success Story", "Frontend"],
    },
    {
      id: 2,
      author: "Jordan Lee",
      avatar: "JL",
      role: "Product Manager",
      time: "5 hours ago",
      content:
        "Looking for advice on negotiating workplace accommodations during the offer stage. Any tips from those who've been through this?",
      likes: 45,
      comments: 18,
      tags: ["Advice Needed", "Accommodations"],
    },
    {
      id: 3,
      author: "Sam Williams",
      avatar: "SW",
      role: "UX Researcher",
      time: "1 day ago",
      content:
        "Hosting a live session tomorrow on 'Remote Work Best Practices for Accessible Teams'. Join me at 2 PM EST! Link in comments.",
      likes: 89,
      comments: 31,
      tags: ["Workshop", "Remote Work"],
    },
  ]);

  const handleNewPost = (content) => {
    const newPost = {
      id: posts.length + 1,
      author: "You",
      avatar: "YOU",
      role: "Community Member",
      time: "Just now",
      content,
      likes: 0,
      comments: 0,
      tags: ["New Post"],
    };
    setPosts([newPost, ...posts]);
  };

  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior UX Designer",
      expertise: ["UX Design", "Accessibility", "Career Coaching"],
      sessions: 47,
      rating: 4.9,
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Scientist",
      expertise: ["Data Analysis", "Python", "Machine Learning"],
      sessions: 62,
      rating: 5.0,
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      expertise: ["Digital Marketing", "Content Strategy", "SEO"],
      sessions: 38,
      rating: 4.8,
      avatar: "ER",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Resume Building Workshop",
      date: "Mar 15, 2025",
      time: "3:00 PM EST",
      host: "Career Coach Team",
      attendees: 45,
      type: "Workshop",
    },
    {
      id: 2,
      title: "Mock Interview Session",
      date: "Mar 18, 2025",
      time: "2:00 PM EST",
      host: "Senior Mentors",
      attendees: 23,
      type: "Practice",
    },
    {
      id: 3,
      title: "Accessibility in Tech Panel",
      date: "Mar 22, 2025",
      time: "4:00 PM EST",
      host: "Industry Leaders",
      attendees: 156,
      type: "Panel Discussion",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge
            className="mb-5 px-4 py-1.5 bg-primary/10 text-primary border-primary/20"
            variant="outline"
          >
            <Users className="h-4 w-4 mr-2" />
            Connect, Learn & Grow Together
          </Badge>
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Community & Mentorship
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join a supportive space to share experiences, find mentors, and
            learn with peers who celebrate your unique abilities.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Posts */}
          <div className="lg:col-span-2 space-y-6">
            <VoicePost onPost={handleNewPost} />

            {posts.map((post) => (
              <Card
                key={post.id}
                className="border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12 shadow-sm">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-semibold">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {post.author}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {post.role} • {post.time}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-primary/10"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-foreground mb-4 leading-relaxed text-[15px]">
                        {post.content}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <button className="flex items-center gap-2 hover:text-primary transition-colors">
                          <Heart className="h-5 w-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-primary transition-colors">
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right - Sidebar */}
          <div className="space-y-6">
            {/* Mentors */}
            <Card className="border sticky top-24 rounded-2xl shadow-sm hover:shadow-md transition">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Featured Mentors
                </h2>
                <div className="space-y-5">
                  {mentors.map((mentor) => (
                    <div
                      key={mentor.id}
                      className="border-b last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-secondary/10 text-secondary font-medium">
                            {mentor.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[15px] truncate">
                            {mentor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {mentor.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {mentor.expertise.map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{mentor.sessions} sessions</span>
                        <span className="flex items-center gap-1">
                          <span className="text-accent">★</span> {mentor.rating}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full hover:bg-primary/10"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Events */}
            <Card className="border rounded-2xl shadow-sm hover:shadow-md transition">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Events
                </h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-b last:border-0 pb-4 last:pb-0"
                    >
                      <Badge className="mb-2 text-xs" variant="outline">
                        {event.type}
                      </Badge>
                      <h3 className="font-semibold mb-1 text-[15px]">
                        {event.title}
                      </h3>
                      <div className="text-sm text-muted-foreground space-y-1 mb-3">
                        <p className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {event.date} at {event.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {event.attendees} attending
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full hover:bg-primary/10"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Register
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <Card className="border-2 rounded-3xl bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 text-secondary mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Your Success is Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect with mentors, attend workshops, and grow in a community
                that empowers and celebrates you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  onClick={() => navigate("/mentor")}
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Find a Mentor
                </Button>

                <Button size="lg" variant="outline">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Workshops
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
