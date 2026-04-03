import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HandMetal, Volume2, Sparkles } from "lucide-react";

export const SignLanguageAvatar = ({ text, isActive }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [handPosition, setHandPosition] = useState({ x: 0, y: 0 });
  const [mouthOpen, setMouthOpen] = useState(false);
  const [eyesBlink, setEyesBlink] = useState(false);

  useEffect(() => {
    if (!isActive || !text) return;

    const words = text.split(" ");

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        const next = (prev + 1) % words.length;
        setCurrentWord(words[next] || "");
        return next;
      });
    }, 800);

    const handInterval = setInterval(() => {
      setHandPosition({
        x: Math.sin(Date.now() / 500) * 20,
        y: Math.cos(Date.now() / 600) * 15,
      });
    }, 50);

    const mouthInterval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 400);

    const blinkInterval = setInterval(() => {
      setEyesBlink(true);
      setTimeout(() => setEyesBlink(false), 150);
    }, 3000);

    return () => {
      clearInterval(wordInterval);
      clearInterval(handInterval);
      clearInterval(mouthInterval);
      clearInterval(blinkInterval);
    };
  }, [text, isActive]);

  if (!isActive) {
    return (
      <Card className="h-full flex items-center justify-center bg-muted/30">
        <div className="text-center p-8">
          <HandMetal className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Sign language disabled</p>
          <p className="text-sm text-muted-foreground mt-2">
            Enable in accessibility settings
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-gradient-to-br from-primary-light to-secondary-light p-6 overflow-hidden border-2 border-primary/30 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <Badge className="bg-success text-success-foreground shadow-lg">
          <HandMetal className="h-3 w-3 mr-1 animate-pulse" />
          AI Sign Interpreter • Live
        </Badge>
        <div className="flex items-center gap-2 bg-background/50 rounded-full px-3 py-1 backdrop-blur-sm">
          <Volume2 className="h-4 w-4 text-primary animate-pulse" />
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-6 w-1 bg-primary rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  opacity: 0.4 + i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-[calc(100%-6rem)]">
        {/* AI Avatar */}
        <div className="relative w-56 h-56 mb-6">
          {/* Avatar background glow */}
          <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-pulse" />

          {/* Avatar body */}
          <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center overflow-hidden border-4 border-primary/30">
            {/* Face */}
            <div className="relative w-full h-full">
              {/* Head/Skin */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#f4c2a8] to-[#e8b49a] rounded-full" />

              {/* Eyes */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex gap-8">
                <div
                  className={`w-6 bg-[#2c1810] rounded-full transition-all duration-150 ${
                    eyesBlink ? "h-1" : "h-6"
                  }`}
                >
                  {!eyesBlink && (
                    <div className="w-3 h-3 bg-white rounded-full m-1" />
                  )}
                </div>
                <div
                  className={`w-6 bg-[#2c1810] rounded-full transition-all duration-150 ${
                    eyesBlink ? "h-1" : "h-6"
                  }`}
                >
                  {!eyesBlink && (
                    <div className="w-3 h-3 bg-white rounded-full m-1" />
                  )}
                </div>
              </div>

              {/* Eyebrows */}
              <div className="absolute top-[28%] left-1/2 transform -translate-x-1/2 flex gap-8">
                <div className="w-8 h-1 bg-[#2c1810] rounded-full" />
                <div className="w-8 h-1 bg-[#2c1810] rounded-full" />
              </div>

              {/* Nose */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-6 border-l-2 border-[#d4a68a] rounded-bl-lg" />
              </div>

              {/* Mouth */}
              <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
                <div
                  className={`transition-all duration-300 ${
                    mouthOpen
                      ? "w-12 h-8 rounded-lg"
                      : "w-12 h-2 rounded-full"
                  } bg-[#8b4726]`}
                />
              </div>

              {/* Hair */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-[#2c1810] rounded-t-full" />
            </div>
          </div>

          {/* Animated hands showing signs */}
          <div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300"
            style={{
              transform: `translate(calc(-50% + ${handPosition.x}px), ${handPosition.y}px)`,
            }}
          >
            <div className="flex gap-6">
              <div className="animate-sign-left">
                <HandMetal className="h-20 w-20 text-primary drop-shadow-2xl" />
              </div>
              <div className="animate-sign-right">
                <HandMetal className="h-20 w-20 text-accent drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-3 animate-fade-in">
          <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border-2 border-primary/30 shadow-lg">
            <p className="text-4xl font-bold text-primary mb-1">
              {currentWord || "Ready"}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              Interpreting word {wordIndex + 1}
            </div>
          </div>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 bg-background/50 rounded-full px-4 py-2">
            <Sparkles className="h-4 w-4 animate-pulse" />
            AI-powered real-time sign language
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gradient-to-r from-background/70 to-background/50 rounded-lg backdrop-blur-sm border border-border/50">
        <div className="text-xs font-semibold text-muted-foreground mb-1">
          Source Text:
        </div>
        <p className="text-sm text-foreground line-clamp-2">{text}</p>
      </div>
    </Card>
  );
};
