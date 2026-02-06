import { getTranslations } from "next-intl/server";

const Homepage = async () => {
  const t = await getTranslations();

  return <div>{t("HomePage.title")}</div>;
};

export default Homepage;
