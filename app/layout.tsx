import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth · Next.js + Supabase",
  description: "Sign up, sign in, and sign out with Supabase Auth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body text-ink antialiased">{children}</body>
    </html>
  );
}
