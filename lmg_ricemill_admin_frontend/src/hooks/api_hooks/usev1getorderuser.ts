import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TDataGetOrderUser, TParamsGetOrderUser } from "@/schema/main_schema";
import { useState } from "react";

const useV1GetOrderUser = () => {
  const [orderUserList, setOrderUserList] = useState<TDataGetOrderUser[]>([]);
  const [currentSkip, setCurrentSkip] = useState<number>(1);
  const [payload, setCurrentPayload] = useState<
    Omit<TParamsGetOrderUser, "skip">
  >({
    begin: undefined,
    end: undefined,
    category: undefined,
    type: undefined,
    search: undefined,
    estatustype: "pending",
  });
  const getV1GetOrderUser = async () => {
    const response = await Instance_ApiLocal.localGetOrderUser({
      skip: currentSkip,
      ...payload,
    });

    if (response.status !== EAPIStatusCodes.success) {
      return;
    }

    setOrderUserList(response.data as TDataGetOrderUser[]);
    return;
  };

  return {
    getV1GetOrderUser,
    orderUserList,
    currentSkip,
    setCurrentSkip,
    setCurrentPayload,
    payload,
  };
};

export default useV1GetOrderUser;
