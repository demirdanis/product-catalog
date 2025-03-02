import { IJWTToken } from "@/types/jwtToken";
import { NextResponse } from "next/server";
import SecureLayout from "@/components/SecureLayout/SecureLayout";
import { authTokenCookieName } from "@/contants/auth";
import { cookies } from "next/headers";
import { getDecodedToken } from "@/services/utils/jwtToken";
import { loginUrl } from "@/contants/urls";

export default async function SecureRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get(authTokenCookieName)?.value;

  let decodedToken: IJWTToken | null = null;

  if (token) {
    decodedToken = getDecodedToken(token);
  }

  if (!decodedToken) {
    //NOTE: Token validation on secure pages can also be done within the page itself; these codes were written to demonstrate that. In fact, we already checked the token in the middleware.
    return NextResponse.redirect(loginUrl);
  }

  //NOTE: Additionally, we are extracting the user's full name from the token and passing it to the layout. This could have been done using Zustand's state, but it was implemented this way to serve as an example for passing parameters
  const fullName = decodedToken.fullName;

  return <SecureLayout fullName={fullName}>{children}</SecureLayout>;
}
