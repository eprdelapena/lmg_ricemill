import {
  pgTable,
  varchar,
  integer,
  serial,
  timestamp,
  boolean,
  numeric,
  primaryKey
} from "drizzle-orm/pg-core";
import { UserTable } from "./table_user";



export const ProductTable = pgTable(
  "producttable",
  {
    id: serial("id").notNull(),
    productid: varchar("productid", { length: 6 }).notNull(),
    agentcode: varchar("agentcode", { length: 255 }).notNull().references(() => UserTable.agentcode),
    title: varchar("title", { length: 255 }).notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    isshow: boolean("isshow").notNull().default(true),
    category: varchar("category", { length: 255 }).notNull(),
    quantity: integer("quantity").notNull().$default(() => 0),
    regdate: timestamp("regdate").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.id, table.productid] }),
  ]
);
