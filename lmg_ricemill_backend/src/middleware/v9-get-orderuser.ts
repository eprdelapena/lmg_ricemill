import { Request, Response, NextFunction } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TPostOrderUserParams,
  IParamsGetOrderUser,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { EAccountType } from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_get_orderuser = async (
  req: Request<{}, {}, IParamsGetOrderUser>,
  res: Response<
    | IResponseSuccess<Partial<{ status: number; message: string; data: any }>>
    | IResponseFail
  >,
  next: NextFunction,
): Promise<void> => {
  const { search, category, begin, end, skip, status} = req.body;

  if(search && typeof search !== "string"){
    res.status(200).json({
      status: 401,
      message: "Invalid parameter"
    });
    return;
  }

  if(category && typeof category !== "string"){
    res.status(200).json({
      status: 402,
      message: "Invalid parameter"
    });
    return;
  }

  if(skip && typeof skip !== "number"){
    res.status(200).json({
      status: 403,
      message: "Invalid parameter"
    });
    return;
  }

  if(status && typeof status !== "string"){
    res.status(200).json({
      status: 404,
      message: "Invalid parameter"
    });
    return;
  }

  if (begin && isNaN(new Date(begin).getTime())) {
    res.status(200).json({
      status: 405,
      message: "Invalid parameter"
    });
    return;
  }

  if (end && isNaN(new Date(end).getTime())) {
    res.status(200).json({
      status: 406,
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
    ) {
      res.status(200).json(RequestStatusObject.invalidAuthorization);
      return;
    }

    (result as any).agentcode = result.agentcode;
  }



  next();
};

export default MW_v9_get_orderuser;
