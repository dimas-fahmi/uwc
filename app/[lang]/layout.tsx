import { NextIntlClientProvider } from "next-intl";
import type React from "react";

const LangLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};

export default LangLayout;
