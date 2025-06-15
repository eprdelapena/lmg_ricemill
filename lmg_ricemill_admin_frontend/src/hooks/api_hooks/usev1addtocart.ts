import { TParamsPostOrders } from "@/schema/main_schema";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1AddToCart = () => {
  const [payload, setPayload] = useState<
    Omit<TParamsPostOrders, "productId" | "price" | "cost">
  >({
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

  const getV1AddToCart = (
    params: Pick<TParamsPostOrders, "price" | "productId">,
    userId: string,
    additional: {
      title: string;
      category: string;
    },
  ) => {
    const localStorageKey = `cartItems_${userId}`;
    const currentItem: TParamsPostOrders & { title: string } = {
      ...params,
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
