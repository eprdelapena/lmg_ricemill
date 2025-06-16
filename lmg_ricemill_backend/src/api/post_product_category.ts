import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseFail,
  IResponseSuccess,
  TParamsPostProductCategory,
} from "@/types/main_schema";
import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import { ProductCategoryTable } from "@/config/drizzle/tables/table_product_category";

const v9_post_product_category = async (
  req: Request<{}, {}, TParamsPostProductCategory>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {

    const {category} = req.body

    const categoryList = await db.query.productcategory.findMany();
    const categories = categoryList.map(item => item.category);
    if(categories.includes(category.toLocaleUpperCase())){
        res.status(200).json({
            status: 402,
            message: "Category already exists"
        });
    }

  await Promise.all([
    db.insert(ProductCategoryTable).values({
        category: category.toLocaleUpperCase(),
        agentcode: (req as any).agentcode
    }),
  ]);

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_post_product_category;
