import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TParamsDeleteUser } from "@/schema/main_schema";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

const useV1DeleteUser = () => {
  const getV1DeleteUser = async (
    params: TParamsDeleteUser,
    callbackFunction?: () => any,
  ) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (!isConfirmed) return;

    const { username } = params;
    Swal.fire({
      title: "Loading",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loader animation
      },
    });
    const response = await Instance_ApiLocal.localDeleteUser({
      username,
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
      text: "Successfully deleted user",
      icon: "success",
      confirmButtonText: "confirm",
    });
    if (callbackFunction) {
      callbackFunction();
    }

    return;
  };

  return {
    getV1DeleteUser,
  };
};

export default useV1DeleteUser;
