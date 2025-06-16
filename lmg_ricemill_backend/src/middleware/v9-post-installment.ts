import { Request, Response, NextFunction } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsPostInstallment,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { and, eq } from "drizzle-orm";
import { order, users } from "@/config/drizzle/schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_post_installment = async (
  req: Request<{}, {}, TParamsPostInstallment>,
  res: Response<
    | IResponseSuccess<Partial<{ status: number; message: string; data: any }>>
    | IResponseFail
  >,
  next: NextFunction,
): Promise<void> => {
  const {
    amount,
    transactionid,
    description
  } = req.body;

  if(!amount || isNaN(Number(amount))){
    res.status(200).json({
      status: 401,
      message: "Invalid parameters"
    });
    return;
  }

  if(!transactionid || typeof transactionid !== "string"){
    res.status(200).json({
      status: 402,
      message: "Invalid parameters"
    });
    return;
  }

  if(description && typeof description !== "string"){
    res.status(200).json({
      status: 403,
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

    if (result.eaccounttype !== "admin") {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }

    (req as any).agentcode = result.agentcode;
  }

  next();
};

export default MW_v9_post_installment;
