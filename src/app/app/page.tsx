import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import {
  MessageCircle,
  Camera,
  Headphones,
  MapPin,
  Heart,
  UserPlus,
  Copy,
  Share2,
} from "lucide-react";

async function getUserProfile(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
}

async function getUserCouple(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data } = await supabase
    .from("couple_members")
    .select("couple_id, couples(*)")
    .eq("user_id", userId)
    .single();
  return data;
}

export default async function AppDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await getUserProfile(supabase, user.id);
  const coupleData = await getUserCouple(supabase, user.id);

  const displayName = profile?.name || user.email?.split("@")[0] || "there";
  const isPaired = !!coupleData;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Welcome Header */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Hey, {displayName}{" "}
          <span className="inline-block animate-pulse-soft">❤️</span>
        </h1>
        <p className="text-[var(--muted-foreground)]">
          {isPaired
            ? "Welcome to your shared space"
            : "Let's set up your space"}
        </p>
      </div>

      {!isPaired ? (
        /* Unpaired state — show setup flow */
        <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
          <Card hover={false} className="text-center py-10 px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/30 mb-6">
              <UserPlus
                size={28}
                className="text-rose-500"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Invite your partner
            </h2>
            <p className="text-[var(--muted-foreground)] mb-8 max-w-sm mx-auto">
              Share this invitation link with your special person to create your
              private space together.
            </p>

            {/* Placeholder invitation — real flow will generate from Supabase */}
            <div className="glass rounded-xl p-4 mb-6 max-w-sm mx-auto">
              <p className="text-xs text-[var(--muted)] mb-2 uppercase tracking-wider font-medium">
                Your invitation link
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm text-rose-600 dark:text-rose-300 bg-rose-50/50 dark:bg-rose-900/20 rounded-lg px-3 py-2 font-mono truncate">
                  couplespace.app/join/XXXXXX
                </code>
                <button
                  className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition text-[var(--muted)] hover:text-rose-500"
                  title="Copy link"
                >
                  <Copy size={18} />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition text-[var(--muted)] hover:text-rose-500"
                  title="Share"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            <p className="text-xs text-[var(--muted)]">
              The invitation expires in 7 days
            </p>
          </Card>
        </div>
      ) : (
        /* Paired state — show dashboard cards */
        <div className="space-y-4">
          {/* Together since */}
          <Card hover={false} className="text-center animate-fade-in-up" >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Heart
                size={16}
                className="text-rose-500 fill-rose-500 animate-pulse-soft"
              />
              <span className="text-sm text-[var(--muted-foreground)]">
                Together since
              </span>
            </div>
            <p className="text-lg font-semibold gradient-text">
              The beginning ❤️
            </p>
          </Card>

          {/* Feature cards grid */}
          <div className="grid grid-cols-2 gap-4" >
            {[
              {
                href: "/app/chat",
                icon: MessageCircle,
                label: "Chat",
                emoji: "💬",
                subtitle: "Start talking",
                color: "from-blue-400 to-blue-500",
              },
              {
                href: "/app/memories",
                icon: Camera,
                label: "Memories",
                emoji: "📸",
                subtitle: "Share moments",
                color: "from-purple-400 to-purple-500",
              },
              {
                href: "/app/listen",
                icon: Headphones,
                label: "Listen",
                emoji: "🎵",
                subtitle: "Together",
                color: "from-amber-400 to-amber-500",
              },
              {
                href: "/app/location",
                icon: MapPin,
                label: "Location",
                emoji: "📍",
                subtitle: "Share where",
                color: "from-emerald-400 to-emerald-500",
              },
            ].map((item, i) => (
              <Link key={item.href} href={item.href}>
                <Card
                  className={`text-center animate-fade-in-up h-full`}
                  hover
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} mb-3 shadow-lg`}
                  >
                    <item.icon
                      size={22}
                      className="text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="font-semibold text-sm mb-0.5">
                    {item.emoji} {item.label}
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    {item.subtitle}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
