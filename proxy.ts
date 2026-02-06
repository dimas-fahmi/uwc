import { chain } from "./src/lib/proxy/chain";
import { withLocale } from "./src/lib/proxy/middlewares/withLocale";

export default chain([withLocale]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|res).*)"],
};
