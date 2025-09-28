"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
import "./globals.css";


const tools = [
  { name: "Manifest Generation", href: "/manifest-generation" },
  { name: "Coex Reconciliation", href: "/coex-reconciliation" },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-50 to-slate-100 shadow-xl border-r border-slate-200/60 flex flex-col">
      <div className="p-6 border-b border-slate-200/60">
        <h1 className="font-bold text-xl text-slate-800 tracking-tight">Internal Tools</h1>
        <p className="text-sm text-slate-500 mt-1">Workflow automation</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
         {/* Home button */}
        <Link
          href="/"
          className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            pathname === "/"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
              : "text-slate-700 hover:bg-white hover:text-slate-900 hover:shadow-sm"
          }`}
        >
          <span className="text-lg mr-3">🏠</span>
          Home
        </Link>
        {tools.map((tool) => {
          const isActive = pathname.startsWith(tool.href);
          return (
            <Link
              key={tool.name}
              href={tool.href}
              className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "text-slate-700 hover:bg-white hover:text-slate-900 hover:shadow-sm"
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-3 transition-all duration-200 ${
                isActive ? "bg-white" : "bg-slate-400 group-hover:bg-blue-500"
              }`} />
              {tool.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}