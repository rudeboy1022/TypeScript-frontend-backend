import { useGetLoggedInUsersQuery } from "@/services/get-logged-in-user-query/use-get-loggedin-users-query";
import { useGetNotesQuery } from "@/services/get-notes-query/use-get-notes-query";

import styles from "./style.module.scss";
import { useQuery } from "@tanstack/react-query";
import { sampleQueryOptions } from "@/services/get-sample-query/use-get-sample-query";

export const Page = () => {
  const { data } = useQuery({ ...sampleQueryOptions({}), staleTime: 8 });

  return (
    <div>
      <div>
        {data?.data.map((items, index) => (
          <div key={index}>
            <p className={styles["text"]}>{items.name}</p>
            <p className={styles["text"]}>{items.price}</p>
            <p className={styles["text"]}>{items.rating.average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
