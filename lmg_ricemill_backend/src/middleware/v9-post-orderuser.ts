import { Request, Response, NextFunction } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TPostOrderUserParams,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { and, eq } from "drizzle-orm";
import { users } from "@/config/drizzle/schema";
import { EAccountType } from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";

const MW_v9_post_orderuser = async (
  req: Request<{}, {}, TPostOrderUserParams>,
  res: Response<
    | IResponseSuccess<Partial<{ status: number; message: string }>>
    | IResponseFail
  >,
  next: NextFunction,
): Promise<void> => {
  const {
    fullname,
    spouse,
    address,
    mobile,
    description,
    currentpayment,
    totalcost,
  } = req.body;

  if(!fullname typeof fullname !== "string"){

  }

  if(spouse typeof spouse !== "string"){

  }

  if(address typeof address !== "string"){
    
  }

  if(mobile typeof mobile !== "string"){
    
  }

  if(description typeof description !== "string"){
    
  }

  if(currentpayment isNaN(Number(currentpayment))){
    
  }

  if(totalcost isNaN(Number(totalcost))){
    
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

    (req as any).agentcode = result.agentcode;
  }
  next();
};

export default MW_v9_post_orderuser;
