import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { useState } from "react";
import Swal from "sweetalert2";

const useV1PostProductCategory = (categoryList: {id: number, category: string, agentcode: string}[], callbackFunction?: () => any) => {
    const [category, setCategory] = useState<string>("");

    const postProductCategory = async () => {
        if (!category || category?.length === 0) {
            Swal.fire({
                title: "Error",
                text: "Category field must not be empty",
                icon: "error",
                confirmButtonColor: 'red',
                confirmButtonText: "Try again",
            })
            return
        }

        const filtedCategory = categoryList.map((item) => item.category);

        if(filtedCategory.includes(category.toLocaleUpperCase())){
            Swal.fire({
                title: "Warning",
                text: "Category already exists",
                icon: "warning",
                confirmButtonColor: 'red',
                confirmButtonText: "Try again",
            })
            return
        }

        try{

            const response = await Instance_ApiLocal.localPostProductCategory({
                category
            })

            if(response.status !== EAPIStatusCodes.success){
                throw new Error();
            }
            Swal.fire({
                title: "Success",
                text: "Successfully created a category",
                icon: "success",
                confirmButtonText: "Confirm",
              })
              
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
        postProductCategory,
        category,
        setCategory
    }
}

export default useV1PostProductCategory;