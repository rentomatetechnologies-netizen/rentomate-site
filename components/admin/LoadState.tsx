import { Loader2 } from "lucide-react";

/** Placeholder while an API request is loading or after it failed. */
export const LoadState = ({ error }: { error?: string }) => (
  <div className="panel flex items-center justify-center py-16 text-sm text-slate-500">
    {error ? <p className="text-red-600">{error}</p> : <Loader2 className="h-6 w-6 animate-spin text-brand" aria-label="Loading" />}
  </div>
);
