import { Request, Response, NextFunction } from "express";
import { RequestStatusObject } from "@/constant/constant_main";
import {
  IRegister,
  IResponseSuccess,
  IResponseFail,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { users } from "@/config/drizzle/schema";
import { eq, or } from "drizzle-orm";

const MW_v9_register = async (
  req: Request<{}, {}, IRegister>,
  res: Response<IResponseSuccess<IRegister> | IResponseFail>,
  next: NextFunction,
): Promise<void> => {
  const { fullname, agentcode, mobile, email, estatustype, password, username } =
    req.body;

  const isEmpty: boolean =
    !estatustype ||
    !agentcode ||
    !mobile ||
    !email ||
    !password ||
    !username ||
    !fullname;

  if (isEmpty) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const isTypeError =
    typeof estatustype !== "string" ||
    typeof agentcode !== "string" ||
    typeof password !== "string" ||
    typeof email !== "string" ||
    typeof mobile !== "string" ||
    typeof username !== "string" ||
    typeof fullname !== "string";

  if (isTypeError) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const queryUser = await db.query.users.findFirst({
    where: or(eq(users.username, username), eq(users.email, email)),
  });

  if (queryUser) {
    res.status(200).json(RequestStatusObject.invalidUserExists);
    return;
  }
  next();
};

export default MW_v9_register;
