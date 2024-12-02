import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();

  const {
    data,
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log(error.message);
  }

  const curPath = request.nextUrl.pathname;

  const onAuthPage =
    curPath.startsWith("/login") || curPath.startsWith("/signup");

  const onAppPage = curPath.startsWith("/app");

  if (onAuthPage && user) {
    const redirectURL = new URL("/", request.url);
    return NextResponse.redirect(redirectURL);
  }

  if (onAppPage && !user) {
    const redirectURL = new URL("/login", request.url);
    return NextResponse.redirect(redirectURL);
  }

  return await updateSession(request);
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
