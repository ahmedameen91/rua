"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Heart, Mail, Lock, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      router.push("/app");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-amber-200/15 dark:bg-amber-900/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in-up">
          <Link href="/" className="inline-block mb-6">
            <Logo size="lg" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Create your space
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Start your private corner of the internet ❤️
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-8 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <Input
              label="Your name"
              type="text"
              placeholder="What should we call you?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={18} />}
              required
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
              required
              minLength={6}
              autoComplete="new-password"
            />

            {error && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm animate-slide-up">
                {error}
              </div>
            )}

            <Button type="submit" size="lg" isLoading={isLoading} className="w-full mt-2">
              Create our space
              <Heart size={18} className="fill-white" />
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-[var(--muted-foreground)] animate-fade-in" style={{ animationDelay: "300ms" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-rose-500 hover:text-rose-600 font-medium transition"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
