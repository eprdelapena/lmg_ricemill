import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TParamsPostProduct } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1PostProduct = () => {
  const [payload, setPayload] = useState<TParamsPostProduct>({
    title: "",
    price: "",
    cost: "",
    category: "",
    image: undefined,
    quantityxxs: 0,
    quantityxs: 0,
    quantittys: 0,
    quantitym: 0,
    quantityl: 0,
    quantityxl: 0,
    quantityxxl: 0,
    quantity5: 0,
    quantity55: 0,
    quantity6: 0,
    quantity65: 0,
    quantity7: 0,
    quantity75: 0,
    quantity8: 0,
    quantity85: 0,
    quantity9: 0,
    quantity95: 0,
    quantity100: 0,
    quantity105: 0,
    quantitty110: 0,
    quantity115: 0,
    quantity120: 0,
    quantitydefault: 0,
  });

  const isValidDecimal = (num: string) => {
    return /^\d+(\.\d{2})?$/.test(num);
  };

  const getV1PostProduct = async (params: { callBackFunction?: any }) => {
    const { title, price, category, image, cost } = payload;

    if (
      !title ||
      !["bags", "shoes", "clothes", "jewelry", "watches", "others"].includes(
        category,
      )
    ) {
      await Swal.fire({
        title: "Error",
        text: "Please fill up all fields",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (!image) {
      await Swal.fire({
        title: "Error",
        text: "Please input product image",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (isNaN(Number(price))) {
      await Swal.fire({
        title: "Error",
        text: "Price must be a number",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (!isValidDecimal(price)) {
      await Swal.fire({
        title: "Error",
        text: "Price field must not exceed two decimal places",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (isNaN(Number(cost))) {
      await Swal.fire({
        title: "Error",
        text: "Cost must be a number",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (!isValidDecimal(cost)) {
      await Swal.fire({
        title: "Error",
        text: "Cost field must not exceed two decimal places",
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

    const response = await Instance_ApiLocal.localPostProduct({
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
      text: "Successfully posted a product",
      icon: "success",
      confirmButtonText: "Confirm",
    });

    if (params?.callBackFunction) {
      const { callBackFunction } = params;
      callBackFunction();
    }

    return;
  };

  return {
    getV1PostProduct,
    payload,
    setPayload,
  };
};

export default useV1PostProduct;
