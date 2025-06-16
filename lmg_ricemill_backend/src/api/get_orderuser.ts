import { Request, Response } from "express";
import {
  IResponseSuccess,
  IResponseFail,
  IParamsGetOrderUser,
} from "@/types/main_schema";
import { db } from "@/config/drizzle/connectdb";
import { and, desc, eq, gte, ilike, lte , lt} from "drizzle-orm";
import { OrderUserTable } from "@/config/drizzle/tables/table_orderuser";

const v9_get_orderuser = async (
  req: Request<{}, {}, IParamsGetOrderUser>,
  res: Response<IResponseSuccess<any> | IResponseFail>,
): Promise<void> => {
  const { begin, end, search, status, category, skip } = req.body;

  const limit: number = 20;
  let currentPage = 1;

  if (skip) {
    currentPage = skip;
  }

  const offset: number = (currentPage - 1) * limit;

  let dateBegin;
  let dateEnd;
  if (begin) {
    dateBegin = new Date(begin);
  }
  if (end) {
    dateEnd = new Date(end);
  }


  const userList = await db.query.orderuser.findMany({
    where: and(
    category === "fullname" && search
      ? ilike(OrderUserTable.fullname, `%${search}%`)
      : undefined,
      category === "transactionid" && search
      ? eq(OrderUserTable.transactionid, search)
      : undefined,
      status === "paid"
      ? gte(OrderUserTable.totalcost, OrderUserTable.currentpayment)
      : undefined,
      status === "notpaid"
        ? lt(OrderUserTable.totalcost, OrderUserTable.currentpayment)
      : undefined,
      dateBegin ? gte(OrderUserTable.transactiondate, dateBegin) : undefined,
      dateEnd ? lte(OrderUserTable.transactiondate, dateEnd) : undefined,
    ),
    limit,
    offset,
    orderBy: desc(OrderUserTable.id),
  });
  res.status(200).json({
    message: "success",
    status: 200,
    data: userList.length ? userList : [],
  });
  return;
};

export default v9_get_orderuser;
