import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VoicePost = ({ onPost }) => {
  const [content, setContent] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const { toast } = useToast();

  // ✅ Initialize Speech Recognition only once
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast({
        title: "Not Supported",
        description: "Your browser does not support speech recognition.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    // ✅ Create instance only once and store in ref
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setContent(transcript);

      const finalTranscript = transcript.toLowerCase();
      if (event.results[event.results.length - 1].isFinal) {
        if (
          finalTranscript.includes("post now") ||
          finalTranscript.includes("submit post")
        ) {
          handlePost();
        }
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      toast({
        title: "Error",
        description: "Voice recognition error. Please try again.",
        variant: "destructive",
      });
    };

    return () => {
      recognitionRef.current?.stop();
    };
  }, []); // ✅ Empty dependency array → only runs once

  // ✅ Toggle listening (works every time)
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Voice Recording",
        description: "Say 'post now' or 'submit post' when you're ready to publish.",
      });
    }
  };

  // ✅ Post and reset recognition correctly
  const handlePost = () => {
    if (!content.trim()) {
      toast({
        title: "Empty Post",
        description: "Please add some content to your post.",
        variant: "destructive",
      });
      return;
    }

    onPost(content);
    setContent("");
    setIsListening(false);

    // Stop current recognition session
    recognitionRef.current?.stop();

    // Speak confirmation
    const utterance = new SpeechSynthesisUtterance("Your post has been published");
    window.speechSynthesis.speak(utterance);

    toast({
      title: "Success",
      description: "Your post has been published!",
    });

    // ✅ Reinitialize recognition for the next round
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    // reassign listeners
    recognitionRef.current.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setContent(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
  };

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Create a Post</h3>
            <Button
              variant={isListening ? "secondary" : "outline"}
              size="sm"
              onClick={toggleListening}
              className={isListening ? "animate-pulse" : ""}
            >
              <Mic className="h-4 w-4 mr-2" />
              {isListening ? "Stop Recording" : "Voice Input"}
            </Button>
          </div>

          <Textarea
            placeholder="What's on your mind? Or use voice input..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px]"
          />

          {isListening && (
            <p className="text-sm text-muted-foreground">
              🎤 Listening... Say "post now" or "submit post" to publish
            </p>
          )}

          <Button
            onClick={handlePost}
            disabled={!content.trim()}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Send className="h-4 w-4 mr-2" />
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoicePost;
