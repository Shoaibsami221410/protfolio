"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { homepageSchema, type HomepageInput } from "@/lib/validations/homepage";
import { updateHomepageAction } from "./actions";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

export function HomepageForm({ initialData }: { initialData: any }) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm<HomepageInput>({
    resolver: zodResolver(homepageSchema),
    defaultValues: initialData || {
      hero_eyebrow: "Hello, I'm",
      hero_name: "Shoaib Sami",
      hero_primary_role: "Software Engineer",
      hero_secondary_role: "Machine Learning Enthusiast",
      hero_description: "Building intelligent things that solve real problems.",
      hero_cta_primary_text: "View Projects",
      hero_cta_primary_url: "#projects",
      hero_cta_secondary_text: "Contact Me",
      hero_cta_secondary_url: "#contact",
      hero_visibility: true,
    },
  });

  const onSubmit = (data: HomepageInput) => {
    startTransition(async () => {
      const result = await updateHomepageAction(data);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Homepage content published successfully.");
        reset(data); // Reset isDirty state
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-12">
      
      {/* Save Bar (Sticky) */}
      <div className="sticky top-16 z-20 flex items-center justify-between p-4 -mx-4 md:-mx-8 mb-8 bg-card/80 backdrop-blur-md border-b border-white/10 shadow-xl">
        <div>
          <h2 className="text-lg font-medium text-white">Homepage Content</h2>
          {isDirty && <p className="text-sm text-amber-400">You have unsaved changes</p>}
        </div>
        <button
          type="submit"
          disabled={isPending || !isDirty}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Publish Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Hero Section Card */}
        <div className="md:col-span-2 p-6 rounded-xl bg-card border border-white/5 space-y-6">
          <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-4">Hero Section</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Eyebrow Text</label>
              <input
                {...register("hero_eyebrow")}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.hero_eyebrow && <p className="text-xs text-red-400">{errors.hero_eyebrow.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Display Name</label>
              <input
                {...register("hero_name")}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.hero_name && <p className="text-xs text-red-400">{errors.hero_name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Primary Role</label>
              <input
                {...register("hero_primary_role")}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.hero_primary_role && <p className="text-xs text-red-400">{errors.hero_primary_role.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Secondary Role</label>
              <input
                {...register("hero_secondary_role")}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.hero_secondary_role && <p className="text-xs text-red-400">{errors.hero_secondary_role.message}</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-white/80">Hero Description</label>
              <textarea
                {...register("hero_description")}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              />
              {errors.hero_description && <p className="text-xs text-red-400">{errors.hero_description.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Primary CTA Text</label>
              <input
                {...register("hero_cta_primary_text")}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.hero_cta_primary_text && <p className="text-xs text-red-400">{errors.hero_cta_primary_text.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Primary CTA URL</label>
              <input
                {...register("hero_cta_primary_url")}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.hero_cta_primary_url && <p className="text-xs text-red-400">{errors.hero_cta_primary_url.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Secondary CTA Text</label>
              <input
                {...register("hero_cta_secondary_text")}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.hero_cta_secondary_text && <p className="text-xs text-red-400">{errors.hero_cta_secondary_text.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Secondary CTA URL</label>
              <input
                {...register("hero_cta_secondary_url")}
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.hero_cta_secondary_url && <p className="text-xs text-red-400">{errors.hero_cta_secondary_url.message}</p>}
            </div>

            <div className="md:col-span-2 pt-4 flex items-center justify-between border-t border-white/5 mt-2">
              <div>
                <h4 className="text-white font-medium">Hero Visibility</h4>
                <p className="text-xs text-muted">Show or hide the hero section on the homepage.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" {...register("hero_visibility")} className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

          </div>
        </div>
        
      </div>
    </form>
  );
}
