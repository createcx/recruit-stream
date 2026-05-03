import { pgTable, text, serial, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const financialsTable = pgTable("financials", {
  id: serial("id").primaryKey(),
  invoiceNum: text("invoice_num").notNull(),
  client: text("client").notNull(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  type: text("type"),
  status: text("status").notNull().default("pending"),
  dueDate: text("due_date"),
  glCode: text("gl_code"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertFinancialSchema = createInsertSchema(financialsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertFinancial = z.infer<typeof insertFinancialSchema>;
export type Financial = typeof financialsTable.$inferSelect;
