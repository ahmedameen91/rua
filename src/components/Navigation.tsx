"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageCircle,
  Camera,
  Headphones,
  MapPin,
} from "lucide-react";

const navItems = [
  { href: "/app", icon: Home, label: "Home" },
  { href: "/app/chat", icon: MessageCircle, label: "Chat" },
  { href: "/app/memories", icon: Camera, label: "Memories" },
  { href: "/app/listen", icon: Headphones, label: "Listen" },
  { href: "/app/location", icon: MapPin, label: "Location" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-strong border-t border-rose-200/20 dark:border-rose-800/20">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/app" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "text-rose-500 bg-rose-50 dark:bg-rose-900/30"
                      : "text-[var(--muted)] hover:text-rose-400"
                  }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop sidebar navigation */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 glass-strong border-r border-rose-200/20 dark:border-rose-800/20 p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
            <span className="text-white text-sm">❤️</span>
          </div>
          <span className="text-lg font-semibold gradient-text">
            Couple Space
          </span>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/app" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "text-rose-600 bg-rose-50 shadow-sm shadow-rose-500/10 dark:bg-rose-900/30 dark:text-rose-300"
                      : "text-[var(--muted-foreground)] hover:text-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-900/10"
                  }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-rose-200/20 dark:border-rose-800/20">
          <Link
            href="/app/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--muted-foreground)] hover:text-rose-500 hover:bg-rose-50/50 transition-all duration-200 dark:hover:bg-rose-900/10"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="font-medium text-sm">Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
