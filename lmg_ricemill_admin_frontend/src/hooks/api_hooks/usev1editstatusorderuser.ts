import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1EditStatusOrderUser = () => {
  const [status, setStatus] = useState<string | undefined>(undefined);

  const getV1EditStatusOrderUser = async (payload: {
    orderid: string;
    callbackFunction?: any;
  }) => {
    if (status === undefined) {
      await Swal.fire({
        title: "Error",
        text: "Please fill up status field",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }
    const { orderid, callbackFunction } = payload;

    Swal.fire({
      title: "Loading",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loader animation
      },
    });

    const response = await Instance_ApiLocal.localEditStatusOrderUser({
      orderid,
      estatustype: status as string,
    });

    Swal.close();
    if (response.status !== EAPIStatusCodes.success) {
      await Swal.fire({
        title: "Error",
        text: "Something went wrong, please try again later",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    await Swal.fire({
      title: "Success!",
      text: "Status successfully changed",
      icon: "success",
      confirmButtonText: "Confirm",
    });

    if (callbackFunction) {
      callbackFunction();
    }

    return;
  };

  return {
    getV1EditStatusOrderUser,
    setStatus,
    status,
  };
};

export default useV1EditStatusOrderUser;
