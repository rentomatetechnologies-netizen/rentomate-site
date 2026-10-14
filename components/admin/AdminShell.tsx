"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, FileText, LayoutDashboard, Loader2, LogOut, Menu, PanelsTopLeft, Users, X } from "lucide-react";
import { apiFetch, useApi } from "@/lib/admin/api";
import { ToastProvider } from "@/components/admin/Toast";

type Me = { id: number; username: string };

const AdminContext = createContext<Me | null>(null);

/** The signed-in admin (available inside the panel). */
export const useAdmin = () => {
  const admin = useContext(AdminContext);
  if (!admin) throw new Error("useAdmin must be used inside <AdminShell>");
  return admin;
};

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Blog posts", icon: FileText },
  { href: "/admin/hero", label: "Homepage hero", icon: PanelsTopLeft },
  { href: "/admin/admins", label: "Admins", icon: Users },
];

/** The real RentOMate wordmark. On dark backgrounds (`onDark`) it sits on a white badge, since the lettering is navy. */
export const AdminLogo = ({ onDark = false, className = "h-7" }: { onDark?: boolean; className?: string }) => {
  const image = (
    <Image
      src="/rentomate-wordmark-clean.png"
      alt="RentOMate"
      width={176}
      height={35}
      preload
      className={`w-auto ${className}`}
    />
  );
  return onDark ? <span className="inline-flex rounded-lg bg-white px-2.5 py-1.5 shadow-sm">{image}</span> : image;
};

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The backend decides who is logged in; a 401 here sends the visitor to the login page.
  const { data: me, error } = useApi<Me>("/auth/me");
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  async function logout() {
    await apiFetch("/auth/logout", { method: "POST" }).catch(() => {});
    // Full reload so no admin data stays in memory.
    window.location.replace("/admin/login");
  }

  if (!me) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        {error ? error : <Loader2 className="h-6 w-6 animate-spin text-brand" aria-label="Loading" />}
      </div>
    );
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {NAV.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
            isActive(href) ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Icon className="h-4 w-4" /> {label}
        </Link>
      ))}
      <a
        href="/blog"
        target="_blank"
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
      >
        <ExternalLink className="h-4 w-4" /> View website
      </a>
      <div className="mt-auto border-t border-white/10 pt-3">
        <p className="px-3 text-xs text-slate-400">Signed in as</p>
        <p className="truncate px-3 text-sm font-semibold text-white">{me.username}</p>
        <button onClick={logout} className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </nav>
  );

  return (
    <AdminContext value={me}>
      <ToastProvider>
        <div className="min-h-screen lg:pl-60">
          {/* Desktop sidebar */}
          <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col bg-navy lg:flex">
            <div className="px-6 py-5">
              <AdminLogo onDark className="h-6" />
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Admin panel</p>
            </div>
            {nav}
          </aside>

          {/* Mobile top bar + slide-in menu */}
          <header className="sticky top-0 z-30 flex items-center justify-between bg-navy px-4 py-3 lg:hidden">
            <AdminLogo onDark className="h-6" />
            <button onClick={() => setMenuOpen(true)} className="rounded-lg p-2 text-white hover:bg-white/10" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
          </header>
          {menuOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <button className="absolute inset-0 bg-navy/50" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
              <aside className="absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col bg-navy">
                <div className="flex items-center justify-between px-5 py-4">
                  <AdminLogo onDark className="h-6" />
                  <button onClick={() => setMenuOpen(false)} className="rounded-lg p-2 text-white hover:bg-white/10" aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {nav}
              </aside>
            </div>
          )}

          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">{children}</main>
        </div>
      </ToastProvider>
    </AdminContext>
  );
}
