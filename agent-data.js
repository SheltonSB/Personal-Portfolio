// Update these facts, keywords, and prompts to tune the portfolio assistant.
window.portfolioAgentData = {
  assistantName: 'Ask Shelton AI',
  greeting:
    "Ask me about Shelton's resume, backend work, ML projects, technical skills, leadership programs, current reading list, or contact details. I answer from the portfolio content and keep the conversation focused on his real profile.",
  promptPlaceholder: 'Ask about Shelton, his resume, projects, or current books',
  emptyState:
    'Try asking about Shelton, his resume, his backend projects, his ML work, his leadership program, or what he is reading right now.',
  suggestions: [
    'Who is Shelton?',
    'What backend work has he done?',
    'Tell me about the NFL ML project',
    'What books is he reading right now?',
    'How can I contact him?',
  ],
  fallback: {
    answer:
      "I do not have that in Shelton's current profile knowledge yet. I can help with his resume, projects, experience, technical strengths, current books, and contact details.",
    followUp: 'Do you want a quick summary of his resume, backend strengths, current reading, or recent project work?',
  },
  directAnswers: [
    {
      matchAny: ['hello', 'hi', 'hey'],
      maxTokens: 3,
      answer:
        "Hi. I can answer questions about Shelton's resume, projects, experience, backend skills, ML work, current books, and contact info.",
      followUp: 'What do you want to know first?',
    },
    {
      matchAny: ['resume', 'cv'],
      answer:
        "Use the Download Resume button at the top of the page to grab Shelton's latest resume. The portfolio also summarizes the same education, projects, experience, and leadership focus.",
      followUp: 'Do you want the short version of his most relevant backend and ML experience?',
    },
    {
      matchAny: ['books', 'reading', 'book'],
      answer:
        "Shelton is currently reading System Design Interview by Alex Xu and Designing Data-Intensive Applications by Martin Kleppmann. Book links: https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119 and https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/",
      followUp: 'Do you want to know how those books connect to his backend and data-systems goals?',
    },
  ],
  topics: [
    {
      id: 'about',
      keywords: [
        'who is shelton',
        'about',
        'background',
        'student',
        'school',
        'university',
        'nebraska',
        'unl',
        'computer science',
        'december 2027',
        'gpa',
      ],
      summary:
        'Shelton Bumhe is a Computer Science student at the University of Nebraska-Lincoln pursuing a BS in Computer Science. He is expected to graduate in December 2027 and currently lists a 3.5 GPA on his resume.',
      highlights: [
        'His coursework includes Data Structures and Algorithms, Discrete Math, Linear Algebra, Statistics, Software Engineering I, Physics I, and Calculus III.',
        'He is building toward backend, data, and machine learning roles with a portfolio that ties resume claims to concrete projects.',
      ],
      followUp: 'Want a quick summary of his strongest technical skills or the projects that best match his resume?',
    },
    {
      id: 'strengths',
      keywords: [
        'backend',
        'skills',
        'stack',
        'strengths',
        'technical',
        'what does he know',
        'api',
        'python',
        'sql',
        'testing',
        'ml',
      ],
      summary:
        'Shelton is strongest in Python, Java, JavaScript, SQL, C#, and C, with hands-on work across .NET, React, PostgreSQL, Redis, XGBoost, Streamlit, ASP.NET Core, EF Core, JUnit, and xUnit.',
      highlights: [
        'His resume also lists frameworks and libraries including Spring Boot, Django, TensorFlow, Pandas, Numpy, XGBoost, ASP.NET Core, EF Core, JUnit, and xUnit.',
        'The strongest recurring theme in his work is combining backend implementation with measurable outcomes such as speed, security, and explainability.',
      ],
      followUp: 'Do you want examples from his e-commerce platform, NFL predictor, or student-tracking work?',
    },
    {
      id: 'internship',
      keywords: [
        'intern',
        'internship',
        'hire',
        'candidate',
        'fit',
        'why',
        'strength',
        'goal',
      ],
      summary:
        'Shelton would be a strong intern candidate because his resume already combines software execution, measurable project outcomes, academic preparation, and leadership development.',
      highlights: [
        'His e-commerce project shows backend, security, and deployment discipline, while the NFL project shows modeling, explainability, and product thinking.',
        'His Dominion College work and MLT fellowship also show communication, mentorship, structure, and the ability to improve real workflows for other people.',
      ],
      followUp: 'Want me to break that down through a backend lens, an ML lens, or a leadership lens?',
    },
    {
      id: 'projects',
      keywords: ['projects', 'portfolio', 'built', 'build', 'work', 'featured'],
      summary:
        'The resume-aligned portfolio highlights two core projects: a full-stack e-commerce platform built with .NET, React, PostgreSQL, Redis, and Azure, plus an NFL quarterback touchdown predictor built with Python, scikit-learn, XGBoost, and Streamlit.',
      highlights: [
        'The e-commerce project emphasizes performance, authentication, payments, media handling, and CI/CD to Azure.',
        'The NFL project emphasizes model training, predictive accuracy, SHAP explanations, and a fast Streamlit interface.',
      ],
      followUp: 'Which project do you want to dig into: e-commerce or NFL ML?',
    },
    {
      id: 'ecommerce',
      keywords: [
        'ecommerce',
        'retail',
        'store',
        'api',
        'asp.net',
        'c#',
        'azure',
        'redis',
        'react',
        'postgresql',
      ],
      summary:
        'Shelton built a full-stack e-commerce platform using .NET, React, PostgreSQL, Redis, and Azure. The project focuses on speed, secure checkout, and reliable release workflows.',
      highlights: [
        'He used Redis to cache data so pages load quickly under heavy traffic.',
        'He secured customer payments and media using Stripe and Cloudinary with JWT-based authentication and strict access controls.',
        'He created an automated release pipeline to Azure using GitHub Actions so every code change is tested before launch.',
      ],
      followUp: 'Do you want more detail on the caching, payments, or deployment side of that project?',
    },
    {
      id: 'nfl-ml',
      keywords: [
        'nfl',
        'touchdown',
        'predictor',
        'machine learning',
        'ml',
        'xgboost',
        'streamlit',
        'shap',
        'qb',
        'model',
      ],
      summary:
        'Shelton built an NFL quarterback touchdown predictor using Python, scikit-learn, XGBoost, and Streamlit. The project is aimed at combining practical ML with explainable output and a usable front end.',
      highlights: [
        'He trained the model on over 10,000 plays and reports 88 percent accuracy.',
        'He used SHAP analysis to explain why the model makes certain decisions, including factors like pressure rate.',
        'He launched the model through a live Streamlit app that returns simulated matchup predictions in under 2 seconds.',
      ],
      followUp: 'Do you want the data science view, the explainability view, or the product UI view of that project?',
    },
    {
      id: 'dominion',
      keywords: [
        'dominion',
        'tutor',
        'harare',
        'student tracking',
        'math tutor',
        'software developer',
        'students',
      ],
      summary:
        'At Dominion College in Harare, Shelton worked as a software developer and math tutor. That role blended coding, reporting, and direct student support.',
      highlights: [
        'He built a Python and SQL tracking tool for 30 or more students, cutting manual data entry time by 40 percent and generating weekly reports.',
        'He mentored students in algebra and calculus using adaptive instruction strategies that supported a 99 percent pass rate.',
        'He used diagnostics and targeted practice plans that contributed to a 15 percent increase in test scores over 3 months.',
      ],
      followUp: 'Do you want more detail on the software workflow, the tutoring impact, or the reporting tool?',
    },
    {
      id: 'experience',
      keywords: [
        'experience',
        'leadership',
        'work history',
        'mlt',
        'dominion',
        'mentor',
        'college',
        'fellow',
      ],
      summary:
        "Shelton's experience combines software development, tutoring, and leadership development. It shows up in how he builds systems, explains ideas, and improves workflows for other people.",
      highlights: [
        'His Dominion College role combined Python, SQL, analytics, and direct academic support for students.',
        'He is also part of Management Leadership For Tomorrow, an 18-month career development program focused on structured coaching, technical and business growth, and industry exposure.',
        'His additional involvement includes ColorStack and the National Society of Black Engineers.',
      ],
      followUp: 'Do you want the engineering experience, leadership program, or mentorship angle?',
    },
    {
      id: 'books',
      keywords: [
        'books',
        'reading',
        'alex xu',
        'system design',
        'ddia',
        'designing data intensive applications',
        'kleppmann',
      ],
      summary:
        'Shelton is currently reading System Design Interview by Alex Xu and Designing Data-Intensive Applications by Martin Kleppmann.',
      highlights: [
        'System Design Interview link: https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119',
        'Designing Data-Intensive Applications link: https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/',
        'Those books align closely with his current focus on backend design, scaling tradeoffs, and data systems thinking.',
      ],
      followUp: 'Do you want the book links, or do you want to know how those books connect to his portfolio projects?',
    },
    {
      id: 'contact',
      keywords: [
        'contact',
        'email',
        'phone',
        'linkedin',
        'github',
        'reach',
        'message',
        'connect',
      ],
      summary:
        'You can reach Shelton at sbumhe2@huskers.unl.edu, on LinkedIn at linkedin.com/in/shelton-bumhe-027476312, on GitHub at github.com/SheltonSB, or by phone at (308) 663-3469.',
      highlights: [
        'There is also a contact form on this page if you want to send a message directly from the portfolio.',
        'If you want to review code first, each featured project links to its repository and case study.',
      ],
      followUp: 'Do you want contact details, repo links, or the best project to review first?',
    },
  ],
};
