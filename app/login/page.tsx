import Link from "next/link";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            Welcome back
          </p>
          <h1 className="mt-2 font-display text-3xl">Sign in</h1>
        </div>

        <LoginForm />

        <p className="mt-8 text-sm text-ink/60">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-accent underline underline-offset-4">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
