import {
  pgTable,
  varchar,
  serial,
  timestamp,
  numeric,
  boolean,
  primaryKey
} from "drizzle-orm/pg-core";
import { OrderUserTable } from "./table_orderuser";

export const InstallmentTable = pgTable(
  "installmenttable", 
  {
  id: serial("id").primaryKey().notNull(),
  transactionid: varchar("transactionid", { length: 255 }).notNull().references(() => OrderUserTable.transactionid),
  agentcode: varchar("agentcode", { length: 255 }).notNull(),
  installment: numeric("installment", {
    precision: 10,
    scale: 2,
  }).$default(() => "0"),
  isshow: boolean("isshow").notNull().default(true),
  description: varchar("description", { length: 255 }).$default(() => {
    return "";
  }),
  installmentdate: timestamp("installmentdate").defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.id, table.transactionid] }),
  ]
  
);
