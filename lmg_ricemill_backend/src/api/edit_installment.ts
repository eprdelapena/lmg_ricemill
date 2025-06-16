import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsEditInstallment,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { and, eq } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";

const v9_edit_installment = async (
  req: Request<{}, {}, TParamsEditInstallment>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { transactionid, id, installment, description } = req.body;

  const [orderUser, installmentData] = await Promise.all([
    db.query.orderuser.findFirst({
      where: and(eq(OrderUserTable.transactionid, transactionid)),
    }),
    db.query.installment.findFirst({
      where: and(eq(InstallmentTable.id, id)),
    }),

  ]);

  if (!orderUser) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  const newInstallment = {
    installment: installment ? installment : undefined,
    description: description ? description: undefined
  }

  await Promise.all([
    db
      .update(InstallmentTable)
      .set(newInstallment)
      .where(and(eq(InstallmentTable.id, id))),

  ]);

  if(installment){
    await db
      .update(OrderUserTable)
      .set({
        currentpayment: `${Number(orderUser.currentpayment) - Number(installmentData?.installment) + (installment)}`,
      })
  }

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_edit_installment;
