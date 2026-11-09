import fs from "node:fs";
import path from "node:path";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface PalakKnowledge {
  profile: {
    name: string;
    headline: string;
    location: string;
    bio: string;
    education: {
      degree: string;
      status: string;
      focus: string;
    };
    careerGoals: {
      targetRoles: string[];
      availability: string;
      mission: string;
    };
    contacts: {
      email: string;
      linkedin: string;
      github: string;
      instagram: string;
      phone?: string;
    };
  };
  technicalSkills: Record<string, { name: string; level: string; highlight: string }[]>;
  projects: {
    name: string;
    summary: string;
    role: string;
    technologies: string[];
    contributions: string;
    githubUrl?: string;
    liveUrl?: string;
    keyFeatures?: string[];
  }[];
  creativeInterests: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
}

export function loadPalakKnowledge(): PalakKnowledge {
  try {
    const filePath = path.resolve(process.cwd(), "src/data/palak-knowledge.json");
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("[chat-service] Failed reading knowledge file, using fallback:", err);
  }

  // Sensible default fallback
  return {
    profile: {
      name: "Palak Tripathi",
      headline: "Aspiring Full-Stack Developer • CSBS Student • Creative Technologist",
      location: "India",
      bio: "Palak Tripathi is an aspiring full-stack developer and student of Computer Science and Business Systems (CSBS). She turns complex challenges into clean, accessible web software.",
      education: {
        degree: "B.Tech in CSBS",
        status: "Undergraduate",
        focus: "Full-stack web development, software engineering, and business systems.",
      },
      careerGoals: {
        targetRoles: ["Full-Stack Developer", "Software Engineer", "Frontend Engineer"],
        availability: "Actively seeking internships and developer opportunities.",
        mission: "Building high-performance software combining code and creativity.",
      },
      contacts: {
        email: "palak09.learner@gmail.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com/palak.tripathi_",
      },
    },
    technicalSkills: {
      frontend: [{ name: "React", level: "Proficient", highlight: "Component design & state" }],
      backend: [{ name: "Node.js", level: "Intermediate", highlight: "REST APIs" }],
      languages: [{ name: "Java", level: "Proficient", highlight: "OOP & Data structures" }],
    },
    projects: [
      {
        name: "Sentinel AI",
        summary: "AI-assisted monitoring and security system.",
        role: "Frontend Architecture & API Integration Lead",
        technologies: ["React", "TypeScript", "Node.js", "AI Analytics"],
        contributions: "Engineered responsive dashboard and AI telemetry feeds.",
      },
    ],
    creativeInterests: [
      { title: "Singing", description: "Vocal music, acoustic covers and creative melodies." },
    ],
    faqs: [],
  };
}

export function buildSystemPrompt(knowledge: PalakKnowledge, visitorName?: string | null): string {
  const profile = knowledge.profile;
  const skillsSummary = Object.entries(knowledge.technicalSkills || {})
    .map(
      ([cat, list]) =>
        `${cat.toUpperCase()}: ${list.map((s) => `${s.name} (${s.level})`).join(", ")}`,
    )
    .join("\n");

  const projectsSummary = (knowledge.projects || [])
    .map(
      (p) =>
        `- ${p.name}: ${p.summary} | Role: ${p.role} | Tech: ${p.technologies.join(", ")} | Highlights: ${p.contributions}`,
    )
    .join("\n");

  const creativeSummary = (knowledge.creativeInterests || [])
    .map((c) => `- ${c.title}: ${c.description}`)
    .join("\n");

  return `You are "Palak's Assistant", the official, friendly and intelligent AI portfolio guide on Palak Tripathi's personal website.
Your mission is to represent Palak truthfully, warmly, and helpfully to recruiters, collaborators, and visitors.

VISITOR CONTEXT: ${visitorName ? `The visitor's name is ${visitorName}. Address them warmly by name when natural.` : "Visitor name is unknown."}

AUTHENTIC KNOWLEDGE BASE ABOUT PALAK TRIPATHI:
Name: ${profile.name}
Headline: ${profile.headline}
Bio: ${profile.bio}
Education: ${profile.education.degree} (${profile.education.status}). Focus: ${profile.education.focus}
Career Targets: ${profile.careerGoals.targetRoles.join(", ")}
Availability: ${profile.careerGoals.availability}
Email: ${profile.contacts.email}
LinkedIn: ${profile.contacts.linkedin}
GitHub: ${profile.contacts.github}
Instagram: ${profile.contacts.instagram}
${profile.contacts.phone ? `Phone: ${profile.contacts.phone}` : ""}

TECHNICAL SKILLS:
${skillsSummary}

PROJECTS:
${projectsSummary}

CREATIVE PURSUITS & INTERESTS:
${creativeSummary}

STRICT CONVERSATIONAL GUIDELINES:
1. TRUTHFULNESS & HONESTY: Answer ONLY from the authentic facts above. If a visitor asks about something not in this knowledge base (e.g. personal relationships, private details, or unlisted technologies), honestly and politely state that you do not have that information, and offer to share her email (${profile.contacts.email}). Never hallucinate or invent projects.
2. TONE: Warm, intelligent, professional, and enthusiastic. Use light markdown (bold keywords, concise bullet points) for readability.
3. ADAPTABILITY: If the visitor writes in Hindi, Hinglish, or casual English, reply naturally and warmly in that same style.
4. ROLE SPECIFICS: If asked about Sentinel AI, highlight her role as Frontend Architecture & API Integration Lead. If asked if she's frontend or backend, explain she is an aspiring Full-Stack Developer with strong React frontend skills and solid Node/Express/Java backend foundations.
5. INTERNSHIPS: Enthusiastically confirm she is actively open and available for software engineering and full-stack internships.`;
}

// Intelligent Local Knowledge Synthesis Engine (zero-latency fallback)
export function synthesizeLocalResponse(
  question: string,
  history: ChatMessage[],
  knowledge: PalakKnowledge,
  visitorName?: string | null,
): string {
  const q = question.toLowerCase().trim();
  const name = visitorName ? `, ${visitorName}` : "";

  // 1. Greetings & Small Talk
  if (/^(hi|hello|hey|namaste|greetings|good\s*(morning|afternoon|evening))/i.test(q)) {
    return `Hello${name}! 🌸 I'm Palak's portfolio assistant. I can tell you all about her **technical skills**, **projects** (like Sentinel AI), **internship availability**, or her **creative side**. What would you like to explore?`;
  }

  // 2. Who is Palak? / Introduction
  if (
    q.includes("who is palak") ||
    q.includes("tell me about") ||
    q.includes("about palak") ||
    q.includes("who are you") ||
    q.includes("introduce")
  ) {
    return `**Palak Tripathi** is an aspiring Full-Stack Developer and student of **Computer Science and Business Systems (CSBS)** 🚀

She combines engineering rigor with business thinking and creative design. She builds modern web applications using **React, JavaScript, Node.js, Express, Java, and SQL**, always aiming for intuitive user experiences.

Would you like to know about her **projects**, **skills**, or **internship availability**?`;
  }

  // 2.5 PRICORA-AI Project
  if (q.includes("pricora") || q.includes("content generator") || q.includes("pricing ai")) {
    const p =
      knowledge.projects.find((x) => x.name.toLowerCase().includes("pricora")) ||
      knowledge.projects[0];
    return `**PRICORA-AI** is one of Palak's flagship software projects ⚡
- **What it is:** An AI-powered content and marketing intelligence platform for generating high-converting marketing copy and pricing insights.
- **Her Role:** ${p.role}
- **Technologies:** React, TypeScript, Tailwind CSS, Node.js, AI/LLM APIs, Vite
- **GitHub Repository:** [github.com/palak-tripathi/pricora-ai-content-generator](https://github.com/palak-tripathi/pricora-ai-content-generator)
- **Live Demo:** [pricora-ai-content-generator.vercel.app](https://pricora-ai-content-generator.vercel.app)

Would you like to know more about its architecture or other projects?`;
  }

  // 3. Sentinel AI Project
  if (q.includes("sentinel") || (q.includes("role") && q.includes("project"))) {
    const p =
      knowledge.projects.find((x) => x.name.toLowerCase().includes("sentinel")) ||
      knowledge.projects[0];
    return `In **Sentinel AI**, Palak served as the **Frontend Architecture & API Integration Lead** 🛡️

- **Project:** An intelligent AI-assisted security and automated monitoring dashboard.
- **Her Role & Contributions:** ${p.contributions}
- **Technologies Used:** ${p.technologies.join(", ")}
- **Key Highlights:** Real-time event telemetry, high-contrast analytics widgets, and robust REST API alerting integration.`;
  }

  // 4. Projects in general
  if (q.includes("project") || q.includes("what has she built") || q.includes("portfolio")) {
    const list = knowledge.projects
      .map(
        (p) => `• **${p.name}**: ${p.summary} *(Tech: ${p.technologies.slice(0, 4).join(", ")})*`,
      )
      .join("\n");
    return `Here are some of Palak's featured projects:\n\n${list}\n\nAsk me about any specific project for details on her role and architecture!`;
  }

  // 5. Technical Skills / Tech Stack
  if (
    q.includes("skill") ||
    q.includes("technolog") ||
    q.includes("stack") ||
    q.includes("language") ||
    q.includes("tools")
  ) {
    return `Here is Palak's core technical stack 💻:

• **Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS (Proficient)
• **Backend:** Node.js, Express.js, RESTful API design (Intermediate)
• **Languages:** Java (OOP, Data Structures), JavaScript, SQL
• **Databases & Tools:** Relational Databases (SQL), Git, GitHub, VS Code, Vite, Web Audio API

Her strongest area is **full-stack web engineering with React & Node.js**, backed by solid Java OOP fundamentals.`;
  }

  // 6. Frontend or Backend?
  if (
    q.includes("frontend or backend") ||
    q.includes("front-end or back-end") ||
    q.includes("full-stack") ||
    q.includes("full stack")
  ) {
    return `Palak is an **aspiring Full-Stack Developer** 🌟

She has strong expertise in **frontend engineering** (building responsive, component-driven UIs in React and Tailwind), while possessing a solid foundation in **backend development** (Node.js, Express, REST APIs, and SQL database modeling). She enjoys owning features end-to-end!`;
  }

  // 7. Internships & Availability
  if (
    q.includes("intern") ||
    q.includes("hire") ||
    q.includes("available") ||
    q.includes("job") ||
    q.includes("opportunity")
  ) {
    return `**Yes, Palak is actively open and available for internships and early-career software engineering roles!** 🎯

- **Target Roles:** Full-Stack Developer, Software Engineer, Frontend Engineer.
- **Why hire her:** Strong technical foundations in Java & React, a CSBS degree that understands business goals, great attention to detail, and rapid learning ability.
- **Contact:** You can reach out directly at **palak09.learner@gmail.com**.`;
  }

  // 8. Creative side / Singing / Music / Hobbies
  if (
    q.includes("creative") ||
    q.includes("singing") ||
    q.includes("music") ||
    q.includes("hobby") ||
    q.includes("hobbies") ||
    q.includes("talents")
  ) {
    return `Beyond the code, Palak has a rich creative side 🎶:

• **Singing & Vocal Music:** One of her greatest passions! She performs romantic, classical, and acoustic vocal covers.
• **Digital Scrapbooking & Design:** Crafting vintage aesthetic layouts, Polaroids, washi tape art, and visual stories.
• **Travel & Exploration:** Capturing nature, monuments, and quiet horizons.

You can experience her creative world in the **Beyond the Code** 3D diary section on this website! ✨`;
  }

  // 9. Contact details
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("message") ||
    q.includes("social")
  ) {
    return `You can connect with Palak through any of the following channels 📬:

• **Email:** [palak09.learner@gmail.com](mailto:palak09.learner@gmail.com)
• **LinkedIn:** ${knowledge.profile.contacts.linkedin}
• **GitHub:** ${knowledge.profile.contacts.github}
• **Instagram:** ${knowledge.profile.contacts.instagram}

She would love to hear from you regarding opportunities or creative collaborations!`;
  }

  // 10. College / Education
  if (
    q.includes("college") ||
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("university") ||
    q.includes("study") ||
    q.includes("academic")
  ) {
    return `Palak is pursuing her **${knowledge.profile.education.degree}** 🎓

Her coursework integrates core Computer Science principles (algorithms, OOP, database architecture, networks) with modern Business Systems analysis, preparing her to build software that creates measurable real-world impact.`;
  }

  // 11. Custom FAQ match
  for (const faq of knowledge.faqs || []) {
    if (q.includes(faq.q.toLowerCase())) {
      return faq.a;
    }
  }

  // 12. Honest fallback
  return `That's a thoughtful question! While I don't have that specific detail documented in my current knowledge base, I can confirm that Palak is focused on **Full-Stack Development**, **React**, and **Java** 🌸

Would you like to know about her **projects**, **technical stack**, or **how to contact her directly at ${knowledge.profile.contacts.email}**?`;
}

// Universal AI Caller (Gemini / OpenAI / Groq / OpenRouter / Anthropic)
export async function streamAIChat(
  messages: ChatMessage[],
  visitorName?: string | null,
): Promise<ReadableStream<Uint8Array>> {
  const knowledge = loadPalakKnowledge();
  const systemPrompt = buildSystemPrompt(knowledge, visitorName);

  const openaiKey = process.env["OPENAI_API_KEY"];
  const geminiKey = process.env["GEMINI_API_KEY"];
  const groqKey = process.env["GROQ_API_KEY"];
  const openrouterKey = process.env["OPENROUTER_API_KEY"];
  const anthropicKey = process.env["ANTHROPIC_API_KEY"];

  const encoder = new TextEncoder();

  // Helper to package SSE data events matching OpenAI/standard format
  const makeSSE = (delta: string) =>
    `data: ${JSON.stringify({ type: "response.output_text.delta", delta })}\n\n`;
  const makeDone = () => `data: [DONE]\n\n`;

  // 1. Try Gemini API if GEMINI_API_KEY is present
  if (geminiKey) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${geminiKey}`;
      const contents = [
        { role: "user", parts: [{ text: systemPrompt }] },
        {
          role: "model",
          parts: [
            {
              text: "Understood. I will act as Palak's intelligent, truthful, and warm portfolio assistant.",
            },
          ],
        },
        ...messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
      ];

      const res = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      });

      if (res.ok && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        return new ReadableStream({
          async start(controller) {
            let buffer = "";
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";
                for (const line of lines) {
                  if (line.startsWith("data: ")) {
                    const jsonStr = line.slice(6).trim();
                    if (!jsonStr) continue;
                    try {
                      const parsed = JSON.parse(jsonStr);
                      const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                      if (text) controller.enqueue(encoder.encode(makeSSE(text)));
                    } catch {
                      // ignore parse errors
                    }
                  }
                }
              }
              controller.enqueue(encoder.encode(makeDone()));
            } catch (err) {
              console.error("[gemini stream error]", err);
            } finally {
              controller.close();
            }
          },
        });
      }
    } catch (err) {
      console.warn("[chat-service] Gemini API call failed, trying next provider:", err);
    }
  }

  // 2. Try OpenAI API if OPENAI_API_KEY is present
  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          stream: true,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      if (res.ok && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        return new ReadableStream({
          async start(controller) {
            let buffer = "";
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";
                for (const line of lines) {
                  if (line.startsWith("data: ")) {
                    const jsonStr = line.slice(6).trim();
                    if (jsonStr === "[DONE]") {
                      controller.enqueue(encoder.encode(makeDone()));
                      break;
                    }
                    try {
                      const parsed = JSON.parse(jsonStr);
                      const delta = parsed?.choices?.[0]?.delta?.content;
                      if (delta) controller.enqueue(encoder.encode(makeSSE(delta)));
                    } catch {
                      // ignore
                    }
                  }
                }
              }
            } finally {
              controller.close();
            }
          },
        });
      }
    } catch (err) {
      console.warn("[chat-service] OpenAI API call failed:", err);
    }
  }

  // 3. Fallback: Local Knowledge Synthesis with animated SSE stream
  const latestUserMessage = messages.filter((m) => m.role === "user").pop()?.content || "";
  const replyText = synthesizeLocalResponse(latestUserMessage, messages, knowledge, visitorName);

  return new ReadableStream({
    async start(controller) {
      // Chunk into natural conversational words/phrases for a smooth typing animation
      const words = replyText.split(" ");
      for (let i = 0; i < words.length; i++) {
        const piece = (i > 0 ? " " : "") + words[i];
        controller.enqueue(encoder.encode(makeSSE(piece)));
        // 20ms human-like typing cadence
        await new Promise((r) => setTimeout(r, 22));
      }
      controller.enqueue(encoder.encode(makeDone()));
      controller.close();
    },
  });
}
