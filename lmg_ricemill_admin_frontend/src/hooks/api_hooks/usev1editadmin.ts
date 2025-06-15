import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TParamsEditAdmin } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1EditAdmin = () => {
  const [payload, setPayload] = useState<
    Partial<Omit<TParamsEditAdmin, "username">>
  >({
    estatustype: undefined,
  });

  const roles = [
    "admin",
    "admin_secretary",
    "admin_viewer",
    "admin_level_one",
    "admin_level_two",
    "admin_level_three",
  ];

  const getV1EditAdmin = async (
    params: { username: string },
    callbackFunction?: () => any,
  ) => {
    if (!payload.estatustype) {
      await Swal.fire({
        title: "Error",
        text: "Status type must not be empty",
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

    const response = await Instance_ApiLocal.localEditAdmin({
      username: params.username,
      estatustype: payload.estatustype!,
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
      title: "Success",
      text: "Successfully changed the status",
      icon: "success",
      confirmButtonText: "confirm",
    });
    if (callbackFunction) {
      callbackFunction();
    }

    return;
  };

  return {
    getV1EditAdmin,
    payload,
    setPayload,
    roles,
  };
};

export default useV1EditAdmin;
