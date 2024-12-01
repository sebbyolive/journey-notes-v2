import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log(error.message);
    return;
  }

  const curPath = request.nextUrl.pathname;

  // Redirect if LOGGED IN & on an AUTH page
  const onAuthRedirectPage =
    curPath.startsWith("/login") || curPath.startsWith("/signup");

  if (onAuthRedirectPage && user) {
    const redirectURL = new URL("/", request.url);
    return NextResponse.redirect(redirectURL);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
