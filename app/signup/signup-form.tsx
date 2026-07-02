"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signup, type AuthState } from "@/app/auth/actions";

const initialState: AuthState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink/90 disabled:opacity-60"
    >
      {pending ? "Creating account…" : "Create account"}
    </button>
  );
}

export default function SignupForm() {
  const [state, formAction] = useFormState(signup, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-ink/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm text-ink/70">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className="w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder="At least 6 characters"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1.5 block text-sm text-ink/70"
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className="w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder="Re-enter your password"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="text-sm text-accent">
          {state.success}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
