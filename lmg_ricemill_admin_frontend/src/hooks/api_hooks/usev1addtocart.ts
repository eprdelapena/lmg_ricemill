import { TParamsPostOrders } from "@/schema/main_schema";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1AddToCart = () => {
  const [payload, setPayload] = useState<
    Omit<TParamsPostOrders, "productid">
  >({
    quantity: 0,
    price: "0.00"
  });

  const getV1AddToCart = (
    productid: string,
    userId: string,
    additional: {
      title: string;
      category: string;
    },
  ) => {
    if (
      isNaN(Number(payload.price)) ||
      !/^\d+(\.\d{1,2})?$/.test(payload.price)
    ) {
      Swal.fire({
        title: "Error",
        text: "Price must be a number with no more than two decimal places",
        icon: "error",
        confirmButtonText: "Try again",
      });
      return;
    }
    const localStorageKey = `cartItems_${userId}`;
    const currentItem: TParamsPostOrders & { title: string } = {
      productid,
      ...payload,
      ...additional,
    };

    const existingCart = localStorage.getItem(localStorageKey);
    let cartArray: TParamsPostOrders[] = [];

    if (existingCart) {
      cartArray = JSON.parse(existingCart);

    }

    cartArray.push(currentItem);
    localStorage.setItem(localStorageKey, JSON.stringify(cartArray));

    Swal.fire({
      title: "Success",
      text: "Item added to cart",
      icon: "success",
    });
  };

  return {
    payload,
    setPayload,
    getV1AddToCart,
  };
};

export default useV1AddToCart;
