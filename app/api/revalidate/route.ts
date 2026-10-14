import { revalidatePath } from "next/cache";

// Called by rentomate-backend after a post or the homepage hero is saved or deleted,
// so changes from the admin panel show on the site straight away.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  return Response.json({ revalidated: true });
}
