import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  TParamsViewOrderItem,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { and, eq, desc } from "drizzle-orm";
import { OrderTable } from "@/config/drizzle/tables/table_order";
import { ProductTable } from "@/config/drizzle/tables/table_product";

const v9_view_order_item = async (
  req: Request<{}, {}, TParamsViewOrderItem>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  let { transactionid } = req.body;
  const agentcode = (req as any).agentcode;
  const result = await db
    .select({
      id: OrderTable.id,
      productid: OrderTable.productid,
      quantity: OrderTable.quantity,
      productname: ProductTable.title
    })
    .from(OrderTable)
    .where(and(eq(OrderTable.transactionid, transactionid), eq(OrderTable.agentcode, agentcode)))
    .innerJoin(
      ProductTable,
      and(eq(ProductTable.productid, OrderTable.productid)),
    )
    .orderBy(desc(OrderTable.productid));

  res.status(200).json({
    message: "success",
    status: 200,
    data: result.length > 0 ? result : [],
  });
};

export default v9_view_order_item;
