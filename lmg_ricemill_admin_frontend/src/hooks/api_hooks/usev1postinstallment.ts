import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TParamsPostInstallment } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1PostInstallment = () => {
  const [payload, setPayload] = useState<
    Partial<Omit<TParamsPostInstallment, "orderid">>
  >({
    amount: undefined,
  });
  const getV1PostInstallment = async (
    params: Pick<TParamsPostInstallment, "orderid">,
    callBackFunction?: (params?: any) => any,
  ) => {
    const { amount } = payload;
    const { orderid } = params;

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
      orderid,
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

    window.location.reload();
    return;
  };

  return {
    getV1PostInstallment,
    payload,
    setPayload,
  };
};

export default useV1PostInstallment;
