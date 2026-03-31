// Update these facts, keywords, and prompts to tune the portfolio assistant.
window.portfolioAgentData = {
  assistantName: 'Ask Shelton AI',
  greeting:
    "Ask me about Shelton's background, backend work, machine learning projects, internship goals, or contact details. I answer from the portfolio content and keep the conversation focused on his work.",
  promptPlaceholder: 'Ask about Shelton, his projects, or why he is a strong intern',
  emptyState: 'Try asking about Shelton, his backend projects, his ML work, or how to contact him.',
  suggestions: [
    'Who is Shelton?',
    'What backend work has he done?',
    'Tell me about the NFL ML project',
    'Why is Shelton a strong intern candidate?',
    'How can I contact him?',
  ],
  fallback: {
    answer:
      "I do not have that in Shelton's current profile knowledge yet. I can help with his background, projects, experience, technical strengths, internship goals, and contact details.",
    followUp: 'Do you want a quick summary of his backend strengths, ML work, or recent experience?',
  },
  directAnswers: [
    {
      matchAny: ['hello', 'hi', 'hey'],
      maxTokens: 3,
      answer:
        "Hi. I can answer questions about Shelton's projects, experience, backend skills, ML work, internship goals, and contact info.",
      followUp: 'What do you want to know first?',
    },
    {
      matchAny: ['resume', 'cv'],
      answer:
        "Use the Download Resume button at the top of the page to grab Shelton's latest resume. The portfolio also summarizes the same projects, experience, and internship focus.",
      followUp: 'Do you want the short version of his most relevant backend and ML experience?',
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
        'class of 2027',
      ],
      summary:
        'Shelton Bumhe is a Computer Science student at the University of Nebraska-Lincoln, class of 2027. He focuses on backend systems, data pipelines, and machine learning workflows that are observable, documented, and maintainable.',
      highlights: [
        'He translates ambiguous requirements into backend services and ML workflows with clear schemas, instrumentation, and documentation.',
        'His current goal is a Summer 2026 Backend or ML internship where he can help build resilient data platforms.',
      ],
      followUp: 'Want a quick summary of his strongest backend skills or the projects that best represent his work?',
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
        'Shelton is strongest in ASP.NET Core APIs, Python data and ML pipelines, relational modeling, testing, and observability. He tends to work schema first, adds enforceable tests early, and instruments systems with OpenTelemetry.',
      highlights: [
        'His portfolio emphasizes API design, SQL and data modeling, JavaScript, Java, systems programming, and ML pipeline work.',
        'He builds with maintainability in mind, so his projects include tests, migration scripts, monitoring, and demo evidence instead of just screenshots.',
      ],
      followUp: 'Do you want examples from his retail API, NFL prediction system, or invoice platform?',
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
        'summer 2026',
      ],
      summary:
        'Shelton would be a strong backend or ML intern because he already works like an engineer who ships: he designs schemas, builds APIs and pipelines, adds tests, documents tradeoffs, and validates his claims with concrete outputs.',
      highlights: [
        'His projects show production-style behavior such as authenticated endpoints, CI or deployment workflows, telemetry, data integrity constraints, and reproducible model pipelines.',
        'His non-software roles also sharpened leadership, communication, and operational discipline, which matters when teams need interns who can execute reliably.',
      ],
      followUp: 'Want me to break that down through a backend lens or an ML lens?',
    },
    {
      id: 'projects',
      keywords: ['projects', 'portfolio', 'built', 'build', 'work', 'featured'],
      summary:
        'The portfolio highlights three core builds: a cloud-native e-commerce API in C# and ASP.NET Core, an NFL quarterback touchdown prediction system with a database-first ML workflow, and a Java plus MySQL invoice management platform.',
      highlights: [
        'The e-commerce API emphasizes authenticated endpoints, schema design, CI or CD, and observability.',
        'The NFL project emphasizes data ingestion, feature engineering, model benchmarking, and explainability.',
        'The invoice system emphasizes relational design, JDBC imports, performance tuning, and automated reporting.',
      ],
      followUp: 'Which project do you want to dig into: e-commerce API, NFL ML, or invoice management?',
    },
    {
      id: 'ecommerce',
      keywords: [
        'ecommerce',
        'retail',
        'api',
        'asp.net',
        'c#',
        'cloud run',
        'inventory',
        'checkout',
        'otel',
        'telemetry',
      ],
      summary:
        'Shelton led the lifecycle for a C# and ASP.NET Core retail service that handles inventory and checkout flows. He owned schema modeling, API contracts, CI or CD, and instrumentation for on-call visibility.',
      highlights: [
        'He shipped 27 authenticated endpoints for catalogs, carts, and immutable price history with role-aware policies and request validation middleware.',
        'He designed Cloud SQL tables with foreign keys and history tables, plus background jobs that reconcile stock deltas and emit metrics.',
        'He added OpenTelemetry tracing and structured logs so latency and error budget burn could be seen on dashboards, reducing weekly incidents from 7 to 2.',
      ],
      followUp: 'Do you want more detail on the API design, the data model, or the observability side of that project?',
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
        'Shelton built a database-first ML system for predicting whether NFL quarterbacks will throw touchdowns in a matchup. The workflow covers ingestion, feature engineering, model training, evaluation, and a Streamlit interface for what-if analysis.',
      highlights: [
        'He designed a SQLite schema and loaders for 1,536 games with referential integrity and incremental update support.',
        'He engineered 42 features covering quarterback form, defensive pressure, red-zone efficiency, and weather context, then automated scaling and imputation.',
        'He benchmarked logistic regression against XGBoost and built an ensemble that reached 88 percent accuracy and 0.91 ROC-AUC, then exposed SHAP explanations in the UI.',
      ],
      followUp: 'Do you want the data pipeline view, the model-performance view, or the product UI view of that project?',
    },
    {
      id: 'invoice',
      keywords: [
        'invoice',
        'financial',
        'mysql',
        'java',
        'jdbc',
        'reporting',
        'csv',
        'database',
        'pdf',
      ],
      summary:
        'Shelton converted a manual invoice reconciliation workflow into a Java and MySQL system with automated audit trails and reporting. The project emphasizes clean relational design, import reliability, and runtime improvement.',
      highlights: [
        'He modeled invoices, companies, line items, and people in third normal form with foreign key, unique, not null, and check constraints.',
        'He wrote JDBC importers with prepared statements and batching, then indexed critical columns to cut full-report runtime by 85 percent from 1.2 seconds to 180 milliseconds.',
        'He built CLI tooling that exports summary and detail PDFs so finance teams can verify totals and taxes quickly.',
      ],
      followUp: 'Do you want more detail on the schema design, the Java import pipeline, or the reporting workflow?',
    },
    {
      id: 'experience',
      keywords: [
        'experience',
        'leadership',
        'work history',
        'thrasher',
        'tutor',
        'community',
        'colorstack',
        'nsbe',
      ],
      summary:
        "Shelton's experience combines independent software building with operational leadership and teaching. That mix shows up in how he plans work, communicates progress, and focuses on measurable outcomes.",
      highlights: [
        'As an independent software builder, he owns architecture, deployments, monitoring, documentation, and collaboration-ready repos for the projects on this site.',
        'As a lead installer at Thrasher, he coordinated 18 installations with zero safety incidents and introduced QA checklists and standups that surfaced issues early.',
        'As a math tutor and community mentor, he built study plans, tracked performance, and coached peers on resumes, SQL, ER modeling, and interview prep.',
      ],
      followUp: 'Do you want the engineering experience, leadership experience, or mentorship angle?',
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
        'If you want to review code first, each featured project links to its repository and live demo or case study.',
      ],
      followUp: 'Do you want contact details, repo links, or the best project to review first?',
    },
  ],
};
