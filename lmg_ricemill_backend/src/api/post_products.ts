import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TPostProductsParams,
} from "@/types/main_schema";
import { ECategory, RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { product } from "@/config/drizzle/schema";
import { generateId } from "@/utils/main_utils";

const v9_post_products = async (
  req: Request<{}, {}, Partial<TPostProductsParams>>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  let {
    title,
    price,
    category,
    quantity
  } = req.body;
  
  const regdate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Manila",
  });

  const regDateObj = new Date(regdate);
  const productid = generateId();
  let newValues = { 
    quantity: quantity!,
    category: category?.toLocaleUpperCase()!,
    title: title!?.toLocaleUpperCase() || '',
    agentcode: (req as any).agentcode,
    regdate: regDateObj,
    productid
  };

  await db.insert(product).values(newValues);
  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_post_products;
