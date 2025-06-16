import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  IParamsDeleteOrderUser,
} from "@/types/main_schema";
import { RequestStatusObject } from "@/constant/constant_main";
import { db } from "@/config/drizzle/connectdb";
import { orderuser, order, installment } from "@/config/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";

const v9_delete_orderuser = async (
  req: Request<{}, {}, IParamsDeleteOrderUser>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { transactionid } = req.body;

  await Promise.all([
    db.update(orderuser).set({
      isshow: false
    }).where(and(eq(OrderUserTable.transactionid, transactionid))),
    db.update(order).set({
      isshow: false
    }).where(and(eq(OrderTable.transactionid, transactionid))),
    db.update(installment).set({
      isshow: false
    }).where(and(eq(InstallmentTable.transactionid, transactionid))),
  ]);

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_delete_orderuser;
