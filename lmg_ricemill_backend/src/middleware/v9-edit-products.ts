import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseFail,
  IResponseSuccess,
  TEditProductsParams,
  TPostProductsParams,
} from "@/types/main_schema";
import { Request, Response, NextFunction } from "express";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_edit_products = async (
  req: Request<{}, {}, Partial<TEditProductsParams>>,
  res: Response<IResponseSuccess<Partial<any>> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const {
    productid,
    title,
    price,
    quantity,
    category,
  } = req.body;

  if(!productid || typeof productid !== 'string'){
    res.status(200).json({
      status: 406,
      message: "Invalid parameter"
    });
    return;
  }

  if(title && typeof title !== 'string'){
    res.status(200).json({
      status: 407,
      message: "Invalid parameter"
    });
    return;
  }

  if(quantity && isNaN(Number(quantity))){
    res.status(200).json({
      status: 408,
      message: "Invalid parameter"
    });
    return;
  }

  if(price && isNaN(Number(price))){
    res.status(200).json({
      status: 409,
      message: "Invalid parameter"
    });
    return;
  }

  if(category && typeof category !== 'string'){
    res.status(200).json({
      status: 410,
      message: "Invalid parameter"
    });
    return;
  }

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    let token = authHeader.slice(7);
    const result = await db.query.users.findFirst({
      where: and(eq(users.token, token)),
    });
    if (!result) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }

    if (
      result.eaccounttype !== "admin" 
      // (result as any).eaccounttype !== "admin_secretary" &&
      // (result as any).eaccounttype !== "admin_level_three" &&
      // (result as any).eaccounttype !== "admin_level_two"
    ) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }

    (req as any).agentcode = result.agentcode;

  } else {
    res.status(200).json(RequestStatusObject.invalidAuthorization);
    return;
  }

  next();
};

export default MW_v9_edit_products;
