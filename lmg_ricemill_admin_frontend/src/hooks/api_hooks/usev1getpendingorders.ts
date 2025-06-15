import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TDataGetPendingOrders } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";

const useV1GetPendingOrder = () => {
    const [pendingOrders, setPendingOrders] = useState<TDataGetPendingOrders[]>([]);

    const [currentSkip, setCurrentSkip] = useState<number>(1);
    const [type, setCurrentType] = useState<string>("on_hand_layaway");
    const [count, setCount] = useState<string>("0");
    const getV1GetPendingOrder = async (productid: string | number) => {

        const response = await Instance_ApiLocal.localGetPendingOrders({
            skip: currentSkip,
            productid: Number(productid),
            type
        })

        if(response.status !== EAPIStatusCodes.success){
            await signOut();
            return;
        }
        setCount(response.count)
        setPendingOrders(response.data as TDataGetPendingOrders[]);
        return;

    }

    return {
        pendingOrders,
        setPendingOrders,
        type,
        currentSkip,
        setCurrentSkip,
        setCurrentType,
        count,
        getV1GetPendingOrder
    }
}

export default useV1GetPendingOrder;