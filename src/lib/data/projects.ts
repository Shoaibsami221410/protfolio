export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  year: string;
  status: string;
  technologies: string[];
  image?: string;
  iframeUrl?: string;
  gallery?: string[];
  github?: string;
  liveUrl?: string;
  featured: boolean;
  problem?: string;
  solution?: string;
  features?: string[];
  challenges?: string;
  results?: string;
  architecture?: string;
}

export const projects: Project[] = [
  {
    slug: "nova-ai-pet",
    title: "NOVA - Multimodal AI Pet",
    shortDescription: "A personalized AI companion with computer vision, facial recognition, and agentic interaction capabilities.",
    description: "Developed a complex multimodal AI system designed to act as a personalized digital pet. The system integrates advanced computer vision to recognize registered users, detect expressions, and analyze behavior. It features a persistent memory system and web-based UI ('Pippo' interface) to interact proactively with its environment.",
    category: "AI / ML",
    year: "2026",
    status: "Completed",
    technologies: ["Python", "OpenCV", "FastAPI", "React", "Machine Learning", "Agentic AI"],
    featured: true,
    problem: "Most modern AI assistants are strictly reactive, disembodied text boxes. They lack spatial awareness, visual perception, and the ability to maintain a persistent, evolving personality over time, making interactions feel unnatural and disconnected from the user's real-world environment.",
    solution: "Engineered a stateful, multimodal architecture that bridges physical and digital spaces. By combining real-time webcam streams with facial recognition and an LLM-driven personality engine, NOVA can perceive its surroundings, recognize specific users, and proactively initiate interactions without waiting for a prompt.",
    architecture: "The system is decoupled into a high-performance Python/FastAPI backend handling the intensive computer vision (OpenCV) and LLM inference tasks, and a lightweight React frontend providing the visual 'Pippo' interface. This separation of concerns allows for asynchronous processing of video frames without blocking the UI rendering.",
    features: [
      "Real-time facial recognition & expression analysis", 
      "Agentic tool usage allowing the AI to search the web or control media autonomously", 
      "Vector-based persistent memory for contextual conversations over time", 
      "Web-based interactive UI with dynamic animations"
    ],
    challenges: "A major hurdle was optimizing the real-time video stream processing. Running continuous facial recognition alongside LLM inference caused significant blocking on the main thread. This was resolved by implementing asynchronous task queues and delegating frame processing to background worker threads, ensuring the UI remained fluid.",
    results: "Successfully created an AI companion that feels 'alive' and responsive. The architecture handles sustained visual processing at >30 FPS while maintaining sub-second latency for conversational responses."
  },
  {
    slug: "kidstime-lms",
    title: "KidsTime Khilgaon LMS",
    shortDescription: "A full-stack Web-Based Learning Management and Administrative System for an educational institute.",
    description: "Architected and developed a comprehensive Learning Management System (LMS) for KidsTime Khilgaon. The platform includes a public-facing portal for students and parents, alongside a secure administrative dashboard for managing courses, teachers, and school events. Implemented robust Row Level Security (RLS) policies and complete End-to-End testing to ensure data integrity.",
    category: "Full Stack",
    year: "2026",
    status: "Completed",
    technologies: ["Next.js", "React", "Tailwind CSS", "Supabase", "PostgreSQL", "Playwright", "Vitest"],
    featured: true,
    problem: "The institute faced severe operational bottlenecks relying on manual spreadsheets to manage hundreds of students, parents, and teachers across multiple curriculum branches. This resulted in disconnected communication, lack of centralized progress tracking, and highly unsecured payment and enrollment ledgers.",
    solution: "Designed and deployed a highly secure, cloud-native CRM and Learning Management System. It completely digitized their workflow, providing distinct, secure portals for administrators, teachers, and parents to interact, track progress, and manage educational assets in real-time.",
    architecture: "Leveraged a serverless Next.js edge-rendering architecture backed by a Supabase PostgreSQL database. This setup utilized strictly enforced Row Level Security (RLS) policies directly at the database level to ensure that multi-tenant user data (parents vs. admins) was mathematically isolated and secure.",
    features: [
      "Role-Based Access Control (RBAC) separating Admin, Teacher, and Parent interfaces", 
      "Complex CRUD pipelines for dynamic Course, Module, and User management", 
      "Secure cloud asset storage for curriculum media distribution", 
      "Comprehensive E2E Testing with Playwright to guarantee critical path reliability"
    ],
    challenges: "Synchronizing state across multiple concurrent administrative users without causing race conditions in the database was a significant challenge. I implemented optimistic UI updates coupled with strict database constraints and transaction rollbacks to maintain absolute data integrity.",
    results: "Reduced administrative overhead by an estimated 60%, fully digitizing their enrollment and tracking process while providing a scalable foundation capable of handling future branch expansions."
  },
  {
    slug: "subway-runner-web",
    title: "Subway Runner Web Game",
    shortDescription: "An interactive browser-based endless runner game featuring dynamic obstacles and responsive controls.",
    description: "Developed an endless runner game from scratch using pure vanilla web technologies. Designed the entire game loop, collision detection, and custom CSS animations to create a smooth, performance-optimized playing experience directly in the browser.",
    category: "Web",
    year: "2026",
    status: "Completed",
    technologies: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
    featured: true,
    iframeUrl: "/subway-runner/index.html",
    problem: "Developing performant, 60fps interactive graphics and collision systems purely in the browser is notoriously difficult without relying on heavyweight, black-box game engines like Unity or Unreal.",
    solution: "Built a custom, lightweight 2D game engine utilizing pure JavaScript and the HTML5 Canvas API. The engine handles its own rendering loop, memory management, and physics calculations, demonstrating a deep understanding of core web rendering mechanics.",
    architecture: "The game utilizes a strict Object-Oriented design pattern. Entities (player, obstacles, background) are decoupled and managed by a central GameController that handles the `requestAnimationFrame` loop, delta-time calculations for frame-independent movement, and state management.",
    features: [
      "Frame-independent physics engine ensuring consistent speed across different monitor refresh rates", 
      "Procedural generation algorithms for infinite dynamic obstacles", 
      "Optimized bounding-box collision detection", 
      "Responsive keyboard & touch event listeners"
    ],
    challenges: "A major technical hurdle was avoiding browser garbage collection pauses (jank) during rendering. I solved this by implementing object pooling—reusing obstacle objects instead of continuously creating and destroying them in memory.",
    results: "Achieved a locked 60fps rendering performance even on lower-end mobile browsers, proving that high-performance interactive media can be built using strictly native web APIs."
  }
];

export const projectCategories = ["All", "AI / ML", "Web", "Full Stack", "Computer Vision", "Tools"];
