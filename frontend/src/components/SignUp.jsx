import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Accessibility, Briefcase, GraduationCap, Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AuthDataContext } from "@/context/AuthContext";
import axios from "axios";
import { currentContext } from "@/context/Current";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { serverUrl } = useContext(AuthDataContext);
  const { getCurrentUser, user } = useContext(currentContext);

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname === "/register" ? "signup" : "signin");

  useEffect(() => {
    setActiveTab(location.pathname === "/register" ? "signup" : "signin");
  }, [location.pathname]);

  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    role: "",
  });

  // 🔹 Register user
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Before axios.post in handleSignUp
      if (!signUpData.role) {
        toast({
          title: "Error",
          description: "Please select a role",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      console.log(signUpData);

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/register`, {
        fullName: signUpData.fullName,
        email: signUpData.email,
        password: signUpData.password,

        phoneNumber: signUpData.phoneNumber,
        role: signUpData.role,
      });

      navigate("/login");
      setActiveTab("signin");

      console.log(res);

      toast({ title: "Success!", description: res.data.message });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Login user
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/login`,
        {
          email: signInData.email,
          password: signInData.password,
          role: signInData.role,
        },
        { withCredentials: true } // only needed if backend uses cookies/session
      );

      console.log(res);

      toast({ title: "Welcome Back!", description: res.data.message });

      await getCurrentUser();

      navigate("/");

      console.log("user", user);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-none bg-white/95 backdrop-blur relative z-10">
        <CardHeader className="space-y-4 text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <Accessibility className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              JointHands
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Empowering careers through accessibility
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Sign In */}
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={signInData.email}
                    onChange={(e) =>
                      setSignInData({ ...signInData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={signInData.password}
                    onChange={(e) =>
                      setSignInData({ ...signInData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label>Role</Label>
                  <RadioGroup
                    value={signInData.role}
                    onValueChange={(value) =>
                      setSignInData({ ...signInData, role: value })
                    }
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="relative">
                      <RadioGroupItem
                        value="student"
                        id="student"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="student"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent cursor-pointer transition-all peer-data-[state=checked]:border-primary"
                      >
                        <Users className="mb-3 h-6 w-6" />
                        <span>Student</span>
                      </Label>
                    </div>
                    <div className="relative">
                      <RadioGroupItem
                        value="recruiter"
                        id="recruiter"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="recruiter"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent cursor-pointer transition-all peer-data-[state=checked]:border-primary"
                      >
                        <Briefcase className="mb-3 h-6 w-6" />
                        <span>Recruiter</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-3">
                  <Label>Role</Label>
                  <RadioGroup
                    value={signUpData.role}
                    onValueChange={(value) =>
                      setSignUpData({ ...signUpData, role: value })
                    }
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="relative">
                      <RadioGroupItem
                        value="student"
                        id="student-signup"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="student-signup"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent cursor-pointer transition-all peer-data-[state=checked]:border-primary"
                      >
                        <Users className="mb-3 h-6 w-6" />
                        <span>Student</span>
                      </Label>
                    </div>
                    <div className="relative">
                      <RadioGroupItem
                        value="recruiter"
                        id="recruiter-signup"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="recruiter-signup"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent cursor-pointer transition-all peer-data-[state=checked]:border-primary"
                      >
                        <Briefcase className="mb-3 h-6 w-6" />
                        <span>Recruiter</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={signUpData.fullName}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, fullName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    placeholder="9876543210"
                    value={signUpData.phoneNumber}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        phoneNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={signUpData.confirmPassword}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Training</span>
            </div>
            <div className="flex items-center gap-2">
              <Accessibility className="w-4 h-4" />
              <span>Support</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
