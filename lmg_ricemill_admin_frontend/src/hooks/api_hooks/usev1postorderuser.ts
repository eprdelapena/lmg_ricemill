import Instance_ApiLocal from "@/api/api_local";
import {
  EAdminRoutes,
  EAPIStatusCodes,
  EParamsDefault,
} from "@/enum/main_enum";
import { TParamsPostOrders, TParamsPostOrderUser } from "@/schema/main_schema";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  regionProvinceMap,
  provinceAndCities,
  philippineRegions,
} from "@/utils/main_utils";
import { signOut } from "next-auth/react";
const useV1PostOrderUser = () => {
  const [payload, setPayload] = useState<Partial<TParamsPostOrderUser>>({
    username: undefined,
    receiverfirstname: undefined,
    receiverlastname: undefined,
    receivermobile: undefined,
    region: undefined,
    municity: undefined,
    barangay: undefined,
    province: undefined,
    address: undefined,
    originsite: undefined,
    downpayment: undefined,
    type: "on_hand_layaway"
  });

  const getV1PostOrderUser = async (params: {
    currentCart: (TParamsPostOrders & {
      title: string;
      category: string;
    })[];
    userId: string;
    totalprice: string;
  }) => {
    const { currentCart, userId, totalprice } = params;

    const {
      username,
      receiverfirstname,
      receiverlastname,
      receivermobile,
      region,
      municity,
      barangay,
      type,
      address,
      originsite,
      downpayment,
    } = payload;

    const isInformationInvalid =
      !username ||
      !receiverfirstname ||
      !receiverlastname ||
      !receivermobile ||
      !region ||
      !municity ||
      !barangay ||
      !address ||
      !originsite ||
      !downpayment ||
      currentCart?.length === 0;

    console.log(
      username,
      receiverfirstname,
      receiverlastname,
      receivermobile,
      region,
      municity,
      barangay,
      address,
      originsite,
      downpayment,
      "hello",
    );
    if (isInformationInvalid) {
      Swal.fire({
        title: "Error",
        text: "Please fill up all the fields",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (!/^09\d{9}$/.test(receivermobile)) {
      Swal.fire({
        title: "Error",
        text: "Invalid phone format",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }
    if (isNaN(Number(downpayment))) {
      Swal.fire({
        title: "Error",
        text: "Downpayment must be a number",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (isNaN(Number(totalprice))) {
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
      totalcost: totalprice,
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
    regionProvinceMap,
    provinceAndCities,
    philippineRegions,
  };
};

export default useV1PostOrderUser;
