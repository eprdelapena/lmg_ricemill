import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TDataGetProducts, TParamsEditProduct } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1EditProduct = (initialValue: TDataGetProducts) => {
  const [payload, setPayload] = useState<Omit<TParamsEditProduct, "productid">>(
    {
      title: initialValue.title,
      price: initialValue.price,
      cost: initialValue.cost,
      category: initialValue.category,
      quantityxxs: initialValue.quantityxxs,
      quantityxs: initialValue.quantityxs,
      quantittys: initialValue.quantitys,
      quantitym: initialValue.quantitym,
      quantityl: initialValue.quantityl,
      quantityxl: initialValue.quantityxl,
      quantityxxl: initialValue.quantityxxl,
      quantity5: initialValue.quantity5,
      quantity55: initialValue.quantity55,
      quantity6: initialValue.quantity6,
      quantity65: initialValue.quantity65,
      quantity7: initialValue.quantity7,
      quantity75: initialValue.quantity75,
      quantity8: initialValue.quantity8,
      quantity85: initialValue.quantity85,
      quantity9: initialValue.quantity9,
      quantity95: initialValue.quantity95,
      quantity100: initialValue.quantity100,
      quantity105: initialValue.quantity105,
      quantitty110: initialValue.quantity110,
      quantity115: initialValue.quantity115,
      quantity120: initialValue.quantity120,
      quantitydefault: initialValue.quantitydefault,
    },
  );

  const isValidDecimal = (num: string) => {
    return /^\d+(\.\d{2})?$/.test(num);
  };

  const getV1EditProduct = async (params: {
    productid: number;
    callBackFunction?: any;
  }) => {
    const { productid, callBackFunction } = params;

    if (payload.price && isNaN(Number(payload.price))) {
      await Swal.fire({
        title: "Error",
        text: "Price must be a number",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if (payload.cost && isNaN(Number(payload.cost))) {
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

    if (payload.cost && !isValidDecimal(payload.cost)) {
      await Swal.fire({
        title: "Error",
        text: "Cost must not exceed two decimal places",
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
      productid,
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
