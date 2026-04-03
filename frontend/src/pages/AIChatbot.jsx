import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, Mic, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const { toast } = useToast();

  // 🧠 Initialize speech recognition
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognitionRef.current.onerror = () => setIsListening(false);

    recognitionRef.current.onend = () => {
      if (!isSpeaking) {
        recognitionRef.current.start();
        setIsListening(true);
      }
    };

    return () => {
      recognitionRef.current?.stop();
    };
  }, [isSpeaking]);

  // 🧩 Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🗣️ Speak function with auto re-listen
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      recognitionRef.current?.stop();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      if (recognitionRef.current && !isListening) {
        recognitionRef.current.start();
        setIsListening(true);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // 🛑 Stop speaking manually
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // 🎙️ Toggle listening manually
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else if (!isSpeaking) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // ✉️ Send message to backend AI (Grok/Groq)
  const sendMessage = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { role: "user", content: messageText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v6/chat`,
        { messages: updatedMessages },
        { withCredentials: true }
      );

      if (data.success) {
        const assistantMessage = { role: "assistant", content: data.reply };
        setMessages((prev) => [...prev, assistantMessage]);
        speak(data.reply);
      } else {
        throw new Error(data.message || "AI response failed");
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      toast({
        title: "AI Error",
        description: error?.response?.data?.message || error.message || "Failed to get AI response.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 left-6 z-50 rounded-full h-16 w-16 shadow-lg bg-gradient-to-r from-accent to-secondary"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 left-6 z-50 w-96 h-[600px] shadow-xl border-2 flex flex-col">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                AccessWork Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  stopSpeaking();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <p>Hi! I'm here to help you with:</p>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• Finding accessible jobs</li>
                  <li>• Career guidance</li>
                  <li>• Platform navigation</li>
                  <li>• Workplace accommodations</li>
                </ul>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <p className="text-sm animate-pulse">Thinking...</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or speak your message..."
                disabled={isLoading || isListening}
                className="flex-1"
              />
              <Button
                type="button"
                size="icon"
                variant={isListening ? "secondary" : "outline"}
                onClick={toggleListening}
                disabled={isLoading}
              >
                <Mic className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`} />
              </Button>
              {isSpeaking && (
                <Button type="button" size="icon" variant="outline" onClick={stopSpeaking}>
                  <Volume2 className="h-4 w-4 animate-pulse" />
                </Button>
              )}
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;
