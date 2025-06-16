import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseFail,
  IResponseSuccess,
  TParamsPostInstallment,
} from "@/types/main_schema";
import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";
import { and, desc, eq, sql } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { ProductTable } from "@/config/drizzle/tables/table_product";

const v9_post_installment = async (
  req: Request<{}, {}, TParamsPostInstallment>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { transactionid, description, amount } = req.body;

  if(!transactionid || typeof transactionid !== "string"){
    res.status(200).json({
      status: 401,
      message: "Invalid parameters"
    });
    return;
  }

  if(description && typeof description !== "string"){
    res.status(200).json({
      status: 402,
      message: "Invalid parameters"
    });
    return;
  }

  if(!amount || isNaN(Number(amount))){
    res.status(200).json({
      status: 403,
      message: "Invalid parameters"
    });
    return;
  }

  const [isOrderExist] = await Promise.all([
    db.query.orderuser.findFirst({
      where: and(eq(OrderUserTable.transactionid, transactionid)),
    }),
  ]);

  if (!isOrderExist) {
    res.status(200).json({
      status: 404,
      message: "Invalid parameters"
    });
    return;
  }

  const newInstallment = {
    transactionid,
    installment: amount,
    description,
    agentcode: (req as any).agentcode
  };

  await Promise.all([
    db.update(OrderUserTable).set({
       currentpayment: `${Number(isOrderExist.currentpayment) + Number(amount)}`,
    }).where(and(eq(OrderUserTable.transactionid, transactionid))),
    db.insert(InstallmentTable).values(newInstallment),
  ]);

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_post_installment;
