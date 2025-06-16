import {
  pgTable,
  varchar,
  integer,
  serial,
  timestamp,
  boolean,
  numeric,
} from "drizzle-orm/pg-core";
import { ProductTable } from "./table_product";
import { OrderUserTable } from "./table_orderuser";

export const OrderTable = pgTable("ordertable", {
  id: serial("id").primaryKey().notNull(),
  productid: varchar("productid", { length: 255 }).notNull().references(() => ProductTable.productid),
  transactionid: varchar("transactionid", { length: 255 }).notNull().references(() => OrderUserTable.transactionid),
  agentcode: varchar("agentcode", { length: 255 }).notNull(),
  price: numeric("price", {
    precision: 10,
    scale: 2,
  }).notNull(),
  quantity: integer("quantity").notNull(),
  isshow: boolean("isshow").notNull().default(true),
  transactiondate: timestamp("transactiondate").defaultNow(),
});
