import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TParamsDeleteInstallment } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

const useV1DeleteInstallment = () => {
  const getV1DeleteInstallment = async (
    params: TParamsDeleteInstallment,
    callbackFunction?: (...args: any[]) => any,
  ) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this payment? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    Swal.fire({
      title: "Loading",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loader animation
      },
    });

    const response = await Instance_ApiLocal.localDeleteInstallment(params);

    Swal.close();

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

    await Swal.fire({
      title: "Success!",
      text: "Payment successfully deleted",
      icon: "success",
      confirmButtonText: "Confirm",
    });

    if (callbackFunction) {
      callbackFunction();
    }

    window.location.reload();
    return;
  };

  return {
    getV1DeleteInstallment,
  };
};

export default useV1DeleteInstallment;
