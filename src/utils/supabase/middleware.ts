import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: request.cookies.getAll.bind(request.cookies),
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            if (options) {
              request.cookies.set(name, value);
            } else {
              request.cookies.set(name, value);
            }
          });
        },
      },
    }
  );

  await supabase.auth.getUser();

  return NextResponse.next();
}
