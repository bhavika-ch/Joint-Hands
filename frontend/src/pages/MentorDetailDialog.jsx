import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserPlus,
  Briefcase,
  Heart,
  MessageCircle,
  Star,
  Calendar,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
} from "lucide-react";

const MentorDetailDialog = ({
  mentor,
  open,
  onOpenChange,
  onRequestSend,
  sentRequests,
}) => {
  const [slotDialogOpen, setSlotDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotBooked, setSlotBooked] = useState(false);

  if (!mentor) return null;

  // ✅ Add fallback data to prevent errors
  const expertise = mentor.expertise || ["Motivation", "Leadership", "Confidence"];
  const helpWith =
    mentor.helpWith ||
    ["Goal setting", "Overcoming challenges", "Building self-confidence"];
  const disability =
    mentor.disability ||
    "Overcame physical and social barriers to create meaningful impact in their field.";
  const impact =
    mentor.impact ||
    "Inspired millions across the world through resilience, courage, and determination.";

  const isRequestSent = sentRequests.includes(mentor.id);
  const timeSlots = [
    "Morning (9:00 AM - 11:00 AM)",
    "Afternoon (1:00 PM - 3:00 PM)",
    "Evening (5:00 PM - 7:00 PM)",
  ];

  const handleSlotBooking = (slot) => {
    setSelectedSlot(slot);
    setSlotBooked(true);
    setTimeout(() => setSlotDialogOpen(false), 1000);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-200 bg-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-gray-800">
              Mentor Profile
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar className="h-32 w-32 border-4 border-indigo-100 shadow-md">
                <AvatarImage src={mentor.image} alt={mentor.name} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-200 to-purple-300 text-indigo-800 font-bold text-2xl">
                  {mentor.avatar}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold text-gray-800">{mentor.name}</h2>
                <p className="text-lg text-gray-600">{mentor.role}</p>
                <Badge variant="outline" className="bg-gray-100">
                  {mentor.country}
                </Badge>

                <div className="flex items-center gap-4 text-sm mt-2 text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{mentor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{mentor.sessions} mentoring sessions</span>
                  </div>
                </div>

                <Button
                  className={`mt-2 transition-all duration-300 rounded-full ${
                    isRequestSent
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90"
                  }`}
                  disabled={isRequestSent}
                  onClick={() => onRequestSend(mentor.id)}
                >
                  {isRequestSent ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Request Sent
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" /> Connect with{" "}
                      {mentor.name.split(" ")[0]}
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* ✅ Added About Section */}
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-700 mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-500" /> About {mentor.name.split(" ")[0]}
              </h3>
              {/* <p className="text-gray-700 leading-relaxed text-sm">
                {mentor.summary
                  ? mentor.summary.length > 200
                    ? mentor.summary.slice(0, 180) + "..."
                    : mentor.summary
                  : "This mentor has inspired countless people through resilience and dedication."}
              </p> */}

               <p className="text-gray-700 leading-relaxed text-sm">
                    “{mentor.summary}”
                  </p>
            </div>

            <Separator />

            {/* Journey Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-600">
                <Heart className="h-5 w-5 text-indigo-500" /> Journey & Challenges
              </h3>
              <p className="text-gray-600 leading-relaxed">{disability}</p>
            </div>

            <Separator />

            {/* Impact Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-600">
                <Award className="h-5 w-5 text-purple-500" /> Impact & Legacy
              </h3>
              <p className="text-gray-600 leading-relaxed">{impact}</p>
            </div>

            <Separator />

            {/* Expertise */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-600">
                <BookOpen className="h-5 w-5 text-indigo-500" /> Areas of Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Help Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-600">
                <Briefcase className="h-5 w-5 text-purple-500" /> How{" "}
                {mentor.name.split(" ")[0]} Can Help You
              </h3>
              <ul className="space-y-2">
                {helpWith.map((help, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">✓</span>
                    <span className="text-gray-600">{help}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Button className="flex-1 bg-indigo-500 text-white hover:bg-indigo-600 rounded-full">
                <MessageCircle className="mr-2 h-4 w-4" /> Send Message
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-indigo-400 text-indigo-600 hover:bg-indigo-50 rounded-full"
                disabled={!isRequestSent}
                onClick={() => setSlotDialogOpen(true)}
              >
                {slotBooked ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Slot Booked
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" /> Schedule Session
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Slot Booking Dialog */}
      <Dialog open={slotDialogOpen} onOpenChange={setSlotDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl shadow-xl border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-gray-800">
              <Clock className="h-5 w-5 text-indigo-500" /> Book a Session Slot
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={selectedSlot === slot ? "default" : "outline"}
                className={`w-full justify-start text-left rounded-full ${
                  selectedSlot === slot ? "bg-indigo-500 text-white" : ""
                }`}
                onClick={() => handleSlotBooking(slot)}
              >
                {selectedSlot === slot && (
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-400" />
                )}
                {slot}
              </Button>
            ))}

            {slotBooked && (
              <p className="text-green-600 text-sm font-medium text-center">
                Slot "{selectedSlot}" booked successfully!
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MentorDetailDialog;
