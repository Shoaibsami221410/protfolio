"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Home, 
  User, 
  Code, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Tags, 
  Image as ImageIcon, 
  MessageSquare, 
  Link as LinkIcon, 
  Navigation, 
  LayoutTemplate, 
  Settings, 
  Users, 
  Activity,
  FileText,
  Search,
  Globe
} from "lucide-react";

const sidebarGroups = [
  {
    title: "Dashboard",
    items: [
      { name: "Overview", href: "/admin", icon: LayoutDashboard },
    ]
  },
  {
    title: "Content",
    items: [
      { name: "Homepage", href: "/admin/homepage", icon: Home },
      { name: "About", href: "/admin/about", icon: User },
      { name: "Skills", href: "/admin/skills", icon: Code },
      { name: "Experience", href: "/admin/experience", icon: Briefcase },
      { name: "Education", href: "/admin/education", icon: GraduationCap },
    ]
  },
  {
    title: "Projects",
    items: [
      { name: "All Projects", href: "/admin/projects", icon: FolderGit2 },
      { name: "Categories & Tags", href: "/admin/projects/categories", icon: Tags },
    ]
  },
  {
    title: "Media",
    items: [
      { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    ]
  },
  {
    title: "Communication",
    items: [
      { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    ]
  },
  {
    title: "Website",
    items: [
      { name: "Social Links", href: "/admin/socials", icon: LinkIcon },
      { name: "Navigation", href: "/admin/navigation", icon: Navigation },
      { name: "Footer", href: "/admin/footer", icon: LayoutTemplate },
      { name: "SEO", href: "/admin/seo", icon: Search },
      { name: "Resume", href: "/admin/resume", icon: FileText },
    ]
  },
  {
    title: "System",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
      { name: "Admin Users", href: "/admin/users", icon: Users },
      { name: "Activity Log", href: "/admin/activity", icon: Activity },
    ]
  }
];

export function AdminSidebar({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (val: boolean) => void 
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0510] border-r border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30 mr-3">
            <span className="font-mono text-primary font-bold">Σ</span>
          </div>
          <span className="font-semibold text-white tracking-wide text-sm">CONTROL CENTER</span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {sidebarGroups.map((group, i) => (
            <div key={i}>
              <h3 className="text-xs font-mono text-muted/60 mb-3 px-2 uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-muted hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted"}`} />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 shrink-0">
          <a 
            href="/" 
            target="_blank" 
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border border-white/10 text-sm text-muted hover:text-white hover:bg-white/5 transition-colors"
          >
            <Globe className="w-4 h-4" />
            View Website
          </a>
        </div>
      </aside>
    </>
  );
}
