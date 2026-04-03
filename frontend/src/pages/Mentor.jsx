import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Star,
  UserPlus,
  Clock,
  Check,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import MentorDetailDialog from "./MentorDetailDialog";

const Mentor = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentorDialogOpen, setMentorDialogOpen] = useState(false);
  const [sentRequests, setSentRequests] = useState([]);
  const [sessions, setSessions] = useState({});
  const [sessionOpen, setSessionOpen] = useState(false);
  const [sessionDetails, setSessionDetails] = useState({ date: "", time: "" });
  const [activeMentor, setActiveMentor] = useState(null);


//   https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZmfkcToScxKwFRn5ftL148v9aQEGIqVd7llvpmigzKmUpmUNgMGE4Z8XBaj_67WB-e1sIW7FlsMFS0fFqmNIEj3xQw8UGOaTcdTLHgg&s=10

 const mentors = [
  {
    id: 1,
    name: "Srikanth Bolla",
    role: "Entrepreneur & Social Innovator",
    country: "India",
    rating: 4.9,
    sessions: 130,
    avatar: "SB",
    image:
      "https://static.toiimg.com/thumb/msid-119105750,width-400,resizemode-4/119105750.jpg",
    summary:
      "Born visually impaired, Srikanth Bolla overcame challenges to study at MIT and founded Bollant Industries. He’s empowering people with disabilities through eco-friendly innovation.",
    tags: ["Entrepreneurship", "Innovation", "Inclusion", "Leadership"],
    disability:
      "Born visually impaired in India, Srikanth faced discrimination when denied admission to the science stream. Instead of giving up, he moved to the US, studied at MIT, and returned to India to prove that people with disabilities can lead and create impactful businesses.",
    impact:
      "Founder of Bollant Industries — a company employing hundreds of differently-abled individuals to produce sustainable packaging. He champions inclusive entrepreneurship across India.",
    expertise: ["Leadership", "Innovation", "Sustainability", "Social Impact"],
    helpWith: [
      "Building confidence in leadership roles",
      "Starting social enterprises",
      "Overcoming workplace bias",
      "Finding purpose-driven career paths",
    ],
  },
 {
  id: 2,
  name: "Sudha Chandran",
  role: "Bharatanatyam Dancer & Actress",
  country: "India",
  rating: 4.8,
  sessions: 120,
  avatar: "SC",
  image: "https://in.bmscdn.com/iedb/artist/images/website/poster/large/sudha-chandran-5683-24-03-2017-12-52-17.jpg",
summary:
  "An acclaimed Bharatanatyam dancer and actress who turned personal tragedy into a story of unshakable determination and triumph. After losing her right leg at just 16, she rebuilt her identity with grace, courage, and the iconic ‘Jaipur Foot.’ Her incredible comeback not only revived her dance career but also redefined perseverance, inspiring millions to rise above adversity and chase their dreams without limits.",

  tags: ["Performing Arts", "Motivation", "Resilience"],
  disability:
    "Sudha lost her right leg in a car accident at the age of 16. With immense courage and a prosthetic ‘Jaipur Foot’, she returned to dancing and became a national inspiration.",
  impact:
    "Her comeback performance inspired millions and led to the award-winning Telugu film *Mayuri*, based on her life. She continues to empower artists with disabilities and promote inclusive art and storytelling.",
  expertise: ["Dance", "Acting", "Motivational Speaking"],
  helpWith: [
    "Finding strength after personal loss",
    "Building artistic and emotional resilience",
    "Balancing career and mental well-being",
  ],
},

  {
    id: 3,
    name: "Deepa Malik",
    role: "Paralympic Medalist & Motivational Speaker",
    country: "India",
    rating: 5.0,
    sessions: 110,
    avatar: "DM",
    image: "https://www.paralympic.org/sites/default/files/2020-05/Deepa%20Malik.jpg",
    summary:
      "Paralyzed from the chest down at the age of 30, Deepa Malik defied all odds to become India’s first female Paralympic medalist. Her journey from rehabilitation to the international sports stage is a story of courage and resilience. Through her foundation, Wheeling Happiness, she advocates for accessibility, adaptive sports, and women empowerment. Deepa continues to inspire millions by proving that true strength lies in the power of will",
    tags: ["Sports", "Leadership", "Women Empowerment"],
    disability:
      "Paralyzed below the chest due to a spinal tumor at the age of 30, Deepa Malik defied all odds and rebuilt her life through sports. Her journey is one of relentless courage, motherhood, and ambition that challenged social norms and physical barriers alike.",
    impact:
      "She became the first Indian woman to win a medal at the Paralympics (Rio 2016). Deepa has also received the Padma Shri and Arjuna Award for her contribution to Indian sports and the inclusion of persons with disabilities.",
    expertise: [
      "Paralympic Sports",
      "Motivational Speaking",
      "Disability Rights Advocacy",
      "Resilience & Mindset Building",
    ],
    helpWith: [
      "Developing a winning mindset",
      "Breaking gender and physical barriers",
      "Pursuing sports and fitness with disabilities",
      "Balancing personal life and ambition",
    ],
  },
];


  const handleMentorClick = (mentor) => {
    setSelectedMentor(mentor);
    setMentorDialogOpen(true);
  };

  const handleRequestSend = (mentorId) => {
    if (!sentRequests.includes(mentorId)) {
      setSentRequests((prev) => [...prev, mentorId]);
    }
  };

  const handleSessionOpen = (mentor) => {
    setActiveMentor(mentor);
    setSessionOpen(true);
  };

  const handleConfirmSession = () => {
    if (!sessionDetails.date || !sessionDetails.time) return;
    setSessions((prev) => ({
      ...prev,
      [activeMentor.id]: sessionDetails,
    }));
    setSessionOpen(false);
    setSessionDetails({ date: "", time: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-white py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <Sparkles className="h-4 w-4 mr-2" /> Meet Our Mentors
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Empowering Through Experience
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Connect with world-renowned mentors who have turned challenges into achievements.
          </p>
        </div>

        {/* Mentor Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => {
            const isRequestSent = sentRequests.includes(mentor.id);
            return (
              <Card
                key={mentor.id}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden rounded-t-3xl">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <div className="p-6 text-center space-y-3">
                  <Avatar className="h-20 w-20 mx-auto -mt-14 border-4 border-white shadow-lg">
                    <AvatarImage src={mentor.image} />
                    <AvatarFallback className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-lg font-bold">
                      {mentor.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-xl font-semibold text-gray-800">{mentor.name}</h3>
                  <p className="text-sm text-gray-500">{mentor.role}</p>
                  <Badge variant="outline" className="text-gray-600 text-xs">
                    {mentor.country}
                  </Badge>

                  {/* <p className="text-sm text-gray-600 italic leading-relaxed">
                    “{mentor.summary}”
                  </p> */}

                    <p className="text-gray-700 leading-relaxed text-sm">
                {mentor.summary
                  ? mentor.summary.length > 200
                    ? mentor.summary.slice(0, 180) + "..."
                    : mentor.summary
                  : "This mentor has inspired countless people through resilience and dedication."}
              </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {mentor.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Rating + Sessions */}
                  <div className="flex justify-center gap-2 items-center text-gray-600 text-sm mt-3">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="font-semibold">{mentor.rating}</span>
                    <span>•</span>
                    <span>{mentor.sessions} Sessions</span>
                  </div>

                  {/* View Profile */}
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white rounded-full py-2"
                    onClick={() => handleMentorClick(mentor)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
                    <Button
                      onClick={() => handleRequestSend(mentor.id)}
                      disabled={isRequestSent}
                      className={`flex items-center justify-center gap-2 rounded-full px-5 py-2 w-full sm:w-auto ${
                        isRequestSent
                          ? "bg-green-100 text-green-700 border border-green-400"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      }`}
                    >
                      {isRequestSent ? (
                        <>
                          <Check className="h-4 w-4" /> Request Sent
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4" /> Send Request
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-indigo-400 text-indigo-600 hover:bg-indigo-50 rounded-full w-full sm:w-auto"
                      onClick={() => handleSessionOpen(mentor)}
                    >
                      <CalendarDays className="h-4 w-4" /> Schedule Session
                    </Button>
                  </div>

                  {/* Show booked session */}
                  {sessions[mentor.id] && (
                    <div className="mt-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl p-2">
                      ✅ Session booked for {sessions[mentor.id].date} at{" "}
                      {sessions[mentor.id].time}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Mentor Detail Dialog */}
        <MentorDetailDialog
          mentor={selectedMentor}
          open={mentorDialogOpen}
          onOpenChange={setMentorDialogOpen}
          onRequestSend={handleRequestSend}
          sentRequests={sentRequests}
        />

        {/* Session Scheduling Popup */}
        {sessionOpen && activeMentor && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Schedule a Session with {activeMentor.name}
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Date
                  </label>
                  <input
                    type="date"
                    className="border w-full p-2 rounded-md"
                    value={sessionDetails.date}
                    onChange={(e) =>
                      setSessionDetails({
                        ...sessionDetails,
                        date: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Time
                  </label>
                  <input
                    type="time"
                    className="border w-full p-2 rounded-md"
                    value={sessionDetails.time}
                    onChange={(e) =>
                      setSessionDetails({
                        ...sessionDetails,
                        time: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <Button
                  variant="ghost"
                  onClick={() => setSessionOpen(false)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmSession}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentor;
