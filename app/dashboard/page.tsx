import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">
          Signed in
        </p>
        <h1 className="mt-2 font-display text-3xl">You&apos;re in.</h1>
        <p className="mt-4 text-sm text-ink/60">{user.email}</p>

        <form action={logout} className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-accentSoft"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
