import {
    pgTable,
    varchar,
    serial,
} from "drizzle-orm/pg-core";
import { UserTable } from "./table_user";

export const ProductCategoryTable = pgTable("productcategorytable", {
    id: serial("id").primaryKey().notNull(),
    category: varchar("category", { length: 255 }).notNull(),
    agentcode: varchar("agentcode", { length: 255 }).notNull().references(() => UserTable.agentcode),
});
