"use client";

import { useTranslations } from "next-intl";

const Homepage = () => {
  const t = useTranslations();
  return <div>{t("HomePage.title")}</div>;
};

export default Homepage;
