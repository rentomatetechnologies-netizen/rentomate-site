"use client";

import { useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/admin/api";
import { useToast } from "@/components/admin/Toast";

export function ChangePasswordForm() {
  const toast = useToast();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    if (form.get("newPassword") !== form.get("confirmPassword")) return setError("New passwords do not match.");

    setPending(true);
    setError("");
    try {
      await apiFetch("/admin/account/password", {
        method: "PUT",
        body: { currentPassword: form.get("currentPassword"), newPassword: form.get("newPassword") },
      });
      formEl.reset();
      toast("Password changed – other devices were signed out");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-4">
      <h2 className="panel-title mb-0">Change your password</h2>
      {error && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <div>
        <label htmlFor="current-password" className="label">Current password</label>
        <input id="current-password" name="currentPassword" type="password" className="input" autoComplete="current-password" required />
      </div>
      <div>
        <label htmlFor="new-pass" className="label">New password</label>
        <input id="new-pass" name="newPassword" type="password" className="input" autoComplete="new-password" required minLength={8} />
      </div>
      <div>
        <label htmlFor="confirm-pass" className="label">Confirm new password</label>
        <input id="confirm-pass" name="confirmPassword" type="password" className="input" autoComplete="new-password" required minLength={8} />
      </div>
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />} Update password
      </button>
    </form>
  );
}
