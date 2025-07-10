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
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="h-14 bg-amber-50">
            <div className="max-w-6xl mx-auto flex items-center h-full">
              <h1 className="text-xl font-bold">Taskify-GPT</h1>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className=" bg-blue-900 flex justify-center">
            <div className="text-white text-sm">© 2025 Polylingo</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
