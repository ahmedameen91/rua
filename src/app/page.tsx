import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  MessageCircle,
  Camera,
  Headphones,
  MapPin,
  Shield,
  Lock,
  Heart,
  Sparkles,
  ArrowRight,
  UserPlus,
  Link2,
  Users,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup" className="hidden sm:block">
              <Button variant="primary" size="sm">
                Create our space
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating hearts */}
          <div className="absolute top-[15%] left-[10%] animate-float opacity-20">
            <Heart size={24} className="text-rose-400 fill-rose-400" />
          </div>
          <div className="absolute top-[25%] right-[15%] animate-float-delayed opacity-15">
            <Heart size={18} className="text-rose-300 fill-rose-300" />
          </div>
          <div className="absolute bottom-[30%] left-[20%] animate-float-delayed opacity-20">
            <Heart size={14} className="text-amber-400 fill-amber-400" />
          </div>
          <div className="absolute top-[60%] right-[10%] animate-float opacity-15">
            <Heart size={20} className="text-rose-400 fill-rose-400" />
          </div>
          <div className="absolute top-[40%] left-[50%] animate-float-delayed opacity-10">
            <Sparkles size={16} className="text-amber-300" />
          </div>
          <div className="absolute bottom-[20%] right-[30%] animate-float opacity-15">
            <Sparkles size={14} className="text-rose-300" />
          </div>

          {/* Soft gradient orbs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto animate-fade-in-up">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-rose-600 dark:text-rose-300">
              <Heart size={14} className="fill-rose-500 text-rose-500" />
              For just the two of you
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Your little corner
            <br />
            <span className="gradient-text">of the internet.</span>
            <span className="ml-2">❤️</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--muted-foreground)] mb-10 max-w-lg mx-auto leading-relaxed">
            A private space for the two of you to talk, share memories, listen
            together, and stay connected.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">
                Create our space
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/join">
              <Button variant="secondary" size="lg">
                I have an invitation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-[var(--muted-foreground)] text-lg max-w-md mx-auto">
              Three simple steps to your own private space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: UserPlus,
                step: "01",
                title: "Create your space",
                desc: "Sign up and create your private couple space in seconds.",
              },
              {
                icon: Link2,
                step: "02",
                title: "Invite your partner",
                desc: "Share a unique invitation link with your special person.",
              },
              {
                icon: Users,
                step: "03",
                title: "Connect together",
                desc: "Chat, share memories, listen to music, and more — privately.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`text-center animate-fade-in-up`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/30 dark:to-rose-800/20 mb-6">
                  <item.icon
                    size={28}
                    className="text-rose-500"
                    strokeWidth={1.5}
                  />
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-rose-400 bg-white dark:bg-warm-900 rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-32 px-4 relative">
        <div className="absolute inset-0 gradient-hero opacity-50" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need
            </h2>
            <p className="text-[var(--muted-foreground)] text-lg max-w-md mx-auto">
              A cozy set of features for staying close
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "💬 Chat",
                desc: "Real-time messaging that feels intimate and personal. Send texts, emojis, and photos — just the two of you.",
                color: "from-blue-400 to-blue-500",
              },
              {
                icon: Camera,
                title: "📸 Memories",
                desc: "A shared photo gallery that becomes your private scrapbook. Upload, caption, and relive your favorite moments together.",
                color: "from-purple-400 to-purple-500",
              },
              {
                icon: Headphones,
                title: "🎵 Listen Together",
                desc: "Synchronized music playback so you can listen together, no matter where you are. Play, pause, seek — in sync.",
                color: "from-amber-400 to-amber-500",
              },
              {
                icon: MapPin,
                title: "📍 Location Sharing",
                desc: "Share where you are when you want to. Time-limited, privacy-first location sharing with full control.",
                color: "from-emerald-400 to-emerald-500",
              },
            ].map((feature, i) => (
              <Card
                key={feature.title}
                className={`animate-fade-in-up`}
                hover
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <feature.icon
                      size={22}
                      className="text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-24 sm:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <Card hover={false} className="text-center py-12 px-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/30 mb-6">
              <Shield size={32} className="text-rose-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Just the two of you.
            </h2>
            <p className="text-[var(--muted-foreground)] text-lg max-w-lg mx-auto mb-8 leading-relaxed">
              Your messages, photos, and moments are completely private. No one
              else can see or access your space — ever.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--muted-foreground)]">
              {[
                { icon: Lock, text: "End-to-end privacy" },
                { icon: Shield, text: "Data isolation" },
                { icon: Users, text: "Two people only" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon size={16} className="text-rose-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-rose-600 dark:from-rose-800 dark:to-rose-900" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[5%] animate-float opacity-20">
            <Heart size={32} className="text-white fill-white" />
          </div>
          <div className="absolute bottom-[20%] right-[10%] animate-float-delayed opacity-15">
            <Heart size={24} className="text-white fill-white" />
          </div>
        </div>

        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to create your space?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-md mx-auto">
            Join hundreds of couples who&apos;ve already found their little
            corner of the internet.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-white text-rose-600 hover:bg-white/90 shadow-xl from-white to-white hover:from-white/90 hover:to-white/90"
            >
              Create our space
              <Heart size={18} className="fill-rose-500 text-rose-500" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-rose-200/20 dark:border-rose-800/20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Couple Space. Made with ❤️
          </p>
          <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <Link href="/privacy" className="hover:text-rose-500 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-rose-500 transition">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
