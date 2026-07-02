"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login, type AuthState } from "@/app/auth/actions";

const initialState: AuthState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-white text-black px-4 py-3 font-semibold hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(
    login,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-4"
    >
      <div>
        <label className="block mb-2 text-sm text-zinc-400">
          Email
        </label>

        <input
          type="email"
          name="email"
          required
          placeholder="Enter email"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none text-white"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm text-zinc-400">
          Password
        </label>

        <input
          type="password"
          name="password"
          required
          placeholder="Enter password"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none text-white"
        />
      </div>

      {state?.error && (
        <p className="text-red-500 text-sm">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}