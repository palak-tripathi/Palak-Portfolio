export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  imageUrl: string;
  pdfUrl?: string;
  description?: string;
  skills?: string[];
  sortOrder?: number;
  published: boolean;
  createdAt?: string;
}

export const INITIAL_CERTIFICATES: Certificate[] = [
  // --- 1. WORKSHOP ---
  {
    id: "cert-1",
    title: "Technical Workshop Participation",
    issuer: "Workshop Organizer",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/cert1.jpeg",
    pdfUrl: "/assets/cert1.jpeg",
    description: "Successfully attended and participated in the technical workshop program.",
    skills: ["Tech Workshop", "Learning"],
    sortOrder: 1,
    published: true,
    createdAt: new Date().toISOString(),
  },
  // --- 2. HACKATHON TOP 20 ---
  {
    id: "cert-2",
    title: "Hackathon Top 20 Finalist",
    issuer: "Hackathon Organizer",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/cert4.jpeg",
    pdfUrl: "/assets/cert4.jpeg",
    description: "Secured a position in the Top 20 teams in the competitive coding hackathon.",
    skills: ["Problem Solving", "Coding"],
    sortOrder: 2,
    published: true,
    createdAt: new Date().toISOString(),
  },
  // --- 3. GRAPHIC DESIGN COMPETITION - 2ND PRIZE ---
  {
    id: "cert-3",
    title: "Graphic Design Competition - 2nd Prize",
    issuer: "Design Committee",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/cert5.jpeg",
    pdfUrl: "/assets/cert5.jpeg",
    description: "Won 2nd prize in college-level graphic design and creative art competition.",
    skills: ["Graphic Design", "Creativity"],
    sortOrder: 3,
    published: true,
    createdAt: new Date().toISOString(),
  },
  // --- 4. GENERATIVE AI COURSE (LINKEDIN LEARNING) ---
  {
    id: "cert-4",
    title: "Generative AI Course Completion",
    issuer: "LinkedIn Learning",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/cert6.jpeg",
    pdfUrl: "/assets/cert6.jpeg",
    description: "Successfully completed professional learning course on Generative AI.",
    skills: ["Generative AI", "LLMs"],
    sortOrder: 4,
    published: true,
    createdAt: new Date().toISOString(),
  },
  // --- 5. MICROSOFT AI SKILLS FEST ---
  {
    id: "cert-5",
    title: "Microsoft AI Skills Fest Certificate",
    issuer: "Microsoft",
    issueDate: "2026",
    credentialUrl: "", // Yahan apna link daal sakti ho
    imageUrl: "/assets/cert7.jpeg",
    pdfUrl: "/assets/cert7.jpeg",
    description: "Successfully completed specialized training tracks in Microsoft AI Skills Fest.",
    skills: ["AI Technologies", "Cloud"],
    sortOrder: 5,
    published: true,
    createdAt: new Date().toISOString(),
  },
  // --- 6. SPEEDATHON HACKATHON ---
  {
    id: "cert-6",
    title: "Speedathon Hackathon Participation",
    issuer: "Speedathon Organizer",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/cert8.jpeg",
    pdfUrl: "/assets/cert8.jpeg",
    description: "Participated and built rapid prototype solution in the Speedathon hackathon.",
    skills: ["Rapid Prototyping", "Teamwork"],
    sortOrder: 6,
    published: true,
    createdAt: new Date().toISOString(),
  },
  // --- 7. HACKFINITY 3.0 (NATIONAL LEVEL TOP 10, TAMIL NADU) ---
  {
    id: "cert-7",
    title: "Hackfinity 3.0 - National Level Top 10",
    issuer: "Hackfinity 3.0, Tamil Nadu",
    issueDate: "2026",
    credentialUrl: "",
    imageUrl: "/assets/cert9.jpeg",
    pdfUrl: "/assets/cert9.jpeg",
    description:
      "Secured position in the Top 10 nationally at Hackfinity 3.0 hackathon in Tamil Nadu.",
    skills: ["Full-Stack", "Innovation", "National Level"],
    sortOrder: 7,
    published: true,
    createdAt: new Date().toISOString(),
  },
  // --- 8. DELOITTE VIRTUAL INTERNSHIP ---
  {
    id: "cert-deloitte",
    title: "Deloitte Virtual Internship Certificate",
    issuer: "Deloitte",
    issueDate: "2026",
    credentialUrl: "", // Yahan apna link daal sakti ho
    imageUrl: "/assets/deloitte.jpg",
    pdfUrl: "/assets/deloitte.jpg",
    description: "Successfully completed professional virtual internship program with Deloitte.",
    skills: ["Professional Training", "Corporate Tasks"],
    sortOrder: 8,
    published: true,
    createdAt: new Date().toISOString(),
  },
];

const STORAGE_KEY = "palak_certificates_v13_direct_fix";

export function loadCertificates(): Certificate[] {
  return INITIAL_CERTIFICATES;
}

export async function fetchPersistentCertificates(): Promise<Certificate[]> {
  return INITIAL_CERTIFICATES;
}

export async function saveCertificates(certificates: Certificate[]): Promise<boolean> {
  return true;
}
