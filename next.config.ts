import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

const withNextIntl = createNextIntlPlugin("./src/lib/locale/request.ts");

export default withNextIntl(nextConfig);
