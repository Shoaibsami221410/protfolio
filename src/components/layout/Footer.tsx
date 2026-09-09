import Link from "next/link";
import { socials } from "@/lib/data/socials";

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-32 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-foreground text-sm tracking-widest font-mono">
            SS.
          </Link>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Shoaib Sami. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground hover:-translate-y-1 transition-all duration-300"
              aria-label={social.name}
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
