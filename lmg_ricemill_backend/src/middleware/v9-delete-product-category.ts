import { Request, Response, NextFunction } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsGetProductCategory,
  TParamsDeleteProductCategory,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_delete_product_category = async (
  req: Request<{}, {}, TParamsDeleteProductCategory>,
  res: Response<
    | IResponseSuccess<Partial<{ status: number; message: string }>>
    | IResponseFail
  >,
  next: NextFunction,
): Promise<void> => {


  const { id} = req.body;

  if (!id || typeof id !== "number") {
    res.status(200).json({
        status: 401,
        message: "Invalid parameters"
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
      result.eaccounttype !== "admin" &&
      (result as any).eaccounttype !== "admin_secretary"
    ) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }

    (req as any).agentcode = result.agentcode;
  }


  next();
};

export default MW_v9_delete_product_category;
