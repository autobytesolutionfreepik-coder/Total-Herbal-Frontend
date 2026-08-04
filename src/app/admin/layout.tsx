import { Suspense } from "react";
import AdminLoading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<AdminLoading />}>{children}</Suspense>;
}
