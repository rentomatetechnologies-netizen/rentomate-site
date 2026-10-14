"use client";

import Link from "next/link";
import { FilePen, FileText, Globe, Plus, Users } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminShell";
import { LoadState } from "@/components/admin/LoadState";
import { PageHeader } from "@/components/admin/PageHeader";
import { useApi } from "@/lib/admin/api";
import { formatDate } from "@/lib/admin/format";
import type { PostStatus } from "@/lib/admin/posts";

type Dashboard = {
  stats: { published: number; drafts: number; total: number; admins: number };
  recent: { id: number; title: string; status: PostStatus; updatedAt: string; coverImage: string }[];
};

export default function DashboardPage() {
  const admin = useAdmin();
  const { data, error } = useApi<Dashboard>("/admin/dashboard");

  const stats = data && [
    { label: "Published posts", value: data.stats.published, icon: Globe, tone: "bg-emerald-50 text-emerald-600" },
    { label: "Drafts", value: data.stats.drafts, icon: FilePen, tone: "bg-amber-50 text-amber-600" },
    { label: "Total posts", value: data.stats.total, icon: FileText, tone: "bg-sky-50 text-sky-600" },
    { label: "Admins", value: data.stats.admins, icon: Users, tone: "bg-violet-50 text-violet-600" },
  ];

  return (
    <>
      <PageHeader
        title={`Welcome, ${admin.username}`}
        description="Here's what's happening on rentomate.life."
        actions={
          <Link href="/admin/posts/new" className="btn btn-primary">
            <Plus className="h-4 w-4" /> New post
          </Link>
        }
      />

      {!data || !stats ? (
        <LoadState error={error} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {stats.map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className="panel flex items-center gap-3 p-4 sm:p-5">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-2xl font-extrabold text-navy">{value}</p>
                  <p className="truncate text-xs font-medium text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <section className="panel mt-6 p-0">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-[15px] font-bold text-navy">Recently updated</h2>
              <Link href="/admin/posts" className="text-sm font-semibold text-brand hover:underline">All posts</Link>
            </div>
            {data.recent.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-slate-500">No posts yet.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {data.recent.map((post) => (
                  <li key={post.id}>
                    <Link href={`/admin/posts/${post.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
                      {post.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.coverImage} alt="" className="h-10 w-16 shrink-0 rounded-md object-cover" />
                      ) : (
                        <span className="h-10 w-16 shrink-0 rounded-md bg-gradient-to-br from-sky-100 to-slate-100" />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-navy">{post.title}</span>
                        <span className="text-xs text-slate-500">Updated {formatDate(post.updatedAt)}</span>
                      </span>
                      <span className={`badge ${post.status === "PUBLISHED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {post.status === "PUBLISHED" ? "Live" : "Draft"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </>
  );
}
