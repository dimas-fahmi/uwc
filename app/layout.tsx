"use client";

import { queryClient } from "@/src/lib/query";
import "@/src/ui/css/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
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
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
