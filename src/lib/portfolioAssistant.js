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
];

const OUT_OF_SCOPE_REPLY =
  "I can only help with questions about Anand, his experience, projects, skills, resume, or contact details.";

const portfolioContext = `
Candidate name: Anand
Role focus: Aspiring Software Engineer and Backend Developer.
Tone rule: Reply in clear, natural, professional English.
Scope rule: Answer only questions about Anand's profile. If the question is outside Anand's background, reply with: "${OUT_OF_SCOPE_REPLY}"
Evidence rule: Do not invent details. Use only the resume/profile facts below.
Resume rule: Treat the following details as the source of truth for Anand's resume-style summary, experience, projects, skills, education, and contact information.

About:
- Anand is a backend-focused engineer who enjoys building practical products and solving problems.
- He is comfortable with APIs, backend workflows, cloud tools, and AI integrations.

Experience:
- Backend Engineer Intern at Synup, Jan 2026 to Present.
- Works on serverless microservices using AWS Lambda, MySQL, Elasticsearch, and S3 in an event-driven fan-out system.
- Resolved a critical race condition in the Prospect-Up pipeline with consistent MySQL transactional updates across concurrent services.
- Built a quarterly Outscraper-powered ingestion pipeline for optimized search and reliable profile generation.
- Backend Developer Intern at BrandX, Oct 2024 to Jan 2025.
- Built scalable backend APIs for booking, authentication, and admin dashboards in the Kumbh Mela 2024 Cottage Booking System.
- Supported 50K+ users and reduced latency by 40% under 10K+ concurrent requests by improving MongoDB queries, payment workflows, and API responses.

Projects:
- AI HR Email Automation: Node.js, Groq SDK, Google Sheets API, Nodemailer, dotenv. Automates personalized HR outreach emails.
- CodeSavant-AI: AI-powered code review app using React, Node.js, Express, Auth0, Groq API, and serverless patterns.
- ReserveMate: Restaurant reservation app with React frontend, Express API, DynamoDB, and AWS Lambda.
- Anubhav Billing: Billing and pharmacy management project built with React, Node.js, Express.js, and MongoDB.
- MealStack: Secure backend with JWT auth and role-based access for food ordering operations.
- Hotel Booking API: REST API backend for hotel management with schema validation and role-based filtering.
- Shree Vishwanath Roadways (SVR): Official logistics marketing website with hero video, fleet gallery, testimonials, maps, and PWA caching.

Skills:
- Languages: C, Java, JavaScript, Python, SQL.
- Backend: Node.js, Express.js, REST APIs, JWT Auth, Microservices, System Design.
- Databases and Search: MySQL, MongoDB, Elasticsearch.
- Cloud: AWS, Lambda, EC2, S3, API Gateway, SQS, SNS, CloudWatch, Serverless, Event-Driven systems.
- AI and LLM tools: LangChain, Hugging Face, Prompt Engineering, Groq-based integrations.
- Frontend familiarity: React, HTML, CSS, Bootstrap.
- Tools: Git, GitHub, Docker, Postman.
- Additional note: 400+ LeetCode.

Education:
- B.Tech in Electronics and Communication Engineering from Indian Institute of Information Technology, Nagpur.
- Study period: Nov 2022 to Jun 2026.
- Relevant coursework: Data Structures, Algorithms, Operating Systems, OOP, Computer Networks, Database Management Systems.
- Class 10 and Class 12 completed from SMT D Singh, Doorwani Nagar, Naini, Prayagraj, Uttar Pradesh.

Contact:
- Email: aanandd9076@gmail.com
- Phone: +91-9076823328
- LinkedIn: linkedin.com/in/aanandd02
- GitHub: github.com/aanandd02
`;

export function isPortfolioQuestion(question) {
  const normalized = question.toLowerCase();
  return PORTFOLIO_SCOPE_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

export function getFallbackReply(input, resumeUrl = "") {
  const text = input.toLowerCase();

  if (text.includes("30-second") || text.includes("summary") || text.includes("profile")) {
    return "Anand is a backend-focused engineer with hands-on experience in APIs, serverless systems, cloud workflows, and AI-backed products. He learns fast, ships practical solutions, and has already delivered real impact during internships.";
  }

  if (text.includes("synup") || text.includes("intern") || text.includes("impact")) {
    return "At Synup, Anand worked on serverless backend systems with AWS Lambda, MySQL, Elasticsearch, and S3. He fixed a race condition in a critical pipeline and built an ingestion workflow that improved search quality and profile reliability.";
  }

  if (text.includes("project") || text.includes("ownership") || text.includes("prove")) {
    return "His strongest backend proof comes from AI HR Email Automation, ReserveMate, MealStack, and Hotel Booking API. These projects show API design, authentication, backend workflows, and solid delivery across real product use cases.";
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
    return "Anand is pursuing B.Tech in Electronics and Communication Engineering from Indian Institute of Information Technology, Nagpur.";
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

  return "You can ask about Anand's experience, projects, skills, education, resume, interview readiness, or contact details.";
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
      temperature: 0.2,
      max_tokens: 220,
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
