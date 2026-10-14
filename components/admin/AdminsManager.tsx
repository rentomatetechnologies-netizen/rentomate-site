"use client";

import { useState } from "react";
import { Loader2, Trash2, UserPlus } from "lucide-react";
import { apiFetch } from "@/lib/admin/api";
import { useToast } from "@/components/admin/Toast";
import { formatDateTime } from "@/lib/admin/format";

export type AdminRow = { id: number; username: string; createdAt: string; lastLoginAt: string | null };

export function AdminsManager({ admins, currentId, onChange }: { admins: AdminRow[]; currentId: number; onChange: () => void }) {
  const toast = useToast();
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  async function addAdmin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    setAdding(true);
    setError("");
    try {
      await apiFetch("/admin/admins", { method: "POST", body: { username: form.get("username"), password: form.get("password") } });
      formEl.reset();
      toast("Admin added");
      onChange();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setAdding(false);
    }
  }

  async function remove(admin: AdminRow) {
    if (!confirm(`Remove admin "${admin.username}"? They will be signed out immediately.`)) return;
    try {
      await apiFetch(`/admin/admins/${admin.id}`, { method: "DELETE" });
      toast("Admin removed");
      onChange();
    } catch (err) {
      toast((err as Error).message, true);
    }
  }

  return (
    <div className="space-y-6">
      <section className="panel p-0">
        <ul className="divide-y divide-slate-100">
          {admins.map((admin) => (
            <li key={admin.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold uppercase text-sky-700">
                {admin.username.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-navy">
                  {admin.username} {admin.id === currentId && <span className="badge ml-1 bg-slate-100 text-slate-600">You</span>}
                </p>
                <p className="text-xs text-slate-500">Last sign-in: {formatDateTime(admin.lastLoginAt)} · Added {formatDateTime(admin.createdAt)}</p>
              </div>
              {admin.id !== currentId && (
                <button onClick={() => remove(admin)} className="btn btn-sm btn-danger">
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <form onSubmit={addAdmin} className="panel space-y-4">
        <h2 className="panel-title mb-0">Add an admin</h2>
        {error && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="new-username" className="label">Username</label>
            <input id="new-username" name="username" className="input" autoComplete="off" autoCapitalize="none" spellCheck={false} required minLength={3} maxLength={64} />
          </div>
          <div>
            <label htmlFor="new-password" className="label">Temporary password</label>
            <input id="new-password" name="password" type="password" className="input" autoComplete="new-password" required minLength={8} />
          </div>
        </div>
        <p className="text-xs text-slate-500">Username: 3–64 characters, an email address works. Password: at least 8 characters. Ask them to change it after signing in.</p>
        <button type="submit" className="btn btn-primary" disabled={adding}>
          {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />} Add admin
        </button>
      </form>
    </div>
  );
}
