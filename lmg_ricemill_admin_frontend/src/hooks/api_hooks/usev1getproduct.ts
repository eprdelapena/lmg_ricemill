import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TDataGetProducts, TParamsGetProducts } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";

const useV1GetProduct = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productList, setProductList] = useState<TDataGetProducts[]>([]);
  const [payload, setPayload] = useState<Omit<TParamsGetProducts, "skip">>({
    searchType: undefined,
    searchText: undefined,
  });

  const getV1GetProduct = async () => {
    const response = await Instance_ApiLocal.localGetProduct({
      skip: currentPage,
      ...payload,
    });

    if (response.status !== EAPIStatusCodes.success) {
      await signOut();
      return;
    }

    setProductList(response.data as TDataGetProducts[]);
    return;
  };

  return {
    currentPage,
    setCurrentPage,
    productList,
    setProductList,
    payload,
    setPayload,
    getV1GetProduct,
  };
};

export default useV1GetProduct;
