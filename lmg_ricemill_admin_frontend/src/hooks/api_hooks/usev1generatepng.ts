import Instance_ApiLocal from "@/api/api_local";
import { EParamsDefault } from "@/enum/main_enum";
import { TDataGetProducts, TDataViewOrderItem, TUserSession } from "@/schema/main_schema";
import { Session } from "next-auth";
import Swal from "sweetalert2";

const useV1OrderGenerateBarcode = () => {
  const APILocalOrderGenerateBarcode = async (
    params: {
      sizecategory: string,
      order: TDataViewOrderItem,
      session: TUserSession | null,
    }
  ) => {
    const {
      sizecategory,
      order,
      session
    } = params;
    const currentToken = (session as TUserSession)?.token;

    console.log("current params", params);
    Swal.fire({
      title: "Loading",
      text: "Please wait while we prepare your QR Code...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await fetch(
      `${EParamsDefault.IPAddress}/v9/order_item_generate_barcode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          productid: order.productid,
          orderid: order.orderid,
          sizecategory
        }),
      },
    );

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `order_barcode_${order.title}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up the Blob URL
    URL.revokeObjectURL(url);
    Swal.close();
    return;
  };

  return {
    APILocalOrderGenerateBarcode,
  };
};

export default useV1OrderGenerateBarcode;
