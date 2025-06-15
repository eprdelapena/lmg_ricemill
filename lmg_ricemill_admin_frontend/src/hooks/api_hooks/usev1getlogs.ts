import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TDataLogTable, TParamsGetLogTable } from "@/schema/main_schema";
import { useState } from "react";

const useV1GetLogs = () => {

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1); // first day of current month
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0); // last day of current month

    const [currentSkip, setCurrentSkip] = useState<number>(1);
    
    const [payload, setPayload] = useState<Partial<TParamsGetLogTable>>({
        begin: firstDay,
        end: lastDay,
        searchCategory: undefined,
        searchText: undefined,
    });

    const [logs, setLogs] = useState<TDataLogTable[]>([]);
    const [orderLogs, setOrderLogs] = useState<TDataLogTable[]>([]);

    const getV1GetLogs = async () => {
        const response = await Instance_ApiLocal.localGetLog({
            begin: `${payload.begin}`,
            end: `${payload.end}`,
            ...payload,
            skip: currentSkip
        });

        if(response.status !== EAPIStatusCodes.success){
            return;
        }
        setLogs(response.data as TDataLogTable[])
    }

    const getV1GetLogsOrder = async (orderid: string) => {
        const response = await Instance_ApiLocal.localGetLog({
            searchCategory: "orderid",
            searchText: orderid
        })

        if(response.status !== EAPIStatusCodes.success){
            return;
        }

        setOrderLogs(response.data as TDataLogTable[]);
    }

    return {
        getV1GetLogs,
        payload,
        orderLogs,
        setOrderLogs,
        getV1GetLogsOrder,
        setLogs,
        setPayload,
        setCurrentSkip,
        currentSkip,
        logs
    }
}

export default useV1GetLogs;