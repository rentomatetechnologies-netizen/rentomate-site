"use client";

import { useAdmin } from "@/components/admin/AdminShell";
import { AdminsManager, type AdminRow } from "@/components/admin/AdminsManager";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";
import { LoadState } from "@/components/admin/LoadState";
import { PageHeader } from "@/components/admin/PageHeader";
import { useApi } from "@/lib/admin/api";

export default function AdminsPage() {
  const me = useAdmin();
  const { data: admins, error, reload } = useApi<AdminRow[]>("/admin/admins");

  return (
    <>
      <PageHeader title="Admins" description="People who can sign in to this panel." />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {admins ? <AdminsManager admins={admins} currentId={me.id} onChange={reload} /> : <LoadState error={error} />}
        <ChangePasswordForm />
      </div>
    </>
  );
}
