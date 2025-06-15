import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TParamsEditInstallment } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1EditInstallment = () => {
  const [installmentParams, setInstallmentParams] = useState<string>("0");
  const [description, setDescription] = useState<string>("");
  const getV1EditInstallment = async (
    params: Omit<TParamsEditInstallment, "installment">,
    callbackFunction?: (...args: any[]) => any,
  ) => {
    if (installmentParams && isNaN(Number(installmentParams))) {
      await Swal.fire({
        title: "Error",
        text: "Installment must be a number",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    const response = await Instance_ApiLocal.localEditInstallment({
      ...params,
      installment: Number(installmentParams) > 0 ? installmentParams : undefined,
      description: description.length !== 0 ? description : undefined
    });

    if (response.status !== EAPIStatusCodes.success) {
      await Swal.fire({
        title: "Error",
        text: "Something went wrong, please try again later",
        icon: "error",
        confirmButtonText: "Try again",
      });
      await signOut();
      return;
    }

    if (callbackFunction) {
      callbackFunction();
    }

    await Swal.fire({
      title: "Success!",
      text: "Successfully edited payment",
      icon: "success",
      confirmButtonText: "Confirm",
    });

    window.location.reload();
    return;
  };

  return {
    getV1EditInstallment,
    installmentParams,
    description,
    setDescription,
    setInstallmentParams,
  };
};

export default useV1EditInstallment;
