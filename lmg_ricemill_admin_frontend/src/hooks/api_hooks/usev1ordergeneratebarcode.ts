import Instance_ApiLocal from "@/api/api_local";
import { EParamsDefault } from "@/enum/main_enum";
import { TDataGetProducts, TDataViewOrderItem, TUserSession } from "@/schema/main_schema";
import { Session } from "next-auth";
import Swal from "sweetalert2";

const useV1OrderGenerateBarcode = () => {
  const APILocalOrderGenerateBarcode = async (
    params: {
      orderid: string,
      session: TUserSession | null,
    }
  ) => {
    const {
      orderid,
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
      `${EParamsDefault.IPAddress}:3001/v9/order_item_generate_barcode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          orderid,
        }),
      },
    );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${orderid}_qr.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

// Optionally close the loading modal
Swal.close();
    return;
  };

  return {
    APILocalOrderGenerateBarcode,
  };
};

export default useV1OrderGenerateBarcode;
