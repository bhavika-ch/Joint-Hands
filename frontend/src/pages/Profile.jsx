import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  FileText,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Briefcase,
  Accessibility,
  BookOpen
} from "lucide-react";
import { currentContext } from "@/context/Current";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, getCurrentUser } = useContext(currentContext);

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getCurrentUser();
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setProfile(user);
      setUserRole(user.role || "");
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token"); // optional if using JWT cookies
      navigate("/");
      toast({
        title: "Logged out",
        description: "You’ve been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getInitials = () => {
    if (profile?.fullName) {
      return profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return profile?.email?.[0]?.toUpperCase() || "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
const navigationCards = [
  {
    title: "Resume Builder",
    description: "Create and manage your professional resume",
    icon: FileText,
    path: "/resume",
    gradient: "from-primary to-primary/60",
  },
  {
    title: "Interview Prep",
    description: "Practice with AI-powered interview questions",
    icon: MessageSquare,
    path: "/interview",
    gradient: "from-secondary to-secondary/60",
  },
  {
    title: "Community",
    description: "Connect with other job seekers and professionals",
    icon: Users,
    path: "/community",
    gradient: "from-accent to-accent/60",
  },
  {
    title: "Profile Settings",
    description: "Update your bio, education, experience and skills",
    icon: Settings,
    path: "/profile-settings",
    gradient: "from-primary/80 to-secondary/80",
  },
  {
    title: "Govt Schemes (PwD)",
    description: "Explore jobs, benefits, and government schemes for persons with disabilities",
    icon: Accessibility, // 👈 import from lucide-react
    path: "/govt-schemes",
    gradient: "from-green-400 to-emerald-600",
  },
 
];


  if (userRole === "recruiter") {
    navigationCards.unshift({
      title: "Recruiter Dashboard",
      description: "Manage job postings and applications",
      icon: Briefcase,
      path: "/recruiter",
      gradient: "from-primary to-accent",
    });
  } else {
    navigationCards.unshift({
      title: "Find Jobs",
      description: "Browse and apply to accessible job opportunities",
      icon: Briefcase,
      path: "/jobs",
      gradient: "from-primary to-accent",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* NAVBAR */}
    

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="shadow-elegant border-primary/10">
            <CardContent className="pt-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-3xl font-bold">{profile?.fullName || profile?.email}</h2>
                  <p className="text-muted-foreground mt-1">
                    {userRole === "recruiter" ? "Recruiter" : "Job Seeker"}
                  </p>
                  {profile?.location && (
                    <p className="text-sm text-muted-foreground mt-1">{profile.location}</p>
                  )}
                </div>
                {profile?.bio && (
                  <p className="text-muted-foreground max-w-2xl">{profile.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card
                  key={card.path}
                  className="group cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-primary/10 overflow-hidden"
                  onClick={() => navigate(card.path)}
                >
                  <div className={`h-2 bg-gradient-to-r ${card.gradient}`} />
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {card.title}
                    </CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
