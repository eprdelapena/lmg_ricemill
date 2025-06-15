import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TParamsPostExpense } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1PostExpense = () => {
  const [payload, setPayload] = useState<
    Partial<Omit<TParamsPostExpense, "username">>
  >({
    memo: "",
    expense: "",
  });

  const getV1PostExpense = async (params: { username: string }) => {
    const { memo, expense } = payload;

    if (!expense || Number(expense) === 0 || isNaN(Number(expense))) {
      Swal.fire({
        title: "Error",
        text: "Expense must be a valid number and must be more than zero (0)",
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

    const response = await Instance_ApiLocal.localPostExpense({
      memo,
      expense: expense!,
      username: params.username,
    });

    Swal.close();
    if (response.status !== EAPIStatusCodes.success) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong, please try again later",
        icon: "error",
        confirmButtonText: "Try again",
      });
      await signOut();
      return;
    }

    Swal.fire({
      title: "Success",
      text: "Successfully posted the expenses",
      icon: "success",
      confirmButtonText: "Confirm",
    });
    return;
  };

  return {
    getV1PostExpense,
    payload,
    setPayload,
  };
};

export default useV1PostExpense;
