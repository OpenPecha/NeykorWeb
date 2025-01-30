// middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Supported locales
  locales: ["en", "bod"],

  // Default locale
  defaultLocale: "en",
});

export const config = {
  // Match all paths except static files and API routes
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
