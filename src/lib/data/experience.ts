export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  logo?: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: "East West University Sports Club",
    role: "Creative and IT Executive",
    period: "2024 - 2025",
    description: "Serving as Creative and IT Executive. Previously organized Football Fiesta 2024, 5K run, and Winter Carnival 2024. Appointed as Line Judge for Winter Smash 2025.",
    technologies: ["Management", "Event Organization", "IT", "Teamwork"],
  },
  {
    company: "East West University Programming Club",
    role: "Organizer",
    period: "Recent",
    description: "Organizer of Game con Season 1 (Powered by Honda) and various events for the East West University CSE department.",
    technologies: ["Event Management", "Leadership", "Communication"],
  },
  {
    company: "Kids time khilgaon",
    role: "Assistant Teacher",
    period: "Previous",
    description: "Served as an Assistant Teacher specializing in storytelling and early childhood guidance.",
    technologies: ["Teaching", "Communication", "Mentoring"],
  }
];
