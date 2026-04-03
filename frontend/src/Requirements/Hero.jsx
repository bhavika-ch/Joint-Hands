import { Search, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Voice search is not supported in your browser. Please try Chrome or Edge.');
    }
  };

  return (
    <section className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-lg sm:text-xl text-primary-foreground/90 mb-2">
          Search thousands of accessible job opportunities
        </p>
        <p className="text-sm sm:text-base text-primary-foreground/80 mb-8 flex items-center justify-center gap-2 flex-wrap">
          💡 Try searching by job title, company, or use voice search • Filter by accessibility features
        </p>
        
        <div className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center bg-card rounded-xl shadow-lg">
            <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search jobs by title, company, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-14 py-6 text-base border-0 bg-transparent focus-visible:ring-0"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={handleVoiceSearch}
              className={`absolute right-2 ${isListening ? 'text-destructive' : 'text-muted-foreground'} hover:text-foreground`}
              aria-label="Voice search"
            >
              <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
