// proxy.ts — Next.js 16 replaces middleware.ts
// Runtime: Node.js only (not edge)
// Guards: /admin/** → ADMIN | SUPER_ADMIN; /account/** → any authenticated user

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Minimal JWT payload we care about */
interface SessionPayload {
  role?: "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";
  exp?: number;
}

function parseJwt(token: string): SessionPayload | null {
  try {
    const base64 = token.split(".")[1];
    const json = Buffer.from(base64, "base64url").toString("utf-8");
    return JSON.parse(json) as SessionPayload;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const next = encodeURIComponent(pathname + search);

  const token =
    request.cookies.get("accessToken")?.value ??
    request.cookies.get("token")?.value;

  // ── /account/** — require any authenticated session ──────────────────────
  if (pathname.startsWith("/account")) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/sign-in?next=${next}`, request.url)
      );
    }
    const payload = parseJwt(token);
    const expired = payload?.exp ? Date.now() / 1000 > payload.exp : false;
    if (!payload || expired) {
      return NextResponse.redirect(
        new URL(`/sign-in?next=${next}`, request.url)
      );
    }
  }

  // ── /admin/** — require ADMIN or SUPER_ADMIN ──────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/sign-in?next=${next}`, request.url)
      );
    }
    const payload = parseJwt(token);
    const expired = payload?.exp ? Date.now() / 1000 > payload.exp : false;
    if (!payload || expired) {
      return NextResponse.redirect(
        new URL(`/sign-in?next=${next}`, request.url)
      );
    }
    if (payload.role !== "ADMIN" && payload.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
