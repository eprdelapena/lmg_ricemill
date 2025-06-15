import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

const useV1DeleteLogs = (getV1GetLogs: () => Promise<void>) => {
    const getV1DeleteLogs = async (itemid: string) => {
        const response = await Instance_ApiLocal.localDeleteLog({itemid});

        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this record?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
          });
          if (!isConfirmed) return;

        if(response.status !== EAPIStatusCodes.success){
            Swal.fire({
                title: "Error",
                text: "Something went wrong please try again later",
                icon: "error",
                confirmButtonText: "Try again",
              });
              await signOut();
            return;
        }

        getV1GetLogs();
        Swal.fire({
            title: "Success",
            text: "Item record successfully deleted",
            icon: "success",
          });
        return;

        
    }

    return {
        getV1DeleteLogs
    }
}

export default useV1DeleteLogs;