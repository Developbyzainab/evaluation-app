const questionTemplates = {
  easy: [
    { template: "What is {skill} primarily used for?" },
    { template: "Which of the following is a key feature of {skill}?" },
    { template: "What does {skill} help you achieve?" },
    { template: "Which category does {skill} belong to?" },
    { template: "What is the main purpose of {skill}?" },
  ],
  medium: [
    { template: "How does {skill} handle {concept}?" },
    { template: "What is the difference between {skill} and {related}?" },
    { template: "Which approach is recommended when using {skill} for {useCase}?" },
    { template: "What is a common best practice when working with {skill}?" },
    { template: "How would you optimize {skill} for {scenario}?" },
  ],
  hard: [
    { template: "What is the most complex challenge when implementing {skill} at scale?" },
    { template: "How does {skill} compare to {alternative} in terms of {criteria}?" },
    { template: "What advanced technique would you use to solve {problem} with {skill}?" },
    { template: "Explain the architecture pattern used by {skill} for {feature}." },
    { template: "What are the security implications of using {skill} in {context}?" },
  ],
};

const skillKnowledge = {
  "HTML": {
    concepts: ["semantic tags", "forms", "accessibility", "SEO", "DOM"],
    related: ["CSS", "JavaScript", "Web Components"],
    useCases: ["web pages", "email templates", "web apps"],
    correctAnswers: [
      "structuring web content with semantic elements",
      "creating accessible web pages",
      "defining document structure",
    ],
    mcqQuestions: [
      {
        question: "Which HTML element is used for the main heading of a page?",
        options: ["<h1>", "<head>", "<title>", "<header>"],
        correct: 0,
        explanation: "<h1> represents the highest-level heading on a page."
      },
      {
        question: "Which attribute provides alternative text for an image?",
        options: ["src", "alt", "title", "href"],
        correct: 1,
        explanation: "The alt attribute provides text describing an image and improves accessibility."
      }
    ]
  },
  "CSS": {
    concepts: ["flexbox", "grid", "animations", "responsive design", "selectors"],
    related: ["SCSS", "Tailwind CSS", "Bootstrap"],
    useCases: ["styling web pages", "layouts", "animations"],
    correctAnswers: [
      "creating responsive layouts with Flexbox and Grid",
      "animating elements with keyframes",
      "managing styles efficiently with custom properties",
    ],
    mcqQuestions: [
      {
        question: "Which CSS property changes text color?",
        options: ["font-style", "text-color", "color", "background"],
        correct: 2,
        explanation: "The color property controls the foreground color of text."
      },
      {
        question: "Which layout system is designed mainly for one-dimensional layouts?",
        options: ["Grid", "Flexbox", "Float", "Position"],
        correct: 1,
        explanation: "Flexbox is primarily designed for one-dimensional layouts."
      }
    ]
  },
  "JavaScript": {
    concepts: ["closures", "async/await", "prototypes", "event loop", "modules"],
    related: ["TypeScript", "Node.js", "React"],
    useCases: ["web applications", "server-side development", "mobile apps"],
    correctAnswers: [
      "managing asynchronous operations with Promises",
      "using closures for data encapsulation",
      "leveraging the event loop for non-blocking code",
    ],
    mcqQuestions: [
      {
        question: "What is the result of typeof null in JavaScript?",
        options: ["null", "object", "undefined", "boolean"],
        correct: 1,
        explanation: "typeof null returns 'object' because of a historical behavior in JavaScript."
      },
      {
        question: "Which method creates a new array by transforming every element?",
        options: ["filter()", "map()", "find()", "forEach()"],
        correct: 1,
        explanation: "map() creates a new array containing transformed values."
      }
    ]
  },
  "React": {
    concepts: ["hooks", "virtual DOM", "component lifecycle", "state management", "context API"],
    related: ["Next.js", "Redux", "TypeScript"],
    useCases: ["single-page applications", "component-based UIs"],
    correctAnswers: [
      "building reusable UI components",
      "managing state with useState and useReducer",
      "optimizing performance with useMemo and useCallback",
    ],
    mcqQuestions: [
      {
        question: "Which React Hook is commonly used to manage component state?",
        options: ["useEffect", "useState", "useMemo", "useRef"],
        correct: 1,
        explanation: "useState allows functional components to manage state."
      },
      {
        question: "What is JSX?",
        options: ["A database", "A JavaScript syntax extension", "A CSS framework", "A backend runtime"],
        correct: 1,
        explanation: "JSX allows developers to write HTML-like syntax inside JavaScript."
      }
    ]
  },
  "Next.js": {
    concepts: ["server components", "app router", "SSR", "SSG", "API routes"],
    related: ["React", "Vercel", "TypeScript"],
    useCases: ["full-stack React applications", "SEO-optimized sites"],
    correctAnswers: [
      "enabling server-side rendering for better SEO",
      "using file-based routing for simpler navigation",
      "leveraging React Server Components for performance",
    ],
    mcqQuestions: [
      {
        question: "Which framework is Next.js built on?",
        options: ["Vue", "Angular", "React", "Svelte"],
        correct: 2,
        explanation: "Next.js is a React framework for full-stack web applications."
      }
    ]
  },
  "Node.js": {
    concepts: ["event loop", "streams", "modules", "npm", "async I/O"],
    related: ["Express.js", "NestJS", "TypeScript"],
    useCases: ["backend APIs", "real-time applications", "CLI tools"],
    correctAnswers: [
      "handling concurrent connections with non-blocking I/O",
      "building scalable network applications",
      "using npm ecosystem for rapid development",
    ],
    mcqQuestions: [
      {
        question: "Which module is commonly used to create an HTTP server in Node.js?",
        options: ["http", "html", "server", "request"],
        correct: 0,
        explanation: "Node.js provides the built-in http module for creating HTTP servers."
      }
    ]
  },
  "Python": {
    concepts: ["decorators", "generators", "context managers", "asyncio", "type hints"],
    related: ["Django", "FastAPI", "Data Science"],
    useCases: ["web development", "data analysis", "automation", "AI/ML"],
    correctAnswers: [
      "writing clean, readable code with minimal syntax",
      "leveraging extensive library ecosystem",
      "using decorators for cross-cutting concerns",
    ],
    mcqQuestions: [
      {
        question: "Which keyword defines a function in Python?",
        options: ["function", "func", "def", "define"],
        correct: 2,
        explanation: "Python uses the def keyword to define functions."
      }
    ]
  },
  "MongoDB": {
    concepts: ["documents", "collections", "aggregation", "indexes", "replication"],
    related: ["Mongoose", "Node.js", "Express.js"],
    useCases: ["flexible schema applications", "rapid prototyping"],
    correctAnswers: [
      "storing data as flexible BSON documents",
      "using aggregation pipeline for complex queries",
      "scaling horizontally with sharding",
    ],
    mcqQuestions: [
      {
        question: "MongoDB is primarily what type of database?",
        options: ["Relational", "Document-oriented", "Graph", "Spreadsheet"],
        correct: 1,
        explanation: "MongoDB is a NoSQL document-oriented database."
      }
    ]
  },
  "PostgreSQL": {
    concepts: ["ACID", "joins", "indexes", "triggers", "JSONB", "window functions"],
    related: ["SQL", "Prisma", "Django"],
    useCases: ["relational data", "complex queries", "analytics"],
    correctAnswers: [
      "ensuring data integrity with ACID transactions",
      "querying JSON data with JSONB support",
      "using advanced indexing for performance",
    ],
    mcqQuestions: [
      {
        question: "Which SQL command retrieves data?",
        options: ["GET", "SELECT", "FETCH", "READ"],
        correct: 1,
        explanation: "SELECT is used to retrieve records from database tables."
      }
    ]
  },
  "Docker": {
    concepts: ["containers", "images", "Dockerfile", "volumes", "networks", "compose"],
    related: ["Kubernetes", "CI/CD", "DevOps"],
    useCases: ["containerization", "consistent environments", "microservices"],
    correctAnswers: [
      "packaging applications with all dependencies",
      "ensuring consistency across environments",
      "orchestrating multi-container applications with Compose",
    ],
    mcqQuestions: [
      {
        question: "What does a Dockerfile define?",
        options: ["A container runtime", "Image build instructions", "Network config", "Volume mounts"],
        correct: 1,
        explanation: "A Dockerfile contains instructions for building a Docker image."
      }
    ]
  },
  "Kubernetes": {
    concepts: ["pods", "services", "deployments", "ingress", "configmaps", "secrets"],
    related: ["Docker", "Helm", "Cloud"],
    useCases: ["container orchestration", "scaling applications", "self-healing"],
    correctAnswers: [
      "automating container deployment and scaling",
      "managing service discovery and load balancing",
      "providing self-healing for containerized apps",
    ],
    mcqQuestions: [
      {
        question: "What is a Pod in Kubernetes?",
        options: ["A container", "A group of containers", "A virtual machine", "A network"],
        correct: 1,
        explanation: "A Pod is the smallest deployable unit that can contain one or more containers."
      }
    ]
  },
  "AWS": {
    concepts: ["EC2", "S3", "Lambda", "RDS", "CloudFormation", "IAM", "VPC"],
    related: ["Cloud", "DevOps", "Terraform"],
    useCases: ["cloud infrastructure", "serverless", "scalable applications"],
    correctAnswers: [
      "providing comprehensive cloud services",
      "enabling serverless computing with Lambda",
      "managing infrastructure as code with CloudFormation",
    ],
    mcqQuestions: [
      {
        question: "What is AWS Lambda used for?",
        options: ["Serverless computing", "Load balancing", "Database storage", "DNS management"],
        correct: 0,
        explanation: "AWS Lambda lets you run code without provisioning or managing servers."
      }
    ]
  },
  "Git": {
    concepts: ["commits", "branches", "merging", "rebasing", "remotes", "workflows"],
    related: ["GitHub", "GitLab", "CI/CD"],
    useCases: ["version control", "collaboration", "code history"],
    correctAnswers: [
      "tracking changes with distributed version control",
      "enabling parallel development with branches",
      "facilitating code review with pull requests",
    ],
    mcqQuestions: [
      {
        question: "What is Git?",
        options: ["Version control system", "Database", "Programming language", "Operating system"],
        correct: 0,
        explanation: "Git tracks changes in source code and supports collaborative development."
      }
    ]
  },
  "Tailwind CSS": {
    concepts: ["utility classes", "responsive design", "dark mode", "JIT compiler", "customization"],
    related: ["CSS", "React", "Next.js"],
    useCases: ["rapid UI development", "consistent design systems"],
    correctAnswers: [
      "styling directly in HTML with utility classes",
      "customizing design tokens in config file",
      "enabling responsive designs with breakpoint prefixes",
    ],
    mcqQuestions: [
      {
        question: "What type of CSS framework is Tailwind CSS?",
        options: ["Utility-first", "Database-first", "Backend-first", "Component-only"],
        correct: 0,
        explanation: "Tailwind provides low-level utility classes for styling interfaces."
      }
    ]
  },
  "Figma": {
    concepts: ["components", "auto layout", "prototyping", "design systems", "collaboration"],
    related: ["UI Design", "UX Design", "Adobe XD"],
    useCases: ["interface design", "prototyping", "design handoff"],
    correctAnswers: [
      "creating reusable components with variants",
      "building responsive layouts with Auto Layout",
      "enabling real-time collaborative design",
    ],
    mcqQuestions: [
      {
        question: "What is Figma primarily used for?",
        options: ["UI/UX design", "Database management", "Video editing", "Server hosting"],
        correct: 0,
        explanation: "Figma is a collaborative interface design and prototyping tool."
      }
    ]
  }
};

function translateToUrdu(text, skill) {
  const translations = {
    "What is": "کیا ہے",
    "primarily used for": "بنیادی طور پر کس کام آتا ہے",
    "key feature of": "کلیدی فیچر ہے",
    "help you achieve": "آپ کو کیا حاصل کرنے میں مدد کرتا ہے",
    "category does": "زمرہ تعلق رکھتا ہے",
    "main purpose of": "مقصد کیا ہے",
    "How does": "کیسے",
    "handle": "سنبھالتا ہے",
    "difference between": "فرق کیا ہے",
    "recommended when": "مخصوص ہے جب",
    "best practice when": "بہترین عمل ہے جب",
    "optimize": "بہتر بنانے کے لئے",
    "complex challenge": "مشکل چیلنج",
    "implementing at scale": "بڑی سطح پر لاگو کرنے میں",
    "compare to": "کی موازنہ",
    "in terms of": "کے لحاظ سے",
    "advanced technique": "پیشگی تکنیک",
    "solve": "حل کرنے کے لئے",
    "architecture pattern": "آرکیٹیکچر پیٹرن",
    "security implications": "سیکورٹی اثرات",
    "used for": "استعمال ہوتا ہے",
    "Which of the following": "نچے دیے گئے میں سے کونسا",
    "Which": "کونسا",
    "What does": "کیا کرتا ہے",
    "What is the": "کیا ہے",
    "How does": "کیسے",
    "What advanced": "کیا ایڈوانس",
    "Explain": "وضاحت کریں",
    "What are": "کیا ہیں",
  };

  let result = text;
  Object.entries(translations).forEach(([en, ur]) => {
    result = result.replace(new RegExp(en, "gi"), ur);
  });
  return result || `${skill} کے بارے میں سوال`;
}

function generateQuestionsForSkill(skill, difficulty, count, language = "English") {
  const knowledge = skillKnowledge[skill] || {
    concepts: ["fundamentals", "best practices", "performance"],
    related: ["related technology"],
    useCases: ["development"],
    correctAnswers: [`proper ${skill.toLowerCase()} usage`],
    mcqQuestions: []
  };

  // Use predefined MCQ questions if available, otherwise generate from templates
  const predefinedMCQs = knowledge.mcqQuestions || [];
  const templates = questionTemplates[difficulty] || questionTemplates.easy;
  
  const questions = [];
  const usedTemplates = new Set();

  for (let i = 0; i < count; i++) {
    // Use predefined MCQ questions first, then fall back to template generation
    if (i < predefinedMCQs.length) {
      const mcq = predefinedMCQs[i];
      let questionText = mcq.question;
      let options = mcq.options;
      let correct = mcq.correct;
      let explanation = mcq.explanation;

      if (language === "Urdu") {
        questionText = translateToUrdu(questionText, skill);
        // Translate options if possible
        options = options.map(opt => translateToUrdu(opt, skill));
      }

      questions.push({
        question: questionText,
        options,
        correct,
        explanation: `${skill}: ${explanation}.`,
        skill,
        difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
      });
      continue;
    }

    // Fallback to template-based generation (for skills without predefined MCQs)
    const template = templates[Math.floor(Math.random() * templates.length)];
    const templateKey = template.template;

    if (usedTemplates.has(templateKey) && usedTemplates.size < templates.length) {
      continue;
    }
    usedTemplates.add(templateKey);

    const concept = knowledge.concepts[Math.floor(Math.random() * knowledge.concepts.length)];
    const related = knowledge.related[Math.floor(Math.random() * knowledge.related.length)];
    const useCase = knowledge.useCases[Math.floor(Math.random() * knowledge.useCases.length)];
    const correct = knowledge.correctAnswers[Math.floor(Math.random() * knowledge.correctAnswers.length)];

    let questionText = template.template
      .replace(/{skill}/g, skill)
      .replace(/{concept}/g, concept)
      .replace(/{related}/g, related)
      .replace(/{useCase}/g, useCase)
      .replace(/{scenario}/g, useCase)
      .replace(/{problem}/g, `${concept} challenge`)
      .replace(/{alternative}/g, related)
      .replace(/{criteria}/g, "performance")
      .replace(/{feature}/g, concept)
      .replace(/{context}/g, "production");

    if (language === "Urdu") {
      questionText = translateToUrdu(questionText, skill);
    }

    // Generate 3 wrong answers for MCQ
    const wrongAnswers = [
      `not ${correct}`,
      `incorrect ${correct}`,
      `wrong ${correct}`
    ];
    const options = [correct, ...wrongAnswers].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(correct);

    questions.push({
      question: questionText,
      options,
      correct: correctIndex,
      explanation: `${skill}: ${correct}. This demonstrates understanding of ${concept}.`,
      skill,
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
    });
  }

  return questions;
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function generateQuestionsForSkills(skills, difficulty, count, language = "English") {
  const allQuestions = [];
  const questionsPerSkill = Math.ceil(count / (skills.length || 1));

  if (skills && skills.length > 0) {
    skills.forEach((skill) => {
      const skillQuestions = generateQuestionsForSkill(skill, difficulty, questionsPerSkill, language);
      allQuestions.push(...skillQuestions);
    });
  }

  // Defensive fallback: if we don't have enough questions, fill with default skills
  const defaultSkills = ["HTML", "CSS", "JavaScript"];
  let fallbackIndex = 0;
  while (allQuestions.length < count) {
    const fallbackSkill = defaultSkills[fallbackIndex % defaultSkills.length];
    const extra = generateQuestionsForSkill(fallbackSkill, difficulty, 1, language);
    if (extra && extra.length > 0) {
      allQuestions.push(...extra);
    }
    fallbackIndex++;
  }

  // Shuffle and return exact count
  return shuffleArray(allQuestions).slice(0, count);
}

export function getAllSkills() {
  return import("../data/all-skills.js").then((mod) => mod.default);
}