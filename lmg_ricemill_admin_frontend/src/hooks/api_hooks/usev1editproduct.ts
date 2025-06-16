import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TDataGetProducts, TParamsEditProduct } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1EditProduct = (initialValue: TDataGetProducts) => {
  const [payload, setPayload] = useState<Omit<TParamsEditProduct, "productid">>(
    {
      title: initialValue?.title || "",
      price: initialValue?.price || "",
      quantity: initialValue?.quantity || 0,
      category: initialValue?.category
    },
  );

  const isValidDecimal = (num: string) => {
    return /^\d+(\.\d{2})?$/.test(num);
  };

  const getV1EditProduct = async (params: {
    callBackFunction?: any;
  }) => {
    const { callBackFunction } = params;

    if (payload.price && isNaN(Number(payload.price))) {
      await Swal.fire({
        title: "Error",
        text: "Price must be a number",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (payload.price && isNaN(Number(payload.price))) {
      await Swal.fire({
        title: "Error",
        text: "Cost must be a number",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (payload.price && !isValidDecimal(payload.price)) {
      await Swal.fire({
        title: "Error",
        text: "Price must not exceed two decimal places",
        icon: "error",
        confirmButtonText: "Try again",
      });
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

    const response = await Instance_ApiLocal.localEditProduct({
      productid: initialValue.productid,
      ...payload,
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
      text: "Successfully edited a product",
      icon: "success",
      confirmButtonText: "Confirm",
    });

    if (callBackFunction) {
      callBackFunction();
    }

    return;
  };

  return {
    payload,
    setPayload,
    getV1EditProduct,
  };
};

export default useV1EditProduct;
