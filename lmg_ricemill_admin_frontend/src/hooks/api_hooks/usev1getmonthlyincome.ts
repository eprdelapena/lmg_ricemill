import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import {
  TDataGetMonthlyIncome,
  TParamsGetMonthlyIncome,
} from "@/schema/main_schema";
import { getTodayAndTomorrowRange } from "@/utils/main_utils";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1GetMonthlyIncome = () => {
  const [incomeList, setIncomeList] = useState<TDataGetMonthlyIncome[]>([]);
  const [payload, setPayload] = useState<TParamsGetMonthlyIncome>({
    begin: getTodayAndTomorrowRange().begin,
    end: getTodayAndTomorrowRange().end,
  });

  const getV1GetMonthlyIncome = async () => {
    const beginDate = new Date(payload.begin);
    const endDate = new Date(payload.end);

    const timeDifference = endDate.getTime() - beginDate.getTime();
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (dayDifference > 31) {
      Swal.fire({
        title: "Invalid Date Range",
        text: "The date range must exactly span 31 days.",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    const response = await Instance_ApiLocal.localGetMonthlyIncome({
      ...payload,
    });

    if (response.status !== EAPIStatusCodes.success) {
      await signOut();
      return;
    }

    setIncomeList(response.data as TDataGetMonthlyIncome[]);
  };

  return {
    getV1GetMonthlyIncome,
    incomeList,
    payload,
    setPayload,
  };
};

export default useV1GetMonthlyIncome;
