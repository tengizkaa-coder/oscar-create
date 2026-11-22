import { NextRequest, NextResponse } from "next/server";

const ADMIN_USER = "boss";
const ADMIN_PASS = "Kv8mNx2pLq9Wz";

export function middleware(request: NextRequest) {
  const auth = request.headers.get("authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      if (user === ADMIN_USER && pass === ADMIN_PASS) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin"',
    },
  });
}

export const config = {
  matcher: "/mgmt-x7k9f2/:path*",
};
