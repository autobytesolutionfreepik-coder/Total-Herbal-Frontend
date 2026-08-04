import { Suspense } from "react";
import AccountLoading from "./loading";

export default function AccountRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<AccountLoading />}>{children}</Suspense>;
}
