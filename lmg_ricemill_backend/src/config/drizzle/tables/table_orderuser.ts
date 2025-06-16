import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  serial,
  timestamp,
  primaryKey,
  text,
  numeric,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const OrderUserTable = pgTable(
  "orderusertable", 
  {
  id: serial("id").primaryKey().notNull(),
  transactionid: varchar("transactionid", { length: 255 }).notNull(),
  fullname: varchar("fullname", { length: 255 }).notNull().default(''),
  agentcode: varchar("agentcode", { length: 255 }).notNull().default(''),
  spouse: varchar("spouse", { length: 255 }).notNull().default(''),
  address: varchar("address", { length: 255 }).notNull().default(''),
  mobile: varchar("mobile", { length: 255 }).notNull().default(''),
  description: text("description").notNull().default(''),
  currentpayment: numeric("currentpayment", {
    precision: 10,
    scale: 2,
  }).$default(() => "0"),
  totalcost: numeric("totalcost", {
    precision: 10,
    scale: 2,
  }).$default(() => "0"),
  isshow: boolean("isshow").notNull().default(true),
  transactiondate: timestamp("transactiondate").notNull(),
},
(table) => [
  primaryKey({ columns: [table.id, table.transactionid] }),
]

);
