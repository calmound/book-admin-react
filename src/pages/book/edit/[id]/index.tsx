import { getBookDetail } from "@/api";
import { BookForm } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Book() {
  const [data, setData] = useState();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await getBookDetail(router.query.id as string);
      setData(res.data);
    })();
  }, [router]);
  return <BookForm title="图书编辑" editData={data} />;
}
