"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutSchema, type AboutInput } from "@/lib/validations/about";
import { updateAboutAction } from "./actions";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

export function AboutForm({ initialData }: { initialData: any }) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm<AboutInput>({
    resolver: zodResolver(aboutSchema),
    defaultValues: initialData || {
      short_introduction: "",
      long_biography: "",
      current_focus: "",
      career_goal: "",
      engineering_philosophy: "",
    },
  });

  const onSubmit = (data: AboutInput) => {
    startTransition(async () => {
      const result = await updateAboutAction(data);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("About content published successfully.");
        reset(data); // Reset isDirty state
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-12">
      
      {/* Save Bar (Sticky) */}
      <div className="sticky top-16 z-20 flex items-center justify-between p-4 -mx-4 md:-mx-8 mb-8 bg-card/80 backdrop-blur-md border-b border-white/10 shadow-xl">
        <div>
          <h2 className="text-lg font-medium text-white">About Content</h2>
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
        
        <div className="md:col-span-2 p-6 rounded-xl bg-card border border-white/5 space-y-6">
          <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-4">Personal Details & Philosophy</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Short Introduction</label>
              <textarea
                {...register("short_introduction")}
                rows={2}
                placeholder="A brief 1-2 sentence introduction..."
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              />
              {errors.short_introduction && <p className="text-xs text-red-400">{errors.short_introduction.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Long Biography</label>
              <textarea
                {...register("long_biography")}
                rows={6}
                placeholder="Your detailed professional background..."
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              />
              {errors.long_biography && <p className="text-xs text-red-400">{errors.long_biography.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Current Focus</label>
              <input
                {...register("current_focus")}
                placeholder="e.g., Deep learning architectures and full-stack integration"
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.current_focus && <p className="text-xs text-red-400">{errors.current_focus.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Career Goal</label>
              <input
                {...register("career_goal")}
                placeholder="e.g., Becoming a Machine Learning Engineer"
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {errors.career_goal && <p className="text-xs text-red-400">{errors.career_goal.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Engineering Philosophy</label>
              <textarea
                {...register("engineering_philosophy")}
                rows={3}
                placeholder="e.g., Writing clean, maintainable code that solves user problems..."
                className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              />
              {errors.engineering_philosophy && <p className="text-xs text-red-400">{errors.engineering_philosophy.message}</p>}
            </div>

          </div>
        </div>
        
      </div>
    </form>
  );
}
