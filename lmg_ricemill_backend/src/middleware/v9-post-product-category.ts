import { Request, Response, NextFunction } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsPostExpense,
  TParamsPostProductCategory,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_post_product_category = async (
  req: Request<{}, {}, TParamsPostProductCategory>,
  res: Response<
    | IResponseSuccess<Partial<{ status: number; message: string }>>
    | IResponseFail
  >,
  next: NextFunction,
): Promise<void> => {

    const { category} = req.body;

    if (!category || typeof category !== "string") {
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

export default MW_v9_post_product_category;
