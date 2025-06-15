import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TDataGetAdmin } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";

const useV1GetAdmin = () => {
  const [adminList, setAdminList] = useState<TDataGetAdmin[]>([]);
  const [currentSkip, setCurrentSkip] = useState<number>(1);

  const getV1GetAdmin = async () => {
    const response = await Instance_ApiLocal.localGetAdmin({
      skip: currentSkip,
    });

    if (response.status !== EAPIStatusCodes.success) {
      await signOut();
      return;
    }

    setAdminList(response.data as TDataGetAdmin[]);
  };

  return {
    getV1GetAdmin,
    adminList,
    setAdminList,
    currentSkip,
    setCurrentSkip,
  };
};

export default useV1GetAdmin;
