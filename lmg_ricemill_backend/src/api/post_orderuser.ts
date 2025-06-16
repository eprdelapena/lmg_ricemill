import { RequestStatusObject } from "@/constant/constant_main";
import {
  IResponseFail,
  IResponseSuccess,
  TPostOrderUserParams,
} from "@/types/main_schema";
import { Request, Response } from "express";
import { db } from "@/config/drizzle/connectdb";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";
import { ProductTable } from "@/config/drizzle/tables/table_product";
import { and, desc, eq } from "drizzle-orm";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { InstallmentTable } from "@/config/drizzle/tables/table_downpayment";

const v9_post_orderuser = async (
  req: Request<{}, {}, TPostOrderUserParams>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  
  const {
    fullname,
    spouse,
    address,
    mobile,
    description,
    currentpayment,
    totalcost,
    orders
  } = req.body;

  const generateTransactionId = (): string => {
    const cleanName = fullname.slice(0,3).replace(/\s+/g, '').toLowerCase();
    const randomLetters = Array.from({ length: 4 }, () =>
      String.fromCharCode(97 + Math.floor(Math.random() * 26)) // a–z
    ).join('');
    const randomNumbers = Math.floor(100 + Math.random() * 900); // 3-digit number
    return `${cleanName}_${randomLetters}${randomNumbers}`;
  };

  const transactionid = generateTransactionId();

  for (const item of orders) {
    const product = await db.query.product.findFirst({
      where: and(eq(ProductTable.productid, item.productid)),
    });

    if (!product) {
      res.status(500).json(RequestStatusObject.invalidField);
      return;
    }

    await Promise.all([
      db
        .update(ProductTable)
        .set({
          quantity: (product?.quantity || 0) - (item?.quantity || 0),
        })
        .where(and(eq(ProductTable.productid, item.productid))),
      db.insert(OrderTable).values({
        productid: item.productid,
        agentcode: (req as any).agentcode,
        transactionid,
        price: item.price, //total price not per unit
        quantity: item.quantity,
      }),
    ]);
  }

  const newOrder = {
    transactionid,
    fullname,
    agentcode: (req as any).agentcode,
    spouse,
    address,
    mobile,
    description,
    currentpayment,
    totalcost,
  };

  const newInstallment = {
    transactionid,
    agentcode: (req as any).agentcode,
    installment: `${Number(currentpayment) || 0}`
  };

  await Promise.all([
    db.insert(OrderUserTable).values(newOrder),
    db.insert(InstallmentTable).values(newInstallment),
  ]);

  res.status(200).json(RequestStatusObject.success);
  return;
};

export default v9_post_orderuser;
