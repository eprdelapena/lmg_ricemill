import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsDeleteInstallment,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { and, eq } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";

const v9_delete_installment = async (
  req: Request<{}, {}, TParamsDeleteInstallment>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { transactionid, id } = req.body;

  const [orderUser, installment] = await Promise.all([
    db.query.orderuser.findFirst({
      where: and(eq(OrderUserTable.transactionid, transactionid)),
    }),
    db.query.installment.findFirst({
      where: and(eq(InstallmentTable.id, id)),
    }),
  ]);

  if (!orderUser || !installment) {
    res.status(200).json(RequestStatusObject.invalidField);
    return;
  }

  await Promise.all([
    db.delete(InstallmentTable).where(and(eq(InstallmentTable.id, id))),
    db
      .update(OrderUserTable)
      .set({
        currentpayment: `${Number(orderUser.currentpayment) - Number(installment.installment)}`,
      }),
  ]);

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_delete_installment;
