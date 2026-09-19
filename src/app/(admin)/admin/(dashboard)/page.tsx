import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StatCard } from "@/components/admin/dashboard/StatCard";
import { 
  FolderGit2, 
  FileText, 
  Eye, 
  Code, 
  Image as ImageIcon, 
  MessageSquare,
  Plus,
  Settings,
  Globe
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  // In Phase 5, we mock the stats until the DB is fully populated
  // Future phases will fetch this dynamically from Supabase
  const stats = [
    { title: "Total Projects", value: "12", icon: FolderGit2, desc: "3 in draft" },
    { title: "Published", value: "9", icon: Eye, desc: "Visible to public" },
    { title: "Skills", value: "24", icon: Code, desc: "Across 4 categories" },
    { title: "Media Files", value: "142", icon: ImageIcon, desc: "Images & Documents" },
    { title: "Experience", value: "4", icon: FileText, desc: "Career timeline entries" },
    { title: "Unread Messages", value: "2", icon: MessageSquare, desc: "From contact form" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-muted">Welcome to the Portfolio Control Center.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            View Website
          </Link>
          <Link 
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)] text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Two Column Layout for Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
          <div className="bg-card border border-white/5 rounded-xl p-4 space-y-2">
            <Link href="/admin/projects/new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-muted hover:text-white transition-colors">
              <div className="p-2 rounded bg-primary/20 text-primary"><Plus className="w-4 h-4" /></div>
              <span className="text-sm font-medium">Create New Project</span>
            </Link>
            <Link href="/admin/experience" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-muted hover:text-white transition-colors">
              <div className="p-2 rounded bg-primary/20 text-primary"><FileText className="w-4 h-4" /></div>
              <span className="text-sm font-medium">Add Experience Entry</span>
            </Link>
            <Link href="/admin/media" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-muted hover:text-white transition-colors">
              <div className="p-2 rounded bg-primary/20 text-primary"><ImageIcon className="w-4 h-4" /></div>
              <span className="text-sm font-medium">Upload Media</span>
            </Link>
            <Link href="/admin/homepage" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-muted hover:text-white transition-colors">
              <div className="p-2 rounded bg-primary/20 text-primary"><Settings className="w-4 h-4" /></div>
              <span className="text-sm font-medium">Edit Homepage</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <Link href="/admin/activity" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="bg-card border border-white/5 rounded-xl p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ActivityIcon className="w-12 h-12 text-white/10 mb-4" />
              <h3 className="text-lg font-medium text-white mb-1">No recent activity</h3>
              <p className="text-sm text-muted max-w-sm">
                As you manage your portfolio, publish projects, and update your resume, your activity log will appear here.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Temporary icon for empty state
function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

