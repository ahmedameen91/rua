import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navigation } from "@/components/Navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
