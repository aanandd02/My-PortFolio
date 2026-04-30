const DEFAULT_RESUME_FALLBACK = "Resume is available on request along with project walkthrough highlights.";

const PORTFOLIO_SCOPE_KEYWORDS = [
  "anand",
  "aanand",
  "he",
  "his",
  "him",
  "your",
  "you",
  "profile",
  "summary",
  "about",
  "experience",
  "intern",
  "internship",
  "synup",
  "brandx",
  "project",
  "projects",
  "skill",
  "skills",
  "backend",
  "api",
  "system design",
  "architecture",
  "debug",
  "debugging",
  "reliability",
  "resume",
  "cv",
  "college",
  "education",
  "degree",
  "b.tech",
  "btech",
  "iiit",
  "nagpur",
  "school",
  "contact",
  "interview",
  "email",
  "phone",
  "linkedin",
  "github",
  "ai",
  "llm",
  "groq",
  "aws",
  "lambda",
  "mysql",
  "mongodb",
  "elasticsearch",
  "react",
  "node",
  "express",
  "python",
  "developer",
  "engineer",
  "hire",
  "fit",
  "sikhoflow",
  "sikho",
  "flow",
  "codesavant",
  "codesavant-ai",
  "reservemate",
  "anubhav",
  "billing",
  "mealstack",
  "hotel booking",
  "svr",
  "shree vishwanath",
  "roadways",
  "hr",
  "automation",
  "portfolio",
  "everything",
  "all",
];

const OUT_OF_SCOPE_REPLY =
  "I can only help with questions about Anand, his experience, projects, skills, resume, or contact details.";

const portfolioContext = `
Candidate name: Anand
Role focus: Aspiring Software Engineer and Backend Developer.
Tone rule: Reply in clear, natural, professional English. Be descriptive when asked about projects.
Scope rule: Answer only questions about Anand's profile, experience, and projects. If the question is entirely outside Anand's background, reply with: "${OUT_OF_SCOPE_REPLY}"
Evidence rule: Do not invent details. Use only the resume/profile facts below.
Resume rule: Treat the following details as the source of truth for Anand's resume-style summary, experience, projects, skills, education, and contact information.

About:
- Anand is a backend-focused engineer who enjoys building practical products and solving problems.
- He is comfortable with APIs, backend workflows, cloud tools, and AI integrations.

Experience:
- Backend Engineer Intern at Synup (Jan 2026 - Mar 2026): Worked on serverless microservices using AWS Lambda, MySQL, Elasticsearch, and S3. Resolved a critical race condition in the Prospect-Up pipeline. Built an Outscraper-powered ingestion pipeline for optimized search.
- Backend Developer Intern at BrandX (Oct 2024 - Jan 2025): Built scalable backend APIs for Kumbh Mela 2024 Cottage Booking System, supporting 50K+ users and reducing latency by 40% using MongoDB optimization.

Projects (Featured in this Portfolio):
1. SikhoFlow (2026): AI-powered infrastructure for educational institutions. Features personalized tutoring, automated assessments, and administrative excellence in one ecosystem. (AI/LLMs, Modern Frontend).
2. AI HR Email Automation (Nov 2025): Automates personalized HR outreach emails using Google Sheets contacts, Groq-based subject/body generation, Gmail delivery, and local JSON duplicate prevention. (Node.js, Groq SDK, Google Sheets API, Nodemailer).
3. Shree Vishwanath Roadways (SVR) (Oct 2025): Official single-page logistics marketing website with hero video, fleet gallery lightbox, testimonial carousel, contact/maps, and WhatsApp actions. (React 19, Framer Motion, Tailwind).
4. CodeSavant-AI (Jan 2025 - Feb 2025): AI-powered code review app where users submit code and get structured feedback sections for mistakes, improvements, and corrected code via Groq API. (React, Auth0, Node.js, Express, Groq, Serverless).
5. ReserveMate (Nov 2024 - Jan 2025): Full-stack restaurant reservation app featuring validated booking flow, success feedback UX, and DynamoDB-based reservation storage. (React 18, Node.js, Express, AWS DynamoDB, AWS Lambda).
6. Anubhav Billing (2025): Billing and pharmacy management project focused on streamlined invoice handling and day-to-day medical store operations. (React.js, Node.js, Express.js, MongoDB).
7. MealStack (Mar 2025 - Apr 2025): Secure backend with JWT auth and role-based access for food ordering operations. (Node.js, Express.js, MongoDB, JWT).
8. Hotel Booking API (May 2025 - Jun 2025): REST API backend for hotel management with schema validation and role-based filtering. (Node.js, Express.js, MongoDB, Mongoose).

Skills:
- Languages: C, Java, JavaScript, Python, SQL.
- Backend: Node.js, Express.js, REST APIs, JWT Auth, Microservices, System Design.
- Databases & Search: MySQL, MongoDB, Elasticsearch, DynamoDB.
- Cloud: AWS, Lambda, EC2, S3, API Gateway, SQS, SNS, CloudWatch, Serverless.
- AI & LLMs: LangChain, Hugging Face, Prompt Engineering, Groq APIs.
- Frontend: React, HTML, CSS, Tailwind.
- Tools: Git, GitHub, Docker, Postman.
- Extra: 400+ LeetCode problems solved.

Education:
- B.Tech in Electronics and Communication Engineering from Indian Institute of Information Technology (IIIT), Nagpur. (Nov 2022 to Jun 2026).

Contact:
- Email: aanandd9076@gmail.com
- Phone: +91-9076823328
- LinkedIn: linkedin.com/in/aanandd02
- GitHub: github.com/aanandd02
`;

export function isPortfolioQuestion(question) {
  const normalized = question.toLowerCase();
  if (normalized.length > 3 && (normalized.includes("everything") || normalized.includes("all "))) return true;
  return PORTFOLIO_SCOPE_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

export function getFallbackReply(input, resumeUrl = "") {
  const text = input.toLowerCase();

  if (text.includes("30-second") || text.includes("summary") || text.includes("profile") || text.includes("everything") || text.includes("all ")) {
    return "Anand is a backend-focused engineer with hands-on experience in APIs, serverless systems, cloud workflows, and AI products. His portfolio features projects like CodeSavant-AI, ReserveMate, AI HR Email Automation, and SVR. He's interned at Synup and BrandX, building real-world scalable systems.";
  }

  if (text.includes("synup") || text.includes("intern") || text.includes("impact")) {
    return "At Synup, Anand worked on serverless backend systems with AWS Lambda, MySQL, Elasticsearch, and S3. He fixed a race condition in a critical pipeline and built an ingestion workflow that improved search quality and profile reliability.";
  }

  if (text.includes("project") || text.includes("all ") || text.includes("portfolio")) {
    return "Anand's portfolio includes several featured projects: 1) SikhoFlow (AI educational infrastructure), 2) AI HR Email Automation, 3) Shree Vishwanath Roadways (SVR), 4) CodeSavant-AI, 5) ReserveMate, 6) Anubhav Billing, 7) MealStack, and 8) Hotel Booking API. Let me know if you want details on any specific one!";
  }

  if (text.includes("sikhoflow") || text.includes("sikho") || text.includes("flow")) {
    return "SikhoFlow is an AI-powered infrastructure for modern educational institutions, featuring personalized tutoring, automated assessments, and administrative analytics within a seamless ecosystem.";
  }

  if (text.includes("codesavant")) {
    return "CodeSavant-AI is an AI-powered code review app using React, Node.js, and the Groq API. It takes user code, analyzes it for mistakes, and provides structured feedback and corrected code.";
  }

  if (text.includes("reservemate")) {
    return "ReserveMate is a full-stack restaurant reservation app built with React, Node.js, and AWS (Lambda and DynamoDB). It handles the complete booking flow with validated success UX.";
  }

  if (text.includes("anubhav") || text.includes("billing")) {
    return "Anubhav Billing is a pharmacy management and billing system built with React, Node.js, and MongoDB, focused on streamlining invoice generation and day-to-day operations.";
  }

  if (text.includes("system design") || text.includes("scale") || text.includes("architecture")) {
    return "Anand has a strong base in backend architecture, including service separation, event-driven workflows, concurrency handling, and scalable API design. His internship work shows that he can think beyond just writing endpoints.";
  }

  if (text.includes("reliability") || text.includes("debug") || text.includes("issue")) {
    return "He approaches debugging in a structured way: understand the failure, isolate the bottleneck, and fix it with data-backed reasoning. His Synup work is a good example because he handled a real race-condition issue in production-like systems.";
  }

  if (text.includes("day one") || text.includes("ready") || text.includes("hire")) {
    return "He is internship-ready because he can contribute quickly in backend and API work, communicate clearly, and work comfortably with tools like Git, Docker, Postman, AWS, Node.js, and databases.";
  }

  if (text.includes("ai") || text.includes("llm") || text.includes("automation")) {
    return "Anand uses AI in practical ways. In projects like AI HR Email Automation and CodeSavant-AI, he connected model outputs to real product workflows instead of using AI just for demo value.";
  }

  if (text.includes("skill") || text.includes("backend") || text.includes("tech stack")) {
    return "His core strengths include Node.js, Express, Python, REST APIs, JWT auth, MySQL, MongoDB, Elasticsearch, AWS serverless tools, and practical AI integrations. He is strongest on backend engineering.";
  }

  if (text.includes("resume") || text.includes("cv")) {
    return resumeUrl ? `You can view Anand's resume here: ${resumeUrl}` : DEFAULT_RESUME_FALLBACK;
  }

  if (
    text.includes("college") ||
    text.includes("education") ||
    text.includes("degree") ||
    text.includes("b.tech") ||
    text.includes("btech")
  ) {
    return "Anand is pursuing his B.Tech in Electronics and Communication Engineering from the Indian Institute of Information Technology (IIIT), Nagpur (Nov 2022 - Jun 2026).";
  }

  if (text.includes("contact") || text.includes("interview") || text.includes("reach")) {
    return "You can contact Anand at aanandd9076@gmail.com, +91-9076823328, LinkedIn (linkedin.com/in/aanandd02), or GitHub (github.com/aanandd02).";
  }

  if (text.includes("about") || text.includes("anand")) {
    return "Anand is a backend-first engineer with practical experience in APIs, cloud workflows, and product-focused development. He is especially strong in backend systems where reliability and clear execution matter.";
  }

  if (!isPortfolioQuestion(text)) {
    return OUT_OF_SCOPE_REPLY;
  }

  return "You can ask about Anand's experience, his featured projects (like CodeSavant-AI, ReserveMate, SVR), his skills, education, resume, or contact details.";
}

export async function fetchPortfolioAssistantReply({ question, messages = [], resumeUrl = "" }) {
  if (!isPortfolioQuestion(question)) {
    return OUT_OF_SCOPE_REPLY;
  }

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const model = import.meta.env.VITE_GROQ_MODEL || "llama-3.3-70b-versatile";

  if (!apiKey) {
    return getFallbackReply(question, resumeUrl);
  }

  const recentMessages = messages.slice(-6).map((message) => ({
    role: message.role === "bot" ? "assistant" : "user",
    content: message.text,
  }));

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      max_tokens: 650,
      messages: [
        {
          role: "system",
          content: `${portfolioContext}\nResume URL: ${resumeUrl || "Not currently set."}`,
        },
        ...recentMessages,
        {
          role: "user",
          content: question,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq request failed with status ${response.status}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content?.trim();

  return text || getFallbackReply(question, resumeUrl);
}
