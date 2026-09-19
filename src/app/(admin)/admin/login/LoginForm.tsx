"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { loginAction } from "./actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    setServerError(null);
    startTransition(async () => {
      const result = await loginAction(data);
      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
      } else {
        toast.success("Successfully authenticated.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="p-3 text-sm font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
          {serverError}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/80">Email</label>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          disabled={isPending}
          className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
          placeholder="admin@example.com"
        />
        {errors.email && (
          <p className="text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/80">Password</label>
        <input
          {...register("password")}
          type="password"
          autoComplete="current-password"
          disabled={isPending}
          className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 px-4 mt-6 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
      >
        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        {isPending ? "Authenticating..." : "Authenticate"}
      </button>
    </form>
  );
}
