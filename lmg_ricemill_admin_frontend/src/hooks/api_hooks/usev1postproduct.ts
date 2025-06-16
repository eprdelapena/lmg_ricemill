import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TParamsPostProduct } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1PostProduct = () => {
  const [payload, setPayload] = useState<TParamsPostProduct>({
    title: "",
    category: "",
    price: "",
    quantity: 0
  });

  const isValidDecimal = (num: string) => {
    return /^\d+(\.\d{2})?$/.test(num);
  };

  const getV1PostProduct = async (params: { callBackFunction?: any }) => {
    const { title, price, category, quantity } = payload;

    if(title.length === 0){
      Swal.fire({
        title: "Error",
        text: "Product must have a name",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }

    if(category.length === 0){
      Swal.fire({
        title: "Error",
        text: "Category must not be empty",
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

    Swal.fire({
      title: "Loading",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
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
