// Central content layer for the portfolio assistant, project modal, and animated background.
window.portfolioAgentData = {
  assistantName: 'Ask Shelton AI',
  greeting:
    "Hi — I’m Shelton’s portfolio assistant. Ask what he built at Fiserv, how one of his systems works, where his technical strengths are, or what he is looking for next.",
  promptPlaceholder: 'Ask about a project, systems thinking, or technical strengths',
  emptyState:
    'Try asking what Shelton built at Fiserv, which projects show system design, or why he would be a strong software engineering intern.',
  suggestions: [
    'What did Shelton build at Fiserv?',
    'What backend systems has Shelton worked on?',
    'Explain Grand Pilot.',
    'Why would Shelton be a strong software engineering intern?',
  ],
  fallback: {
    answer:
      "I don’t have that exact detail in Shelton’s portfolio knowledge base. I can help with his Fiserv experience, backend systems, Grand Pilot, student tracking work, e-commerce platform, NFL predictor, skills, career goals, or contact information.",
    followUp: 'Would you like an experience summary, a system deep dive, or a recruiter-focused overview?',
  },
  annotationPhrases: [
    '[init] booting backend workspace...',
    '$ npm install redis ioredis express-rate-limit stripe',
    '$ dotnet restore ecommerce-api.sln',
    '[cache] redis cluster reachable',
    '[scale] load balancer health checks passing',
    '[routing] consistent hashing ring rebalanced',
    '[auth] jwt middleware attached to /api',
    '[rate-limit] checkout window 60 req/min',
    '[db] postgres connection pool warmed',
    '[media] cloudinary upload adapter ready',
    '[payments] stripe client initialized',
    '[ml] xgboost model loaded into memory',
    '[explainability] shap values computed',
    '[streamlit] local inference ui running',
    'GET /api/products 200 41ms',
    'POST /api/checkout 200 188ms',
    'GET /api/recommendations 200 63ms',
    '// design for reliability before scale',
    '// ship clean architecture, not demo glue',
    'system_design = ["cache", "queue", "replicas"]',
    'books.reading -> ["System Design Interview", "DDIA"]',
    'mentor_loop(): learn -> build -> explain',
  ],
  projectShowcase: {
    ecommerce: {
      id: 'ecommerce',
      kicker: 'Backend Platform',
      title: 'Full-Stack E-Commerce',
      shortTitle: 'e-commerce',
      tagline:
        'An e-commerce app built with .NET, React, PostgreSQL, Redis, and Azure.',
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
        'This project combines a .NET API, React frontend, PostgreSQL, Redis, and Azure deployment in one system. It covers API design, checkout flow, caching, media handling, and deployment in a way that is easier to explain than a basic CRUD app.',
      problem:
        'A lot of student projects stop at features. This one was built to answer the harder question of how the app should behave when reads are frequent, checkout matters, and traffic grows.',
      technologies: ['.NET 9', 'ASP.NET Core', 'React', 'PostgreSQL', 'Redis', 'Stripe', 'Cloudinary', 'JWT', 'Rate Limiting', 'GitHub Actions', 'Azure'],
      architecture: [
        'The frontend talks to a .NET backend that exposes product, cart, authentication, and checkout flows through a single application surface instead of scattering business logic across the client.',
        'PostgreSQL stores the core relational data while Redis sits in front of repeated catalog and listing reads, which reflects a basic read-optimization pattern common in production commerce systems.',
        'The scale-out story extends the API behind a load balancer so multiple instances can serve traffic horizontally instead of relying on a single application node.',
        'Consistent hashing is part of the caching discussion so requests can be routed predictably across cache partitions as the system grows, reducing cache churn when nodes are added or removed.',
        'Rate limiting protects login, cart, and checkout-sensitive paths from abuse and noisy-client behavior, which matters once a public-facing commerce API starts receiving real traffic.',
        'Stripe handles payment processing and Cloudinary handles media upload and storage so payment and asset concerns are integrated cleanly without bloating the core domain logic.',
        'A GitHub Actions pipeline validates and deploys changes to Azure, which adds a release workflow and demonstrates that deployment quality is part of the system design, not an afterthought.',
      ],
      keyFeatures: [
        'JWT-based authentication and role-aware access control for protected user flows.',
        'Redis-backed performance optimization for frequently accessed catalog and product data.',
        'Load-balancer-ready API design for horizontal scaling.',
        'Consistent-hashing-aware cache strategy for predictable scaling behavior.',
        'Rate limiting at the API edge for traffic shaping and abuse protection.',
        'Secure checkout integration through Stripe with external payment responsibility kept outside the main app logic.',
        'Cloudinary media pipeline for product assets and image management.',
        'Automated Azure release workflow through GitHub Actions for a more credible end-to-end delivery story.',
      ],
      challenges: [
        'Balancing feature completeness with clean architecture instead of turning the app into a collection of disconnected integrations.',
        'Handling multiple external services while keeping auth, payments, media, data access, and scale concerns clearly separated.',
        'Thinking through how the system behaves under higher traffic instead of describing it only as a single-instance demo.',
        'Making the project demonstrate backend maturity, not just frontend polish or CRUD coverage.',
      ],
      impact: [
        'The project gives a concrete example of how Shelton thinks about backend systems as a full product surface rather than isolated API endpoints.',
        'It shows system design judgment around storage, caching, load balancing, rate limiting, external integrations, and delivery workflow in one portfolio piece.',
        'It creates room to talk about tradeoffs instead of only listing frameworks.',
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
          'Shelton’s e-commerce project is a good example of how he thinks about APIs, caching, checkout flow, and scaling in one system.',
        highlights: [
          'He used PostgreSQL for the core transactions and Redis for repeated catalog reads, which makes the read path easy to explain.',
          'He can talk through load balancing, consistent hashing, and rate limiting instead of stopping at a single local instance.',
          'Stripe, Cloudinary, GitHub Actions, and Azure make the project feel complete without turning it into a feature dump.',
        ],
        followUp: 'Do you want the architecture breakdown, the scaling decisions, or the technology stack?',
      },
    },
    nfl: {
      id: 'nfl',
      kicker: 'Machine Learning Product',
      title: 'NFL QB Touchdown Predictor',
      shortTitle: 'NFL predictor',
      tagline:
        'An NFL touchdown predictor built with XGBoost, SHAP, and Streamlit.',
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
        'This project combines prediction, explainability, and a simple interface. The model is not just trained; it is also easier to inspect and interact with.',
      problem:
        'A lot of ML work stops at one accuracy number. This project was built to make the prediction easier to explain and easier to explore.',
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
        'Turning sports data into something usable and understandable for non-technical viewers and broader engineering audiences.',
      ],
      impact: [
        'The project shows Shelton can connect modeling, explanation, and user-facing delivery in one story.',
        'It shows that he thinks beyond pure ML code and into usability, communication, and product framing.',
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
          'The NFL touchdown predictor combines modeling, explanation, and a simple interface instead of stopping at accuracy alone.',
        highlights: [
          'The model uses XGBoost and was trained on more than 10,000 plays, so there is enough scale to talk about feature engineering and evaluation.',
          'The reported 88% accuracy is easier to defend because the result is paired with SHAP explanations.',
          'Streamlit turns it into something interactive instead of leaving it as a notebook.',
        ],
        followUp: 'Do you want the model architecture, the explainability angle, or the product-delivery side?',
      },
    },
  },
  directAnswers: [
    {
      matchAny: ['hello', 'hi', 'hey'],
      maxTokens: 3,
      answer:
        "Hi. I can answer questions about Shelton's projects, engineering strengths, books, experience, communities, outside-school interests, and technical direction.",
      followUp: 'What do you want to know first?',
    },
    {
      matchAny: ['resume', 'cv'],
      answer:
        "Use the Download Resume button in the hero section to grab Shelton's latest PDF. The portfolio also mirrors the same education, project, experience, and leadership points in a cleaner web format.",
      followUp: 'Do you want a quick summary or a project deep dive?',
    },
    {
      matchAny: ['books', 'reading', 'book'],
      answer:
        'Shelton is currently reading System Design Interview by Alex Xu and Designing Data-Intensive Applications by Martin Kleppmann. Links: https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119 and https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/ Those books align with his focus on architecture, scalability tradeoffs, and data-system design.',
      followUp: 'Do you want how those books connect to his system design goals?',
      followUpTopic: 'books-backend',
    },
    {
      matchAny: ['contact', 'email', 'phone', 'linkedin', 'github'],
      answer:
        'You can reach Shelton by email at sbumhe2@huskers.unl.edu, on LinkedIn at https://www.linkedin.com/in/shelton-bumhe-027476312/, on GitHub at https://github.com/SheltonSB, or by phone at (308) 663-3469.',
      followUp: 'Do you want the strongest project to review first before reaching out?',
    },
    {
      matchAny: ['outside school', 'interests', 'hobbies', 'gym', 'track', 'athletics', 'soccer'],
      answer:
        'Outside class, Shelton likes going to the gym, doing track and athletics work, and playing soccer. Those interests keep a competitive routine in his week and give him something active outside engineering work.',
      followUp: 'What about you?',
      followUpTopic: 'visitor-interests',
    },
  ],
  topics: [
    {
      id: 'fiserv',
      keywords: ['fiserv', 'file tracking', 'enterprise file', 'file platform', 'software engineering intern', 'kafka', 'cid'],
      summary:
        'At Fiserv, Shelton works on an enterprise file-tracking platform that gives teams clearer visibility into files moving across multiple internal systems.',
      highlights: [
        'He helps build Java and Spring Boot services that capture file events, structure records, apply business rules, preserve processing history, and expose search APIs.',
        'Kafka supports event-driven updates, while SQL stores file history, relationships, and processing details.',
        'Teams can find files by CID, file name, job number, client, and status, making operational state easier to understand.',
      ],
      followUp: 'Would you like the event flow, technology choices, or operational problem explained in more detail?',
    },
    {
      id: 'grand-pilot',
      keywords: ['grand pilot', 'founder', 'small business', 'mentor', 'mentorship', 'platform idea'],
      summary:
        'Grand Pilot is Shelton’s product concept for making practical founder and mentor guidance more accessible to small business owners.',
      highlights: [
        'The concept starts with the access problem: many owners need tactical guidance but do not have trusted founder networks.',
        'The planned flow lets owners discover founders or mentors, request a conversation, and get guidance on growth, operations, or strategy.',
        'Shelton’s role covers problem definition, user-flow planning, product concept, and platform strategy.',
      ],
      followUp: 'Would you like the user flow, product rationale, or expected value?',
    },
    {
      id: 'intern-fit',
      keywords: ['strong intern', 'software engineering intern', 'why hire', 'why would', 'candidate', 'internship fit', 'google'],
      summary:
        'Shelton would bring a combination of backend execution, operational problem framing, and clear technical communication to a software engineering internship.',
      highlights: [
        'His Fiserv work exposes him to Java, Spring Boot, Kafka, SQL, event modeling, APIs, and enterprise workflow constraints.',
        'His projects show range across backend platforms, machine learning, data workflows, and early product strategy without losing the user problem.',
        'Tutoring and MLT Career Prep strengthen his ability to explain technical ideas, take feedback, and work across technical and non-technical contexts.',
      ],
      followUp: 'Would you like the backend, product-thinking, or communication angle expanded?',
    },
    {
      id: 'recruiter-summary',
      keywords: ['recruiter', 'summary', 'introduce', 'overview', 'who is shelton', 'candidate', 'fit'],
      summary:
        'Shelton Bumhe is a Computer Science student at the University of Nebraska–Lincoln and Software Engineering Intern at Fiserv, focused on backend systems, event-driven workflows, and production-minded project work.',
      highlights: [
        'He combines enterprise backend experience with portfolio systems that show architecture, data thinking, and product judgment.',
        'His Dominion College experience and MLT involvement show communication, mentorship, and professional growth alongside technical execution.',
        'He is strongest when discussing backend systems, real operational workflows, explainable ML, and technology choices he can defend clearly.',
      ],
      followUp: 'Do you want the backend angle, the ML angle, or the project-by-project version of that summary?',
    },
    {
      id: 'strengths',
      keywords: ['backend', 'skills', 'stack', 'technical', 'strengths', 'what does he know', 'api'],
      summary:
        'Shelton’s strongest technical lane is backend and data-oriented engineering, with hands-on work in Java, Spring Boot, Kafka, SQL, C#, ASP.NET Core, Python, PostgreSQL, Redis, XGBoost, and React.',
      highlights: [
        'The recurring pattern in his portfolio is not just writing code, but combining architecture, measurable performance, and clear explanation.',
        'He is also building stronger systems intuition through current reading in system design and data-intensive application design.',
      ],
      followUp: 'Do you want examples from the e-commerce project, the NFL predictor, or his student-tracking work?',
    },
    {
      id: 'experience',
      keywords: ['experience', 'fiserv', 'dominion', 'mlt', 'work history', 'leadership', 'mentor', 'teaching'],
      summary:
        "Shelton's experience combines enterprise backend engineering at Fiserv, operational software development and tutoring at Dominion College, and structured leadership development through MLT.",
      highlights: [
        'At Fiserv he helps build an event-driven enterprise file-tracking platform with Java, Spring Boot, Kafka, SQL, and search APIs.',
        'At Dominion College he built a Python and SQL tracking workflow for student records, tutoring activity, and progress reporting while also teaching algebra and calculus.',
        'Through MLT he is developing communication, leadership, technical interview preparation, networking, and product thinking in a high-accountability environment.',
      ],
      followUp: 'Do you want the engineering experience version, the leadership version, or the mentoring angle?',
    },
    {
      id: 'books-backend',
      keywords: ['books', 'backend', 'system design', 'ddia', 'data intensive', 'connect', 'goals', 'architecture'],
      summary:
        'Those books connect directly to Shelton’s backend goals because they sharpen the kind of engineering judgment he wants to build: architecture tradeoffs, reliability, scalability, storage patterns, and system boundaries.',
      highlights: [
        'System Design Interview reinforces the architecture and interview side of backend thinking, including APIs, caching, scaling, and service design.',
        'Designing Data-Intensive Applications goes deeper into replication, consistency, event-driven patterns, and reliability, which supports stronger data-system intuition.',
        'Together they map closely to the direction already visible in his e-commerce and ML projects.',
      ],
      followUp: 'Do you want me to connect those books to the e-commerce architecture, the NFL project, or both?',
    },
    {
      id: 'community',
      keywords: ['community', 'colorstack', 'nsbe', 'organizations', 'involvement'],
      summary:
        'Shelton stays involved with ColorStack and the National Society of Black Engineers.',
      highlights: [
        'ColorStack strengthens mentorship, peer network, and student-to-industry access. Link: https://www.colorstack.org/about-us',
        'NSBE reinforces engineering identity, leadership, and service-oriented growth. Link: https://nsbe.org/about/',
      ],
      followUp: 'Do you want the short explanation of ColorStack, NSBE, or both?',
    },
    {
      id: 'outside-interests',
      keywords: ['outside school', 'outside class', 'interests', 'hobbies', 'gym', 'track', 'athletics', 'soccer'],
      summary:
        'Outside school, Shelton spends time in the gym, does track and athletics work, and plays soccer.',
      highlights: [
        'That mix gives him a routine that is active, competitive, and team-oriented outside technical work.',
        'It is also part of how he resets outside classes, projects, and recruiting preparation.',
      ],
      followUp: 'What about you?',
    },
  ],
};
