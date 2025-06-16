import {
  IResponseFail,
  IResponseSuccess,
  TParamsGetProductCategory,
} from "@/types/main_schema";
import { Request, Response } from "express";
import { desc, and, eq, order } from "drizzle-orm";
import { db } from "@/config/drizzle/connectdb";
import { ProductCategoryTable } from "@/config/drizzle/tables/table_product_category";

const v9_get_product_category = async (
  req: Request<{}, {}, TParamsGetProductCategory>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {

  const categoryList = await db.query.productcategory.findMany({
    where: and(
        eq(ProductCategoryTable.agentcode, (req as any).agentcode)
    ),
    orderBy: desc(ProductCategoryTable.id),
  });

  res.status(200).json({
    message: "success",
    status: 200,
    data: categoryList || [],
  });
  return;
};

export default v9_get_product_category;
