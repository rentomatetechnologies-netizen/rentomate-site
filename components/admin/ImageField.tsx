"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { apiFetch } from "@/lib/admin/api";
import { useToast } from "@/components/admin/Toast";

/** Image picker: upload (click or drag & drop) or paste an image URL. */
export function ImageField({
  value,
  onChange,
  label = "Upload image",
  folder = "blog",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  /** Upload folder on the server: blog → /media/blog/img1.jpg, hero → /media/hero/img1.jpg */
  folder?: "blog" | "hero";
}) {
  const toast = useToast();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [urlDraft, setUrlDraft] = useState<string | null>(null);

  async function upload(file?: File) {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return toast("Image is larger than 10 MB.", true);
    const form = new FormData();
    // The folder field must come before the file so the server reads it first.
    form.append("folder", folder);
    form.append("image", file);
    setUploading(true);
    try {
      const { url } = await apiFetch<{ url: string }>("/admin/media", { method: "POST", form });
      onChange(url);
      toast("Image uploaded");
    } catch (error) {
      toast((error as Error).message, true);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        upload(e.dataTransfer.files[0]);
      }}
      className={`rounded-xl border-[1.5px] border-dashed p-3 transition ${dragging ? "border-brand bg-sky-50" : "border-slate-300 bg-slate-50"}`}
    >
      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        hidden
        onChange={(e) => upload(e.target.files?.[0])}
      />
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mb-3 max-h-64 w-full rounded-lg object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-1 py-6 text-center text-sm text-slate-500">
          <ImagePlus className="h-7 w-7 text-slate-400" />
          Drag an image here, or
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="btn btn-sm" onClick={() => fileInput.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          {uploading ? "Uploading…" : value ? "Replace" : label}
        </button>
        {value && (
          <button type="button" className="btn btn-sm btn-danger" onClick={() => onChange("")}>
            <Trash2 className="h-3.5 w-3.5" /> Remove
          </button>
        )}
        <span className="text-xs text-slate-500">JPG, PNG, WebP · max 10 MB</span>
      </div>
      <input
        type="url"
        className="input mt-3 text-xs"
        placeholder="…or paste an image URL (https://…)"
        value={urlDraft ?? value}
        onChange={(e) => setUrlDraft(e.target.value)}
        onBlur={() => {
          if (urlDraft !== null) onChange(urlDraft.trim());
          setUrlDraft(null);
        }}
      />
    </div>
  );
}
