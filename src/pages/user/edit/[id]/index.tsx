import { getUserDetail, getUserList } from "@/api/user";
import UserForm from "@/components/UserForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const id = router.query.id;

  const [data, setData] = useState();
  useEffect(() => {
    if (id) {
      getUserDetail(id as string).then((res) => {
        setData(res.data);
      });
    }
  }, [id]);
  return <UserForm title="图书编辑" editData={data} />;
}
