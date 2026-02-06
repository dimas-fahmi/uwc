import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE } from ".";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value || DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
