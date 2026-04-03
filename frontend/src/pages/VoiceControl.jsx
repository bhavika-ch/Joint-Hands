import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const VoiceControl = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast({
        title: "Not Supported",
        description: "Voice control is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase().trim();
      setTranscript(text);
      handleVoiceCommand(text);
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        console.warn("No speech detected. Restarting recognition...");
        if (isListening) {
          setTimeout(() => recognition.start(), 500);
        }
        return;
      }

      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      speak("There was a problem with voice recognition");
    };

    recognition.onend = () => {
      if (isListening) {
        setTimeout(() => recognition.start(), 400);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []); // ✅ runs only once

  // 🧠 Auto hide transcript after 4s
  useEffect(() => {
    if (transcript && isListening) {
      const timer = setTimeout(() => setTranscript(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [transcript, isListening]);

  // 🔊 Text-to-speech
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  // 🎯 Voice command logic
  const handleVoiceCommand = (command) => {
    console.log("Command received:", command);

    const routes = [
      { keywords: ["home", "go to home"], path: "/", msg: "Opening home page" },
      { keywords: ["jobs", "find jobs"], path: "/jobs", msg: "Opening jobs page" },
      { keywords: ["training", "courses"], path: "/training", msg: "Opening training page" },
      { keywords: ["community"], path: "/community", msg: "Opening community page" },
      { keywords: ["government", "govt schemes", "schemes"], path: "/govt-schemes", msg: "Opening government schemes page" },
      { keywords: ["interview", "mock interview"], path: "/interview", msg: "Opening interview page" },
      { keywords: ["resume", "resume builder"], path: "/resume", msg: "Opening resume builder page" },
      { keywords: ["profile", "my profile"], path: "/profile", msg: "Opening profile page" },
      { keywords: ["settings", "profile settings"], path: "/profile-settings", msg: "Opening profile settings" },
    ];

    let matched = false;

    for (const route of routes) {
      if (route.keywords.some((key) => command.includes(key))) {
        navigate(route.path);
        speak(route.msg);
        matched = true;
        break;
      }
    }

    // 🧠 Default fallback: Go to community if no match
    if (!matched) {
      navigate("/community");
      speak("Command not recognized. Opening community page by default.");
    }

    if (onCommand) onCommand(command);
  };

  // 🎙️ Toggle microphone
  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      setTranscript(""); // 🧹 clear transcript on stop
      speak("Voice control stopped");
    } else {
      try {
        recognition.start();
        setIsListening(true);
        setTranscript(""); // 🧹 clear old transcript when starting fresh
        speak("Voice control activated");
      } catch (err) {
        console.error("Error starting recognition:", err);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {transcript && isListening && (
        <div className="bg-card border-2 border-primary rounded-lg px-4 py-2 shadow-lg max-w-xs">
          <p className="text-sm text-muted-foreground">Heard:</p>
          <p className="text-sm font-medium">{transcript}</p>
        </div>
      )}

      <Button
        size="lg"
        onClick={toggleListening}
        className={`rounded-full h-16 w-16 shadow-lg ${
          isListening
            ? "bg-gradient-to-r from-primary to-secondary animate-pulse"
            : "bg-gradient-to-r from-primary to-secondary"
        }`}
      >
        {isListening ? <Volume2 className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default VoiceControl;
