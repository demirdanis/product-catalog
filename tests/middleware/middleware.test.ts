import { loginUrl, productsUrl } from "@/contants/urls";

import { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { middleware } from "@/middleware";

const appUrl = "http://localhost:3011";

const notValidMockToken =
  "eyJ1c2VySWQiOiIxIiwiZnVsbE5hbWUiOiJEZW1pciBEYW7EscWfIiwiZXhwIjoxNzQxNTMxMDcxLCJpYXQiOjE3NDA5MjYyNzEsInJvbGVzIjpbImFkbWluIl19.5g3B_iCO1f9_ia9HMXUCBjoS1w2R-vcYbOeJ4mXfXYc";

const expiredMockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZnVsbE5hbWUiOiJEZW1pciBEYW7EscWfIiwiZXhwIjoxNzExNTMxMDcxLCJpYXQiOjE3NDA5MjYyNzEsInJvbGVzIjpbImFkbWluIl19.H3ThV-ivYpzTmzEMIehlxOy1DnhSEkcztMcXkCnVtz4";
const validMockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZnVsbE5hbWUiOiJEZW1pciBEYW7EscWfIiwiZXhwIjoxNzQxNTMxMDcxLCJpYXQiOjE3NDA5MjYyNzEsInJvbGVzIjpbImFkbWluIl19.5g3B_iCO1f9_ia9HMXUCBjoS1w2R-vcYbOeJ4mXfXYc";

describe("Middleware Tests", () => {
  const createMockRequest = (url: string, token?: string): NextRequest => {
    const request: NextRequest = {
      url: `${appUrl}${url}`,
      nextUrl: {
        pathname: url,
        href: `${appUrl}${url}`,
      } as NextURL,
      cookies: {
        get: () => ({ value: token }),
      } as RequestCookies,
    } as NextRequest;
    return request;
  };

  it("should redirect to /secure page if token is valid", async () => {
    const req = createMockRequest("/", validMockToken);
    const response = await middleware(req);
    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(`${appUrl}${productsUrl}`);
  });

  it("should redirect to login if token is not valid", async () => {
    const req = createMockRequest("/secure/products", notValidMockToken);

    const response = await middleware(req);

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(`${appUrl}${loginUrl}`);
  });

  it("should redirect to login if token is expired", async () => {
    const req = createMockRequest("/secure/products", expiredMockToken);

    const response = await middleware(req);

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(`${appUrl}${loginUrl}`);
  });

  it("should allow access to secure page if token is valid", async () => {
    const req = createMockRequest("/secure/products", validMockToken);
    const response = await middleware(req);
    expect(response.status).toBe(200);
  });

  it("should return 401 for secure API if token is invalid", async () => {
    const req = createMockRequest("/api/secure/products", notValidMockToken);
    const response = await middleware(req);
    expect(response.status).toBe(401);
  });

  it("should continue to next middleware if no secure route is hit", async () => {
    const req = createMockRequest("/");
    const response = await middleware(req);
    expect(response.status).toBe(200);
  });
});
