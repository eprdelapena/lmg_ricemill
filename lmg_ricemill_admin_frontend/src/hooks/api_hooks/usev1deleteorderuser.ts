import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

const useV1DeleteOrderUser = () => {
  const getV1DeleteOrderUser = async (payload: {
    orderId: string;
    callbackFunction?: any;
  }) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this order? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    const { orderId, callbackFunction } = payload;

    Swal.fire({
      title: "Loading",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loader animation
      },
    });

    const response = await Instance_ApiLocal.localDeleteOrderUser({
      orderid: orderId,
    });

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
      text: "Order successfully deleted",
      icon: "success",
      confirmButtonText: "Confirm",
    });

    if (callbackFunction) {
      callbackFunction();
    }

    return;
  };

  return {
    getV1DeleteOrderUser,
  };
};

export default useV1DeleteOrderUser;
