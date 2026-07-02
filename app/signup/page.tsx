import Link from "next/link";
import SignupForm from "./signup-form";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            Get started
          </p>
          <h1 className="mt-2 font-display text-3xl">Create your account</h1>
        </div>

        <SignupForm />

        <p className="mt-8 text-sm text-ink/60">
          Already have an account?{" "}
          <Link href="/login" className="text-accent underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
