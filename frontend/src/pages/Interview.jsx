import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  Sparkles,
  MessageSquare,
  Loader2,
  Brain,
  Trash2,
  RefreshCw,
} from "lucide-react";

const Interview = () => {
  const [jobRole, setJobRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy fallback questions
  const dummyQuestions = [
    {
      id: 1,
      question: "Explain the difference between var, let, and const in JavaScript.",
      sampleAnswer:
        "var is function-scoped, while let and const are block-scoped. const cannot be reassigned.",
      tips: [
        "Mention scope difference.",
        "Explain immutability of const.",
        "Mention hoisting behavior.",
      ],
    },
    {
      id: 2,
      question: "What are React Hooks?",
      sampleAnswer:
        "Hooks are special functions like useState and useEffect that let you use React features without writing classes.",
      tips: ["Mention useState and useEffect.", "Explain rules of hooks."],
    },
    {
      id: 3,
      question: "What is the difference between SQL and NoSQL databases?",
      sampleAnswer:
        "SQL databases use structured tables, while NoSQL databases store data as documents or key-value pairs.",
      tips: ["Compare schema design.", "Mention scalability."],
    },
  ];

  // ✅ Generate Questions
  const generateQuestions = async () => {
    if (!jobRole) {
      toast.error("Please enter a job role");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/v5/interview/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobRole }),
      });

      const data = await res.json();

      if (data.success && Array.isArray(data.questions)) {
        setQuestions(data.questions.map((q, i) => ({ id: i + 1, ...q })));
        toast.success("AI Interview questions generated successfully!");
      } else {
        toast.warn("Using sample questions (AI not responding)");
        setQuestions(dummyQuestions);
      }
    } catch (err) {
      console.error(err);
      toast.warn("Using sample questions (Server not reachable)");
      setQuestions(dummyQuestions);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Question
  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    toast.info("Question removed");
    if (questions.length === 1) {
      setCurrentQuestion("");
      setUserAnswer("");
      setFeedback("");
    }
  };

  // ✅ Get Feedback
  const getFeedback = async () => {
    if (!currentQuestion || !userAnswer) {
      toast.error("Please select a question and provide your answer");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/v5/interview/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentQuestion, userAnswer }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback(data.feedback);
        toast.success("AI feedback generated!");
      } else {
        toast.warn("Using demo feedback (AI not responding)");
        setFeedback(
          "Good effort! You explained the concept, but try adding examples and structure your answer better."
        );
      }
    } catch (err) {
      console.error(err);
      toast.warn("Using demo feedback (Server not reachable)");
      setFeedback(
        "Decent attempt! Add real-world examples and maintain clarity in your response."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Clear Feedback
  const clearFeedback = () => {
    setFeedback("");
    toast.info("Feedback cleared");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            AI Interview Simulator
          </h1>
          <p className="text-gray-600 mt-2">
            Generate realistic interview questions and get instant AI feedback.
          </p>
        </div>

        {/* Generate Questions */}
        <Card className="shadow-2xl border border-gray-100 mb-8 hover:shadow-indigo-200 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="text-indigo-600" /> Generate Questions
            </CardTitle>
            <CardDescription>
              Enter your desired job role and generate questions instantly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Job Role</Label>
            <Input
              placeholder="e.g., Frontend Developer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="mt-2"
            />
            <Button
              onClick={generateQuestions}
              disabled={loading}
              className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Generating...
                </>
              ) : (
                "Generate Interview Questions"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Questions Section */}
        {questions.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {questions.map((q) => (
              <Card
                key={q.id}
                className="border shadow-md hover:shadow-lg transition-all duration-300 bg-white relative"
              >
                <div className="absolute top-3 right-3">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteQuestion(q.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="text-indigo-600">{q.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    <strong>Sample Answer:</strong> {q.sampleAnswer}
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-gray-600 text-sm">
                    {q.tips?.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Practice Section */}
        <Card className="shadow-xl border border-gray-100 mb-8 hover:shadow-purple-200 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="text-purple-600" /> Practice & Get Feedback
            </CardTitle>
            <CardDescription>
              Select a question, write your answer, and get AI feedback instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label>Select Question</Label>
              <select
                className="w-full p-2 border rounded-md mt-2 bg-white"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
              >
                <option value="">Select a question...</option>
                {questions.map((q) => (
                  <option key={q.id} value={q.question}>
                    {q.question}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Your Answer</Label>
              <Textarea
                rows={5}
                placeholder="Write your answer here..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button
              onClick={getFeedback}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Analyzing...
                </>
              ) : (
                "Get AI Feedback"
              )}
            </Button>

            {feedback && (
              <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 mt-6">
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-indigo-600">
                    <Brain /> AI Feedback
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-100"
                    onClick={clearFeedback}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Clear
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-gray-700 text-base leading-relaxed">
                    {feedback}
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Interview;
