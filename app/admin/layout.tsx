import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Rent O' Mate Admin" },
  robots: { index: false, follow: false },
};

// The public site chrome (navbar, footer, popups) is skipped for /admin in SiteShell.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root">{children}</div>;
}
