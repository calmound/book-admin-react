import { getBorrowDetail } from "@/api";
import { BorrowForm } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BorrowBook: React.FC<any> = () => {
  const router = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    getBorrowDetail(router.query.id as string).then((res) => {
      setData(res.data);
    });
  }, [router.query.id]);

  return <BorrowForm title="借阅编辑" editData={data} />;
};

export default BorrowBook;
