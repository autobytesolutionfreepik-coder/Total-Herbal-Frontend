import { Suspense } from "react";
import AuthLoading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<AuthLoading />}>{children}</Suspense>;
}
