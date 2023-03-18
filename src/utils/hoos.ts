import { UserType } from "@/types";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const obj = localStorage.getItem("user");
    if (obj) {
      console.log(
        "%c [ obj ]-9",
        "font-size:13px; background:pink; color:#bf2c9f;",
        obj
      );
      setUser(JSON.parse(obj));
    }
  }, []);

  return user;
};
