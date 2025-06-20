import Instance_ApiLocal from "@/api/api_local";
import {
  EAdminRoutes,
  EAPIStatusCodes,
} from "@/enum/main_enum";
import { TParamsPostOrders, TParamsPostOrderUser } from "@/schema/main_schema";
import { useState } from "react";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";

const useV1PostOrderUser = () => {
  const [payload, setPayload] = useState<Partial<Omit<TParamsPostOrderUser, "orders">>>({
    fullname: "",
    spouse: "",
    address: "",
    transactiondate: undefined,
    mobile: "",
    description: "",
    currentpayment: "0.00",
  });

  const getV1PostOrderUser = async (params: {
    currentCart: (TParamsPostOrders & {
      title: string;
      category: string;
    })[];
    userId: string;
    totalcost: string;
  }) => {
    const { currentCart, userId, totalcost } = params;

    const {
      fullname,
      spouse,
      address,
      mobile,
      transactiondate,
      description,
      currentpayment
    } = payload;

    if(!transactiondate){
      Swal.fire({
        title: "Error",
        text: "Date field is required",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }


    if(!fullname){
      Swal.fire({
        title: "Error",
        text: "Fullname field is required",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (mobile && !/^09\d{9}$/.test(mobile)) {
      Swal.fire({
        title: "Error",
        text: "Invalid phone format",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }
    if (currentpayment && isNaN(Number(currentpayment))) {
      Swal.fire({
        title: "Error",
        text: "Downpayment must be a number",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (isNaN(Number(totalcost))) {
      Swal.fire({
        title: "Error",
        text: "Total cost must be a number",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    const filteredCart = currentCart.map(
      ({ title, category, ...rest }) => rest,
    );

    Swal.fire({
      title: "Loading",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loader animation
      },
    });

    const response = await Instance_ApiLocal.localPostOrderUser({
      ...(payload as TParamsPostOrderUser),
      orders: filteredCart,
      totalcost,
    });

    Swal.close();
    if (response.status !== EAPIStatusCodes.success) {
      Swal.fire({
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
      text: "Successfully posted the order",
      icon: "success",
      confirmButtonText: "Confirm",
    });
    localStorage.removeItem(`cartItems_${userId}`);
    window.location.href = `${EAdminRoutes.DASHBOARDORDERS}`;
    return;
  };

  return {
    getV1PostOrderUser,
    payload,
    setPayload,
  };
};

export default useV1PostOrderUser;
