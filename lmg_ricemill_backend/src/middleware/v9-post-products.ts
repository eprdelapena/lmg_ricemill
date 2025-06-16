import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseFail,
  IResponseSuccess,
  TPostProductsParams,
} from "@/types/main_schema";
import { Request, Response, NextFunction } from "express";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_post_products = async (
  req: Request<{}, {}, Partial<TPostProductsParams>>,
  res: Response<IResponseSuccess<Partial<any>> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {

  const {} = req.body
  for (const [key, value] of Object.entries(req.body)){
    if (key === "quantity" && typeof value !== "number") {
      res.status(200).json({
        message: "Invalid parameters",
        status: 407
      });
      return;
    }
    if(key === 'price' && isNaN(Number(value))){
      res.status(200).json({
        message: "Invalid parameters",
        status: 408
      });
      return;
    }

    if(key === 'category' && typeof value !== 'string'){
      res.status(200).json({
        message: "Invalid parameters",
        status: 409
      });
      return;
    }

    if(key === 'title' && typeof value !== 'string'){
      res.status(200).json({
        message: "Invalid parameters",
        status: 409
      });
      return;
    }
  }
  
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(200).json(RequestStatusObject.invalidAuthorization);
    return;
  }

  if (authHeader) {
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
      // (result as any).eaccounttype !== "admin_viewer" &&
      // (result as any).eaccounttype !== "admin_level_one" &&
      // (result as any).eaccounttype !== "admin_level_two" &&
      // (result as any).eaccounttype !== "admin_level_three"
    ) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }
  }

  next();
};

export default MW_v9_post_products;
