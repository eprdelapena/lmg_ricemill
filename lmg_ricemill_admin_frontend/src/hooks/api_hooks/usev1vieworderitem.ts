import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TDataViewOrderItem } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";

const useV1ViewOrderItem = () => {
  const [orderList, setOrderList] = useState<TDataViewOrderItem[]>([]);
  const [currentSkip, setCurrentSkip] = useState<number>(1);

  const getV1ViewOrderItem = async (payload: { orderid: string }) => {
    const { orderid } = payload;

    const response = await Instance_ApiLocal.localViewOrderItem({
      skip: currentSkip,
      orderid,
    });

    if (response.status !== EAPIStatusCodes.success) {
      await signOut();
      return;
    }

    setOrderList(response.data as TDataViewOrderItem[]);
    return;
  };

  return {
    orderList,
    currentSkip,
    setCurrentSkip,
    getV1ViewOrderItem,
  };
};

export default useV1ViewOrderItem;
