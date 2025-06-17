import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import Swal from "sweetalert2";

const useV1DeleteProductCategory = (callbackFunction?: () => any) => {
    const deleteProductCategory = async (id: number) => {

        const confirmation = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this category? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",

          });
      
          if (!confirmation.isConfirmed) {
            return;
          }
          

        try{


            const response = await Instance_ApiLocal.localDeleteProductCategory({
                id
            })
            if(response.status !== EAPIStatusCodes.success){
                throw new Error();
            }

            if(callbackFunction){
                callbackFunction();
            }

            return;
        }
        catch(error){
            console.error(error);
            return;
        }
    }

    return {
        deleteProductCategory,
    }
}

export default useV1DeleteProductCategory