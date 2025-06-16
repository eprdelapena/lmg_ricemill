import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TEditProductsParams,
} from "@/types/main_schema";
import { ECategory, RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { product } from "@/config/drizzle/schema";
import { and, eq } from "drizzle-orm";

const v9_edit_products = async (
  req: Request<{}, {}, Partial<TEditProductsParams>>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  let {
    productid,
    title,
    price,
    quantity,
    category,
  } = req.body;

  const updatedFields: any = {};

  if (title) updatedFields.title = title;
  if (price) updatedFields.price = price;
  if (category) updatedFields.category = category.toLocaleUpperCase();
  if (quantity) updatedFields.quantity = quantity;

  await db
    .update(product)
    .set(updatedFields)
    .where(and(eq(product.productid, productid!), eq(product.agentcode, (req as any).agentcode)));
  res.status(200).json(RequestStatusObject.success);

  return;
};

export default v9_edit_products;
