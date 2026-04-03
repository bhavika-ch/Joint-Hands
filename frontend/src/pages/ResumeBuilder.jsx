import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "Frontend Developer",
    summary: "",
    github: "",
    skills: "",
    experience: "",
    projects: "",
    education: "",
  });

  const recognitionRef = useRef(null);
  const activeField = useRef(null);
  const resumeRef = useRef(null);

  // Initialize Speech Recognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition && !recognitionRef.current) {
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-IN";

    recognitionRef.current.onresult = (event) => {
      const text = event.results[0][0].transcript;
      if (activeField.current) {
        setFormData((prev) => ({
          ...prev,
          [activeField.current]: prev[activeField.current]
            ? prev[activeField.current] + " " + text
            : text,
        }));
      }
    };

    recognitionRef.current.onerror = (err) => {
      console.error("Speech Recognition Error:", err);
      alert("🎙️ Voice recognition failed. Please allow mic access and retry!");
    };
  }

  const startListening = (field) => {
    if (!recognitionRef.current) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }
    activeField.current = field;
    recognitionRef.current.start();
  };

  // Suggest pre-filled text for frontend developers
  const handleSuggest = (field) => {
    const suggestions = {
      summary:
        "Creative Frontend Developer with a strong focus on building responsive, accessible, and high-performing web applications using React.js, Tailwind CSS, and modern JavaScript.",
      skills:
        "React.js, Next.js, JavaScript (ES6+), Tailwind CSS, Redux, Git, REST APIs, UI/UX Design, Responsive Web Design.",
      experience:
        "Worked on multiple projects involving modern React architecture, optimized UI rendering, API integration, and state management using Redux Toolkit.",
      projects:
        "1️⃣ Portfolio Website – React + Tailwind.\n2️⃣ Job Listing Platform – Filterable UI using mock API data.\n3️⃣ College Fest Management App – Event booking system with responsive design.",
      education:
        "B.Tech in Computer Science, IKGPTU Punjab (2021–2025). CGPA: 8.5/10",
      github: "https://github.com/yourusername",
    };
    setFormData((prev) => ({ ...prev, [field]: suggestions[field] || "" }));
  };

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const downloadPDF = async () => {
    const input = resumeRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);
    pdf.save(`${formData.name || "My_Resume"}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* --- Left: Input Form --- */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
            🚀 Frontend Developer Resume Builder
          </h1>

          <div className="space-y-5">
            {Object.keys(formData).map((field) => (
              <div
                key={field}
                className="p-4 bg-gray-50 border rounded-xl hover:shadow-md transition"
              >
                <label className="block text-sm font-semibold text-gray-700 capitalize mb-2">
                  {field}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={`Enter ${field}...`}
                    className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => startListening(field)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    🎙️
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSuggest(field)}
                    className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400"
                  >
                    💡
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={downloadPDF}
            className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            ⬇️ Download Resume as PDF
          </button>
        </div>

        {/* --- Right: Resume Preview --- */}
        <div
          ref={resumeRef}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-6 text-center">
            <h2 className="text-3xl font-bold">{formData.name || "Your Name"}</h2>
            <p className="text-lg font-medium">{formData.role}</p>
            {formData.github && (
              <a
                href={formData.github}
                className="text-sm hover:underline"
                target="_blank"
              >
                {formData.github}
              </a>
            )}
          </div>

          <div className="p-6 space-y-5">
            <section>
              <h3 className="text-lg font-semibold border-b pb-1 mb-2 text-gray-800">
                Professional Summary
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {formData.summary || "Describe your professional background here..."}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold border-b pb-1 mb-2 text-gray-800">
                Skills
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {formData.skills || "Mention your technical skills here..."}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold border-b pb-1 mb-2 text-gray-800">
                Experience
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {formData.experience ||
                  "List your work experience, internships, or freelance projects..."}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold border-b pb-1 mb-2 text-gray-800">
                Projects
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {formData.projects ||
                  "Add some of your important projects with short descriptions."}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold border-b pb-1 mb-2 text-gray-800">
                Education
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {formData.education || "Mention your degree and institution here..."}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
