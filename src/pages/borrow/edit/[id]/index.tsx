import { getBorrowDetail } from "@/api/borrow";
import BorrowForm from "@/components/BorrowForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BorrowEdit() {
  const router = useRouter();

  const [data, setData] = useState();

  useEffect(() => {
    if (router.query.id) {
      getBorrowDetail(router.query.id).then((res) => {
        console.log(
          "%c [ res.data ]-15",
          "font-size:13px; background:pink; color:#bf2c9f;",
          res.data
        );
        setData(res.data);
      });
    }
  }, [router.query.id]);

  return <BorrowForm title="借阅编辑" editData={data} />;
}
