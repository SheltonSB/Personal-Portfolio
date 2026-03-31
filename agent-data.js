// Central content layer for the portfolio assistant, project modal, and animated background.
window.portfolioAgentData = {
  assistantName: 'Ask Shelton AI',
  greeting:
    "Ask me about Shelton's backend strengths, project architecture, resume highlights, books, leadership programs, or internship fit. I answer from the portfolio's structured knowledge base.",
  promptPlaceholder: 'Ask about a project, backend strengths, or recruiter fit',
  emptyState:
    'Try asking about Shelton, the e-commerce architecture, the NFL predictor, his books, his leadership programs, or why he is a strong internship candidate.',
  suggestions: [
    'Summarize Shelton for a recruiter',
    'Explain the e-commerce architecture',
    'What makes the NFL project impressive?',
    'How do his books connect to backend goals?',
  ],
  fallback: {
    answer:
      "I do not have that exact phrasing in Shelton's current portfolio knowledge yet, but I can help with his resume, projects, backend stack, experience, communities, books, and contact details.",
    followUp: 'Do you want a recruiter summary, a project deep dive, his current reading, or a contact overview?',
  },
  annotationPhrases: [
    '// evaluating cache invalidation tradeoffs',
    'redis edge cache -> product queries',
    'auth flow: jwt + guarded routes',
    'throughput target: keep UI responsive',
    'feature note: explainability matters',
    'xgboost + shap + streamlit',
    'system design thought: split reads from writes',
    'recruiter note: measurable outcomes > vague claims',
    'weekly reports generated with python + sql',
    'latency budget: under 2 seconds',
    'designing for production-minded delivery',
    'learning loop: build -> measure -> explain',
    '// retry strategy for external integrations',
    'cloudinary media pipeline',
    'azure deployment via github actions',
    'domain model > quick patchwork',
    'backend focus: reliability + clarity',
    'current reading: DDIA + System Design Interview',
    'annotation: think in systems, not just features',
    'mentorship + engineering identity + impact',
  ],
  projectShowcase: {
    ecommerce: {
      id: 'ecommerce',
      kicker: 'Backend Platform',
      title: 'Full-Stack E-Commerce',
      shortTitle: 'e-commerce',
      tagline:
        'A production-minded commerce platform built to show backend performance, secure checkout, media handling, and CI/CD discipline.',
      keywords: [
        'ecommerce',
        'e-commerce',
        'store',
        'retail',
        'checkout',
        'redis',
        'stripe',
        'cloudinary',
        'azure',
        'dotnet',
        '.net',
      ],
      overview:
        'This project is Shelton’s backend-heavy commerce build. It combines a .NET API, React frontend, PostgreSQL, Redis, and Azure deployment into one recruiter-friendly system that demonstrates more than just CRUD by showing how data access, caching, auth, payments, media, and delivery work together.',
      problem:
        'The project is designed to solve a common weakness in student portfolios: many apps look functional on the surface but do not explain how performance-sensitive reads, authentication, payments, media handling, and release workflows are structured together. This one intentionally does.',
      technologies: ['.NET 9', 'ASP.NET Core', 'React', 'PostgreSQL', 'Redis', 'Stripe', 'Cloudinary', 'JWT', 'GitHub Actions', 'Azure'],
      architecture: [
        'The frontend talks to a .NET backend that exposes product, cart, authentication, and checkout flows through a single application surface instead of scattering business logic across the client.',
        'PostgreSQL stores the core relational data while Redis sits in front of repeated catalog and listing reads, which reflects a basic read-optimization pattern common in production commerce systems.',
        'Stripe handles payment processing and Cloudinary handles media upload and storage so payment and asset concerns are integrated cleanly without bloating the core domain logic.',
        'A GitHub Actions pipeline validates and deploys changes to Azure, which adds a release workflow and demonstrates that deployment quality is part of the system design, not an afterthought.',
      ],
      keyFeatures: [
        'JWT-based authentication and role-aware access control for protected user flows.',
        'Redis-backed performance optimization for frequently accessed catalog and product data.',
        'Secure checkout integration through Stripe with external payment responsibility kept outside the main app logic.',
        'Cloudinary media pipeline for product assets and image management.',
        'Automated Azure release workflow through GitHub Actions for a more credible end-to-end delivery story.',
      ],
      challenges: [
        'Balancing feature completeness with clean architecture instead of turning the app into a collection of disconnected integrations.',
        'Handling multiple external services while keeping auth, payments, media, and data access responsibilities clearly separated.',
        'Making the project demonstrate backend maturity, not just frontend polish or CRUD coverage.',
      ],
      impact: [
        'The project gives recruiters a concrete example of how Shelton thinks about backend systems as a full product surface rather than isolated API endpoints.',
        'It shows system design judgment around storage, caching, external integrations, and delivery workflow in one portfolio piece.',
        'It is strong in interviews because it creates room to talk about tradeoffs instead of only listing frameworks.',
      ],
      screens: [
        { label: 'Catalog View', note: 'Space for homepage or product-listing screenshot.' },
        { label: 'Checkout Flow', note: 'Space for cart, payment, or order confirmation screenshot.' },
        { label: 'Architecture View', note: 'Space for API / deployment diagram or backend walkthrough image.' },
      ],
      links: {
        github: 'https://github.com/SheltonBumhe/ecommerce-api',
        caseStudy: 'ecommerce-demo.html',
      },
      assistant: {
        summary:
          'Shelton’s e-commerce platform is one of the strongest examples of his backend thinking because it combines performance, auth, payments, media management, and deployment in one coherent system.',
        highlights: [
          'He used PostgreSQL for the core transactional model and Redis for repeated catalog reads, which gives him a clear way to explain read-heavy system design tradeoffs.',
          'He wired Stripe and Cloudinary into a backend architecture instead of treating them as surface-level add-ons, so payments and media have explicit boundaries.',
          'He used GitHub Actions and Azure to show that deployment and release quality matter as much as feature delivery in a production-minded project.',
        ],
        followUp: 'Do you want the architecture breakdown, the technology stack, or why this project stands out to recruiters?',
      },
    },
    nfl: {
      id: 'nfl',
      kicker: 'Machine Learning Product',
      title: 'NFL QB Touchdown Predictor',
      shortTitle: 'NFL predictor',
      tagline:
        'A machine learning project that combines predictive modeling, SHAP-based explainability, and a lightweight product interface for fast scenario exploration.',
      keywords: [
        'nfl',
        'touchdown',
        'predictor',
        'streamlit',
        'xgboost',
        'shap',
        'football',
        'machine learning',
      ],
      overview:
        'This project is Shelton’s best machine learning showcase because it does more than train a model. It also explains decisions, quantifies the scale of the training set, and ships the result through a usable interface.',
      problem:
        'A lot of ML projects stop at accuracy metrics. This one is built to answer a harder question: can the model be explained, explored, and presented in a way that non-experts can still understand and trust?',
      technologies: ['Python', 'scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'SHAP', 'Streamlit'],
      architecture: [
        'Historical NFL play and matchup data is cleaned and transformed into model-ready features so the project starts with a real data pipeline, not only model training code.',
        'An XGBoost model is trained on more than 10,000 plays to predict touchdown outcomes and evaluated against the chosen target with reported 88% accuracy.',
        'SHAP is used to surface the factors driving predictions so the system is not a pure black box and the reasoning behind the output can be inspected.',
        'A Streamlit app wraps the workflow and returns simulated matchup output quickly, giving the project a user-facing layer instead of leaving it as a notebook artifact.',
      ],
      keyFeatures: [
        'Reported 88% prediction accuracy on the modeled touchdown outcome task, based on a training set of more than 10,000 plays.',
        'Explainability layer with SHAP for interpretable model behavior and clearer feature-level reasoning.',
        'Streamlit front end for accessible interaction and fast experimentation.',
        'Under-two-second response goal for live simulation feel during matchup exploration.',
      ],
      challenges: [
        'Designing a project that feels like a product instead of an isolated notebook experiment.',
        'Balancing predictive performance with interpretability so the model remains defensible instead of opaque.',
        'Turning sports data into something usable and understandable for non-technical viewers and recruiter audiences.',
      ],
      impact: [
        'The project shows Shelton can connect modeling, explanation, and user-facing delivery in one story.',
        'It gives recruiters evidence that he thinks beyond pure ML code and into usability, communication, and product framing.',
        'It is especially useful in interviews because the numbers, architecture, and explainability choices are all easy to discuss concretely.',
      ],
      screens: [
        { label: 'Input Interface', note: 'Space for matchup selection or user controls screenshot.' },
        { label: 'Prediction Output', note: 'Space for live model output and probability summary.' },
        { label: 'Explainability View', note: 'Space for SHAP chart or feature-importance screenshot.' },
      ],
      links: {
        github: 'https://github.com/SheltonBumhe/machine-learning-nfl-touchdowns',
        caseStudy: 'nfl-case-study.html',
      },
      assistant: {
        summary:
          'The NFL touchdown predictor stands out because it combines modeling, explainability, and product thinking instead of optimizing only for accuracy.',
        highlights: [
          'The model uses XGBoost and was trained on more than 10,000 plays, which gives Shelton a concrete way to discuss dataset scale, feature engineering, and evaluation.',
          'The reported 88% accuracy matters because he can explain what the number represents instead of dropping it as an empty metric.',
          'SHAP and Streamlit turn the project into something interpretable and user-facing rather than a static data science artifact.',
        ],
        followUp: 'Do you want the model architecture, the explainability angle, or why this project helps in recruiting conversations?',
      },
    },
  },
  directAnswers: [
    {
      matchAny: ['hello', 'hi', 'hey'],
      maxTokens: 3,
      answer:
        "Hi. I can answer questions about Shelton's projects, backend strengths, ML work, books, experience, communities, and recruiter fit.",
      followUp: 'What do you want to know first?',
    },
    {
      matchAny: ['resume', 'cv'],
      answer:
        "Use the Download Resume button in the hero section to grab Shelton's latest PDF. The portfolio also mirrors the same education, project, experience, and leadership points in a recruiter-friendly format.",
      followUp: 'Do you want a quick recruiter summary or a project deep dive?',
    },
    {
      matchAny: ['books', 'reading', 'book'],
      answer:
        'Shelton is currently reading System Design Interview by Alex Xu and Designing Data-Intensive Applications by Martin Kleppmann. Those books align with his focus on backend architecture, scalability tradeoffs, and data-system design.',
      followUp: 'Do you want the book links or how they connect to his backend goals?',
      followUpTopic: 'books-backend',
    },
    {
      matchAny: ['contact', 'email', 'phone', 'linkedin', 'github'],
      answer:
        'You can reach Shelton at sbumhe2@huskers.unl.edu, on LinkedIn at linkedin.com/in/shelton-bumhe-027476312, on GitHub at github.com/SheltonSB, or by phone at (308) 663-3469.',
      followUp: 'Do you want the best project to review first before reaching out?',
    },
  ],
  topics: [
    {
      id: 'recruiter-summary',
      keywords: ['recruiter', 'summary', 'introduce', 'overview', 'who is shelton', 'candidate', 'fit'],
      summary:
        'Shelton Bumhe is a Computer Science student at the University of Nebraska-Lincoln focused on backend systems, machine learning, and production-minded project work.',
      highlights: [
        'He combines academic preparation with two portfolio projects that show architecture, measurable outcomes, and product thinking.',
        'His Dominion College experience and MLT involvement show communication, mentorship, and professional growth alongside technical execution.',
        'He is strongest when discussing backend systems, explainable ML, and projects that are easy to defend in a recruiter conversation.',
      ],
      followUp: 'Do you want the backend angle, the ML angle, or the project-by-project version of that summary?',
    },
    {
      id: 'strengths',
      keywords: ['backend', 'skills', 'stack', 'technical', 'strengths', 'what does he know', 'api'],
      summary:
        'Shelton’s strongest technical lane is backend and data-oriented engineering, with hands-on work in Python, Java, JavaScript, SQL, C#, .NET, PostgreSQL, Redis, XGBoost, Streamlit, and testing tools like xUnit and JUnit.',
      highlights: [
        'The recurring pattern in his portfolio is not just writing code, but combining architecture, measurable performance, and clear explanation.',
        'He is also building stronger systems intuition through current reading in system design and data-intensive application design.',
      ],
      followUp: 'Do you want examples from the e-commerce project, the NFL predictor, or his student-tracking work?',
    },
    {
      id: 'experience',
      keywords: ['experience', 'dominion', 'mlt', 'work history', 'leadership', 'mentor', 'teaching'],
      summary:
        "Shelton's experience combines software development, tutoring, and structured leadership development, which shows up in how he builds systems and explains them.",
      highlights: [
        'At Dominion College he built a Python and SQL tracking workflow, generated weekly reports, and supported a 99% pass rate as a math tutor.',
        'Through MLT he is sharpening professional communication, interview readiness, and long-term career strategy in a structured environment.',
      ],
      followUp: 'Do you want the engineering experience version, the leadership version, or the mentoring angle?',
    },
    {
      id: 'books-backend',
      keywords: ['books', 'backend', 'system design', 'ddia', 'data intensive', 'connect', 'goals', 'architecture'],
      summary:
        'Those books connect directly to Shelton’s backend goals because they sharpen the kind of engineering judgment he wants to build: architecture tradeoffs, reliability, scalability, storage patterns, and system boundaries.',
      highlights: [
        'System Design Interview reinforces the recruiter-facing and interview-facing side of backend thinking, including APIs, caching, scaling, and service design.',
        'Designing Data-Intensive Applications goes deeper into replication, consistency, event-driven patterns, and reliability, which supports stronger data-system intuition.',
        'Together they map closely to the direction already visible in his e-commerce and ML projects.',
      ],
      followUp: 'Do you want me to connect those books to the e-commerce architecture, the NFL project, or both?',
    },
    {
      id: 'community',
      keywords: ['community', 'mlt', 'colorstack', 'nsbe', 'organizations', 'involvement'],
      summary:
        'Shelton is involved with Management Leadership For Tomorrow, ColorStack, and the National Society of Black Engineers.',
      highlights: [
        'MLT adds leadership structure, coaching, and career accountability.',
        'ColorStack strengthens mentorship, peer network, and student-to-industry access.',
        'NSBE reinforces engineering identity, leadership, and service-oriented growth.',
      ],
      followUp: 'Do you want the short explanation of MLT, ColorStack, or NSBE?',
    },
  ],
};
