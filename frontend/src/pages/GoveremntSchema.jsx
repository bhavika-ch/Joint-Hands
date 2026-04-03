import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, Briefcase } from "lucide-react";

const schemes = [
  {
    title: "Accessible India Campaign (Sugamya Bharat Abhiyan)",
    description: "A nationwide campaign for achieving universal accessibility for persons with disabilities.",
    benefits: ["Building accessibility", "Transport accessibility", "ICT ecosystem accessibility"],
    eligibility: "All persons with disabilities",
    link: "#",
  },
  {
    title: "Deendayal Disabled Rehabilitation Scheme (DDRS)",
    description: "Financial assistance for running and maintaining rehabilitation centers for persons with disabilities.",
    benefits: ["Free rehabilitation services", "Therapy and counseling", "Skill development"],
    eligibility: "Persons with disabilities registered at approved centers",
    link: "#",
  },
  {
    title: "ADIP Scheme (Assistance to Disabled Persons)",
    description: "Provides assistive devices and aids to persons with disabilities.",
    benefits: ["Hearing aids", "Wheelchairs", "Artificial limbs", "Visual aids"],
    eligibility: "Persons with disabilities with income below ₹15,000/month",
    link: "#",
  },
  {
    title: "National Fellowship for Students with Disabilities",
    description: "Financial support for higher education and research.",
    benefits: ["Fellowship amount up to ₹25,000/month", "Research grants", "Academic support"],
    eligibility: "Students with 40% or more disability pursuing M.Phil/Ph.D",
    link: "#",
  },
  {
    title: "National Handicapped Finance and Development Corporation (NHFDC)",
    description: "Concessional loans for self-employment and skill development.",
    benefits: ["Low-interest loans", "Business setup support", "Skill training"],
    eligibility: "Persons with disabilities for self-employment ventures",
    link: "#",
  },
];

const governmentJobs = [
  {
    title: "Disability Rights Officer",
    department: "Ministry of Social Justice & Empowerment",
    location: "New Delhi",
    reservation: "4% reservation for PWD",
    description: "Monitor implementation of disability rights and accessibility standards.",
    qualifications: "Graduate degree, preference for persons with disabilities",
  },
  {
    title: "Accessibility Consultant",
    department: "Department of Empowerment of Persons with Disabilities",
    location: "Multiple Cities",
    reservation: "Direct recruitment for PWD",
    description: "Assess and improve accessibility in government buildings and services.",
    qualifications: "Engineering degree or relevant certification in accessibility",
  },
  {
    title: "Special Educator",
    department: "National Institute for Empowerment of Persons with Disabilities",
    location: "Chennai",
    reservation: "4% reservation for PWD",
    description: "Develop and deliver training programs for persons with disabilities.",
    qualifications: "B.Ed in Special Education or equivalent",
  },
  {
    title: "Sign Language Interpreter",
    department: "Various Government Departments",
    location: "Pan India",
    reservation: "Direct recruitment for PWD",
    description: "Provide interpretation services for deaf and hard of hearing individuals.",
    qualifications: "Certification in Sign Language Interpretation",
  },
];

const GovernmentSchemes = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Government Schemes & Jobs for Persons with Disabilities
          </h1>
          <p className="text-lg opacity-90 max-w-3xl">
            Explore various government schemes, benefits, and job opportunities designed for persons with disabilities
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="schemes" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="schemes" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Schemes & Benefits
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Government Jobs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schemes" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Disability Welfare Schemes</h2>
              <p className="text-muted-foreground">
                Government of India schemes for empowerment and welfare of persons with disabilities
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {schemes.map((scheme, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3 mb-2">
                      <Building2 className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-xl mb-2">{scheme.title}</CardTitle>
                        <CardDescription>{scheme.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {scheme.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-primary">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Eligibility:</h4>
                      <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                    </div>
                    <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                      Learn More
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Disability-Related Government Jobs</h2>
              <p className="text-muted-foreground">
                Current openings in government departments focused on disability rights and welfare
              </p>
            </div>

            <div className="space-y-4">
              {governmentJobs.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {job.department}
                          </Badge>
                          <Badge variant="outline">{job.location}</Badge>
                        </div>
                        <div className="bg-accent/50 text-accent-foreground px-3 py-2 rounded-md inline-block mb-3">
                          <span className="font-semibold">🎯 {job.reservation}</span>
                        </div>
                        <CardDescription className="text-base">{job.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Qualifications Required:</h4>
                      <p className="text-sm text-muted-foreground">{job.qualifications}</p>
                    </div>
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                      Apply Now
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GovernmentSchemes;
