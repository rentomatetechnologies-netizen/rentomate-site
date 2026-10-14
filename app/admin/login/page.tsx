import type { Metadata } from "next";
import { AdminLogo } from "@/components/admin/AdminShell";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Log in" };

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-50 to-slate-100 px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-navy/5 sm:p-8">
        <AdminLogo className="h-9" />
        <h1 className="mt-4 text-2xl font-extrabold text-navy">Admin login</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in with your admin username and password.</p>
        <LoginForm />
      </div>
    </main>
  );
}
