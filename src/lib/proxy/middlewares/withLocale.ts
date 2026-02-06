import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import { DEFAULT_LOCALE } from "../../locale";
import type { CustomMiddleware } from "../chain";
import {
  getLocaleFromPathname,
  isSupportedLocale,
  stripLocaleFromPathname,
} from "../utils";

export function withLocale(middleware: CustomMiddleware): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    _response: NextResponse,
  ) => {
    const { nextUrl, cookies, url } = request;

    const cookie = cookies;
    const params = nextUrl.searchParams;

    const storedLocale = cookie.get("locale")?.value;
    const overrideLocale = params.get("override_locale");
    const realPathname = stripLocaleFromPathname(nextUrl.pathname);
    const localeFromPathname = getLocaleFromPathname(nextUrl.pathname);
    const response = _response || NextResponse.next();
    const setLocale = params.get("set_locale");

    let locale = storedLocale || DEFAULT_LOCALE;

    if (!storedLocale) {
      response.cookies.set("locale", locale);
    }

    if (setLocale && isSupportedLocale(setLocale)) {
      locale = setLocale;
      response.cookies.set("locale", setLocale);
    }

    if (overrideLocale && isSupportedLocale(overrideLocale)) {
      locale = overrideLocale;
    }

    if (localeFromPathname !== locale) {
      return NextResponse.redirect(
        new URL(`/${locale}${realPathname}?${nextUrl.searchParams}`, url),
      );
    }

    return middleware(request, event, response);
  };
}
