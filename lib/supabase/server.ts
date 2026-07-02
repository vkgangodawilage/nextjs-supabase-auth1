import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Use this client inside Server Components, Server Actions, and Route Handlers.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll was called from a Server Component that can't set cookies.
            // Safe to ignore here because middleware refreshes the session.
          }
        },
      },
    }
  );
}
