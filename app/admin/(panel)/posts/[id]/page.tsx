"use client";

import { useParams } from "next/navigation";
import { LoadState } from "@/components/admin/LoadState";
import { PostEditor } from "@/components/admin/PostEditor";
import { useApi } from "@/lib/admin/api";
import { toEditorPost, type AdminPost } from "@/lib/admin/posts";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const { data: post, error } = useApi<AdminPost>(`/admin/posts/${encodeURIComponent(id)}`);

  if (!post) return <LoadState error={error} />;
  return <PostEditor key={post.id} initial={toEditorPost(post)} />;
}
