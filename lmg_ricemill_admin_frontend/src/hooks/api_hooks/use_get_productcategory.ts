import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { useState } from "react";

const useV1GetProductCategory = () => {
    const [categories, setCategories] = useState<{id: number, category: string, agentcode: string}[]>([]);
    const getProductCategory = async () => {
        try{
            const response = await Instance_ApiLocal.localGetProductCategory({});

            if(response.status !== EAPIStatusCodes.success){
                throw new Error();
            }

            setCategories(response?.data || []);
            return;
        }
        catch(error){
            console.error(error);
            return;
        }
    }   

    return {
        getProductCategory,
        categories,
        setCategories
    }
}

export default useV1GetProductCategory;