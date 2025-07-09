import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taskify-GPT",
  description:
    "An AI-powered tool that turns your ChatGPT conversations into clear, actionable tasks. Ideal for developers and project managers. Open-source on GitHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
