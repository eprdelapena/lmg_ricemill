import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TParamsPostInstallment } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1PostInstallment = () => {
  const [payload, setPayload] = useState<
    Partial<Omit<TParamsPostInstallment, "transactionid">>
  >({
    amount: undefined,
    description: "",
    transactiondate: undefined
  });
  const getV1PostInstallment = async (
    params: Pick<TParamsPostInstallment, "transactionid">,
    callBackFunction?: (params?: any) => any,
  ) => {
    const { amount, description, transactiondate } = payload;
    const { transactionid } = params;

    if(!transactiondate){
      await Swal.fire({
        title: "Error",
        text: "Date field is required",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (Number(amount) <= 0 || isNaN(Number(amount))) {
      await Swal.fire({
        title: "Error",
        text: "Amount field must be of type number",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    const response = await Instance_ApiLocal.localPostInstallment({
      amount: payload.amount!,
      transactionid,
      description: description || "",
      transactiondate: transactiondate || new Date()
    });

    if (response.status !== EAPIStatusCodes.success) {
      await Swal.fire({
        title: "Error",
        text: "Something went wrong please try again later",
        icon: "error",
        confirmButtonText: "Try again",
      });
      await signOut();
      return;
    }

    await Swal.fire({
      title: "Success",
      text: "Successfully posted installment payment",
      icon: "success",
      confirmButtonText: "Confirm",
    });

    if (callBackFunction) {
      callBackFunction();
    }


    return;
  };

  return {
    getV1PostInstallment,
    payload,
    setPayload,
  };
};

export default useV1PostInstallment;
