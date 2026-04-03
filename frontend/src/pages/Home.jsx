import React from 'react'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accessibility,
  Briefcase,
  GraduationCap,
  Users,
  Shield,
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans scroll-smooth">

      {/* HERO SECTION */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 blur-[120px]" />
        <div className="container mx-auto px-6 relative text-center">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 text-base px-4 py-1" variant="outline">
            <Sparkles className="h-4 w-4 mr-2" />
            Empowering Abilities, Creating Opportunities
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            Your Career Journey,{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Fully Accessible
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            The first comprehensive job platform designed for people with disabilities. 
            Find inclusive employers, build skills, and connect with a supportive community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-200 shadow-md">
                <Search className="mr-2 h-5 w-5" />
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/community">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-accent/10 transition-all duration-200">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
     {/* WHY DIFFERENT */}
<section className="py-24 bg-muted/30">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Why JointHands is Different</h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        We go beyond traditional job boards to create a complete career ecosystem.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          icon: <Accessibility className="h-8 w-8 text-primary" />,
          title: "Accessibility First",
          desc: "Voice navigation, screen reader optimization, customizable UI, and sign language support built in from day one."
        },
        {
          icon: <Briefcase className="h-8 w-8 text-secondary" />,
          title: "Smart Job Matching",
          desc: "AI-powered matching considers your skills AND accommodation needs. Filter by remote work, flexible hours, and workplace accessibility."
        },
        {
          icon: <GraduationCap className="h-8 w-8 text-accent" />,
          title: "Skill Building",
          desc: "Personalized learning paths with captions, audio lessons, and interactive exercises. Earn certificates employers recognize."
        },
        {
          icon: <Users className="h-8 w-8 text-primary" />,
          title: "Community & Mentorship",
          desc: "Connect with peers and mentors for guidance, live sessions, and career advice from those who understand your journey."
        },
        {
          icon: <Shield className="h-8 w-8 text-secondary" />,
          title: "Safe & Verified",
          desc: "All employers verified. Anonymous profiles. Advanced scam detection to protect against discrimination."
        },
        {
          icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
          title: "Complete Support",
          desc: "Mock interviews, resume workshops, transport suggestions, and assistive tech recommendations all in one place."
        }
      ].map((feature, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="relative p-10 text-center z-10">
            <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-base">{feature.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* FEATURED JOBS */}
<section className="py-24">
  <div className="w-full px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Accessible Jobs</h2>
      <p className="text-lg md:text-xl text-muted-foreground">
        Opportunities from verified inclusive employers
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {[
        { role: "UX Designer", company: "TechCorp Inc.", type: "Remote", tags: ["Wheelchair Access", "Flexible Hours"], location: "San Francisco, CA" },
        { role: "Data Analyst", company: "Analytics Co.", type: "Remote", tags: ["Screen Reader Optimized", "Part-Time Available"], location: "New York, NY" },
        { role: "Content Writer", company: "Creative Studio", type: "Hybrid", tags: ["ASL Support", "Flexible Schedule"], location: "Austin, TX" }
      ].map((job, i) => (
        <Card
          key={i}
          className="group relative rounded-2xl border border-transparent bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
          <CardContent className="relative p-8 z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-xl mb-1">{job.role}</h3>
                <p className="text-muted-foreground">{job.company}</p>
              </div>
              <Badge className="bg-success/10 text-success hover:bg-success/20 px-3 py-1 rounded-full text-sm">
                {job.type}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((tag, t) => (
                <Badge key={t} variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
            <Button
              className="w-full text-base py-5 bg-gradient-to-r from-primary to-secondary hover:scale-[1.03] transition-all duration-200 shadow-md"
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="text-center mt-12">
      <Button
        size="lg"
        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all duration-200 shadow-lg px-10 py-6"
        onClick={() => navigate("/jobs")}
      >
        View All Jobs
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  </div>
</section>


      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Start Your Career Journey?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of professionals with disabilities finding meaningful work with inclusive employers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover:scale-105 transition-all duration-200">
              Create Free Account
            </Button>
           <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white/10"> For Employers </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
