import { Request, Response, NextFunction } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  IProductData,
  TGetProductsParams,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { users } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";
import { and, eq } from "drizzle-orm";

const MW_v9_get_products = async (
  req: Request<{}, {}, Partial<TGetProductsParams>>,
  res: Response<IResponseSuccess<Partial<IProductData>> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {

  const { searchText, searchType, skip } = req.body;

  if(searchText && typeof searchText !== "string"){
    res.status(200).json({
      status: 405,
      message: "Invalid parameter"
    });
    return;
  }

  if(searchType && typeof searchType !== "string"){
    res.status(200).json({
      status: 406,
      message: "Invalid parameter"
    });
    return;
  }

  if(skip && typeof skip !== "number"){
    res.status(200).json({
      status: 407,
      message: "Invalid parameter"
    });
    return;
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

    (req as any).agentcode = result.agentcode;
  }

  next();
};

export default MW_v9_get_products;
