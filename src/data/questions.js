export const questionBank = {
  JavaScript: {
    Beginner: [
      {
        question: "What is the result of typeof null?",
        options: ["null", "object", "undefined", "boolean"],
        answer: "object",
        explanation: "typeof null returns 'object' due to a historical bug.",
      },
      {
        question: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "define", "variable"],
        answer: "let",
        explanation: "let creates a variable scoped to the current block.",
      },
    ],
    Intermediate: [
      {
        question: "What does the === operator compare?",
        options: ["Only values", "Only types", "Value and type", "Object names"],
        answer: "Value and type",
        explanation: "Strict equality compares both value and type.",
      },
    ],
    Advanced: [
      {
        question: "What is the purpose of the event loop?",
        options: ["Compile CSS", "Handle async operations", "Create HTML", "Connect databases"],
        answer: "Handle async operations",
        explanation: "The event loop coordinates asynchronous callbacks.",
      },
    ],
  },
  React: {
    Beginner: [
      {
        question: "Which Hook manages component state?",
        options: ["useEffect", "useState", "useMemo", "useRef"],
        answer: "useState",
        explanation: "useState allows functional components to manage state.",
      },
      {
        question: "What is JSX?",
        options: ["A database", "A JavaScript syntax extension", "A CSS framework", "A backend runtime"],
        answer: "A JavaScript syntax extension",
        explanation: "JSX allows writing HTML-like syntax inside JavaScript.",
      },
    ],
    Intermediate: [
      {
        question: "Which Hook is used for side effects?",
        options: ["useState", "useEffect", "useMemo", "useCallback"],
        answer: "useEffect",
        explanation: "useEffect is used for side effects like data fetching.",
      },
    ],
    Advanced: [
      {
        question: "What problem does React reconciliation solve?",
        options: ["Database design", "Efficient UI updates", "CSS compilation", "Server installation"],
        answer: "Efficient UI updates",
        explanation: "Reconciliation helps determine the most efficient way to update the UI.",
      },
    ],
  },
  Python: {
    Beginner: [
      {
        question: "Which keyword defines a function in Python?",
        options: ["function", "func", "def", "define"],
        answer: "def",
        explanation: "Python uses the def keyword to define functions.",
      },
    ],
    Intermediate: [
      {
        question: "Which keyword is used to handle exceptions?",
        options: ["catch", "try", "error", "except-only"],
        answer: "try",
        explanation: "Python uses try and except blocks for exception handling.",
      },
    ],
    Advanced: [
      {
        question: "What is a Python decorator used for?",
        options: ["Modifying function behavior", "Creating CSS", "Managing databases", "Compiling HTML"],
        answer: "Modifying function behavior",
        explanation: "Decorators wrap functions to extend or modify their behavior.",
      },
    ],
  },
  HTML: {
    Beginner: [
      {
        question: "Which HTML element is used for the main heading of a page?",
        options: ["<h1>", "<head>", "<title>", "<header>"],
        answer: "<h1>",
        explanation: "<h1> represents the highest-level heading on a page.",
      },
      {
        question: "Which attribute provides alternative text for an image?",
        options: ["src", "alt", "title", "href"],
        answer: "alt",
        explanation: "The alt attribute provides text describing an image and improves accessibility.",
      },
    ],
  },
  CSS: {
    Beginner: [
      {
        question: "Which CSS property changes text color?",
        options: ["font-style", "text-color", "color", "background"],
        answer: "color",
        explanation: "The color property controls the foreground color of text.",
      },
      {
        question: "Which layout system is designed mainly for one-dimensional layouts?",
        options: ["Grid", "Flexbox", "Float", "Position"],
        answer: "Flexbox",
        explanation: "Flexbox is primarily designed for one-dimensional layouts.",
      },
    ],
  },
  "Node.js": {
    Beginner: [
      {
        question: "What is Node.js primarily used for?",
        options: ["Running JavaScript outside the browser", "Designing images", "Writing CSS", "Managing Photoshop files"],
        answer: "Running JavaScript outside the browser",
        explanation: "Node.js provides a runtime for executing JavaScript outside the browser.",
      },
      {
        question: "Which package manager is commonly used with Node.js?",
        options: ["npm", "pip", "composer", "gem"],
        answer: "npm",
        explanation: "npm is the package manager commonly used with Node.js.",
      },
    ],
  },
  MongoDB: {
    Beginner: [
      {
        question: "MongoDB is primarily what type of database?",
        options: ["Relational", "Document-oriented", "Graph", "Spreadsheet"],
        answer: "Document-oriented",
        explanation: "MongoDB is a NoSQL document-oriented database.",
      },
      {
        question: "What format is commonly associated with MongoDB documents?",
        options: ["HTML", "BSON", "CSS", "CSV"],
        answer: "BSON",
        explanation: "MongoDB stores documents internally using BSON.",
      },
    ],
  },
};

// Helper function to get questions for a skill
export function getQuestionsForSkill(skill, difficulty, count = 5) {
  const skillQuestions = questionBank[skill];
  if (!skillQuestions) return [];
  
  const difficultyLevel = skillQuestions[difficulty] || skillQuestions.Beginner || [];
  return difficultyLevel.slice(0, count);
}

// Helper function to generate questions for multiple skills
export function generateQuestionsForSkills(skills, difficulty, count, language = "English") {
  let allQuestions = [];
  const perSkill = Math.ceil(count / skills.length);
  
  skills.forEach(skill => {
    const questions = getQuestionsForSkill(skill, difficulty, perSkill);
    allQuestions = [...allQuestions, ...questions];
  });
  
  // Shuffle and slice
  return allQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}