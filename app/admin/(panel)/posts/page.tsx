"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { LoadState } from "@/components/admin/LoadState";
import { PageHeader } from "@/components/admin/PageHeader";
import { PostsTable, type PostRow } from "@/components/admin/PostsTable";
import { useApi } from "@/lib/admin/api";

export default function PostsPage() {
  const { data: posts, error, reload } = useApi<PostRow[]>("/admin/posts");
  const published = posts?.filter((post) => post.status === "PUBLISHED").length ?? 0;

  return (
    <>
      <PageHeader
        title="Blog posts"
        description={posts ? `${published} published · ${posts.length - published} drafts` : undefined}
        actions={
          <Link href="/admin/posts/new" className="btn btn-primary">
            <Plus className="h-4 w-4" /> New post
          </Link>
        }
      />
      {posts ? <PostsTable posts={posts} onChange={reload} /> : <LoadState error={error} />}
    </>
  );
}
