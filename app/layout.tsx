import "@/src/ui/css/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { poppinsFont } from "@/src/ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsFont.variable} antialiased max-w-[1440px] mx-auto w-full overflow-x-hidden custom-scrollbar`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
