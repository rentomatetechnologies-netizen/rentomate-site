"use client";

import { useState } from "react";
import { PostEditor } from "@/components/admin/PostEditor";
import { todayInIndia } from "@/lib/admin/format";
import { withKeys, type EditorPost } from "@/lib/admin/posts";

const emptyPost = (): EditorPost => ({
  title: "",
  slug: "",
  excerpt: "",
  category: "Guides",
  author: "Rent O' Mate Team",
  coverImage: "",
  coverAlt: "",
  publishedOn: todayInIndia(),
  readMinutes: "",
  status: "DRAFT",
  featured: false,
  blocks: withKeys([{ type: "paragraph", text: "" }]),
  seoTitle: "",
  seoDescription: "",
  focusKeyword: "",
  keywords: "",
});

export default function NewPostPage() {
  const [initial] = useState(emptyPost);
  return <PostEditor initial={initial} />;
}
