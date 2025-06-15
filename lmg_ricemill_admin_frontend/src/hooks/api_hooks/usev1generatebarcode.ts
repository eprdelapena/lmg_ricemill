import Instance_ApiLocal from "@/api/api_local";
import { EParamsDefault } from "@/enum/main_enum";
import { TDataGetProducts, TUserSession } from "@/schema/main_schema";
import { Session } from "next-auth";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1GenerateBarcode = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const APILocalGenerateBarcode = async (
    sizecategory: string,
    product: TDataGetProducts,
    quantity: number,
    session: Session | null,
  ) => {
    const currentToken = (session?.user as TUserSession)?.token;
    console.log(`${EParamsDefault.IPAddress}:3001/v9/generate_barcode`, "Barcode link")
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
      `${EParamsDefault.IPAddress}:3001/v9/generate_barcode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          productid: product.productid,
          sizecategory,
          quantity
        }),
      },
    );
 
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${product.title}_${product.productid}_qr.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

// Optionally close the loading modal
Swal.close();
  };

  return {
    APILocalGenerateBarcode,
    quantity, 
    setQuantity
  };
};

export default useV1GenerateBarcode;
