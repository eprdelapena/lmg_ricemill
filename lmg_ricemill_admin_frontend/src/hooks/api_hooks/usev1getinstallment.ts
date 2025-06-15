import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import {
  TDataGetInstallment,
  TParamsGetInstallment,
} from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";

const useV1GetInstallment = () => {
  const [installmentList, setInstallmentList] = useState<TDataGetInstallment[]>(
    [],
  );

  const getV1GetInstallment = async (params: TParamsGetInstallment) => {
    const response = await Instance_ApiLocal.localGetInstallment(params);

    if (response.status !== EAPIStatusCodes.success) {
      await signOut();
      return;
    }

    setInstallmentList(response.data!);
    return;
  };

  return {
    getV1GetInstallment,
    installmentList,
    setInstallmentList,
  };
};

export default useV1GetInstallment;
