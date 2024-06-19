import { ReactElement } from "react";

import { BaseLayout } from "@/components/layouts";

import { Page } from "@/components/pages/Home/page";

const Home = () => {
  return <Page />;
};

// レイアウトを定義
Home.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default Home;
