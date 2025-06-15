import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TDataGetOrderUser } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";

const useV1GetSingleOrderUser = () => {
  const [orderUser, setOrderUser] = useState<TDataGetOrderUser | undefined>(
    undefined,
  );

  const getV1GetSingleOrderUser = async (params: { orderid: string }) => {
    const response = await Instance_ApiLocal.localGetOrderUser({
      skip: 1,
      category: "orderid",
      search: params.orderid,
    });

    if (response.status !== EAPIStatusCodes.success) {
      return;
    }

    if (!(response.data as TDataGetOrderUser[])[0]) {
      await signOut();
      return;
    }

    setOrderUser((response.data as TDataGetOrderUser[])[0]);
  };

  return {
    orderUser,
    getV1GetSingleOrderUser,
  };
};

export default useV1GetSingleOrderUser;
