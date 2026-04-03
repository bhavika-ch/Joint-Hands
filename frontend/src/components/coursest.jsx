export const courses = [
  {
    id: "1",
    title: "Web Development Fundamentals with Accessibility",
    description:
      "Learn modern web development with a focus on creating accessible applications for all users, including those who are deaf or hard of hearing.",
    instructor: "Sarah Johnson",
    duration: "8 weeks",
    level: "Beginner",
    price: 49.99,
    originalPrice: 99.99,
    rating: 4.8,
    students: 1234,
    thumbnail:
      "https://www.creativeitinstitute.com/images/course/course_1663052056.jpg",
    category: "Web Development",
    lessons: 45,
  },
  {
    id: "2",
    title: "AI and Machine Learning for Everyone",
    description:
      "Understand AI and machine learning concepts with fully accessible content including sign language interpretation.",
    instructor: "Dr. Michael Chen",
    duration: "10 weeks",
    level: "Intermediate",
    price: 79.99,
    originalPrice: 149.99,
    rating: 4.9,
    students: 2156,
    thumbnail: "https://media.geeksforgeeks.org/wp-content/uploads/20240308162931/Difference-Between-Machine-Learning-and-Artificial-Intelligence.webp",
    category: "Artificial Intelligence",
    lessons: 62,
  },
  {
    id: "3",
    title: "Mobile App Development with React Native",
    description:
      "Build cross-platform mobile applications with accessibility features built-in from the start.",
    instructor: "Emily Rodriguez",
    duration: "12 weeks",
    level: "Intermediate",
    price: 89.99,
    originalPrice: 169.99,
    rating: 4.7,
    students: 987,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-tI0m_spQzcaw0kTFMnHmDf9-SEvTLUtukQ&s",
    category: "Mobile Development",
    lessons: 58,
  },
  {
    id: "4",
    title: "Hackathon Success: From Idea to Prototype",
    description:
      "Master the art of hackathons with strategies for rapid prototyping, team collaboration, and presenting your ideas effectively.",
    instructor: "Alex Thompson",
    duration: "4 weeks",
    level: "Beginner",
    price: 39.99,
    originalPrice: 79.99,
    rating: 4.9,
    students: 3421,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ0mMLetQAd6vi18-Nd5Qa4Z3vanY7dANUkg&s",
    category: "Career Development",
    lessons: 28,
  },
  {
    id: "5",
    title: "Data Science and Analytics",
    description:
      "Learn data analysis, visualization, and interpretation with fully accessible learning materials.",
    instructor: "Dr. Lisa Park",
    duration: "14 weeks",
    level: "Advanced",
    price: 99.99,
    originalPrice: 199.99,
    rating: 4.8,
    students: 1876,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfUFmKmFDvY4rg76EzhS6nH0r_B7Uk_oxluw&s",
    category: "Data Science",
    lessons: 72,
  },
  {
    id: "6",
    title: "UI/UX Design for Accessibility",
    description:
      "Create beautiful and accessible user interfaces that work for everyone, with a focus on inclusive design principles.",
    instructor: "Marcus Williams",
    duration: "6 weeks",
    level: "Beginner",
    price: 59.99,
    originalPrice: 119.99,
    rating: 4.9,
    students: 2543,
    thumbnail: "https://media.geeksforgeeks.org/wp-content/uploads/20230926172158/Accessibility-in-UI-UX-Design.png",
    category: "Design",
    lessons: 38,
  },
];

export const getCourseById = (id) => {
  const course = courses.find((c) => c.id === id);
  if (!course) return undefined;

  return {
    ...course,
    longDescription: `${course.description} This comprehensive course includes accessibility best practices, live projects, and mentor guidance.`,
    whatYouWillLearn: [
      "Build accessible, inclusive web experiences",
      "Use ARIA roles and semantic HTML effectively",
      "Test accessibility with modern tools",
      "Understand WCAG standards",
      "Apply accessibility in React & Node",
      "Design for all users with empathy",
    ],
    requirements: [
      "Basic HTML/CSS knowledge",
      "Interest in web design or frontend",
      "No prior accessibility experience needed",
    ],
    curriculum: [
      {
        section: "Introduction",
        lessons: [
          { id: 1, title: "Course Overview", duration: "5m" },
          { id: 2, title: "What is Accessibility?", duration: "12m" },
        ],
      },
      {
        section: "Core Concepts",
        lessons: [
          { id: 3, title: "Semantic HTML", duration: "20m" },
          { id: 4, title: "ARIA Roles & Landmarks", duration: "15m" },
        ],
      },
    ],
    relatedCourses: courses.filter((c) => c.id !== id).slice(0, 2),
  };
};
