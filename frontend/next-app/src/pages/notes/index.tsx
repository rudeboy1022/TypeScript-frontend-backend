import { ReactElement } from "react";

import { BaseLayout } from "@/components/layouts";
import { Page } from "@/components/pages/notes/page";

const Notes = () => {
  return (
    <>
      <Page />
    </>
  );
};

// レイアウトを定義
Notes.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default Notes;
