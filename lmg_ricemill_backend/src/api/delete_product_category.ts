import { Request, Response } from "express";
import {
    IResponseSuccess,
    IResponseFail,
    TParamsDeleteProductCategory,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { and, eq } from "drizzle-orm";
import { ProductCategoryTable } from "@/config/drizzle/tables/table_product_category";

const v9_delete_product_category = async (
    req: Request<{}, {}, TParamsDeleteProductCategory>,
    res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
    const { id } = req.body;

    await db.delete(ProductCategoryTable).where(
        and(eq(ProductCategoryTable.id, id), eq(ProductCategoryTable.agentcode, (req as any).agentcode))
    );

    res.status(200).json(RequestStatusObject.success);
    return;
};

export default v9_delete_product_category;
