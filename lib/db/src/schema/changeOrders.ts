import { pgTable, text, serial, timestamp, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const changeOrdersTable = pgTable("change_orders", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  sowId: integer("sow_id"),
  client: text("client").notNull(),
  deltaValue: numeric("delta_value", { precision: 15, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  requestedBy: text("requested_by"),
  approver: text("approver"),
  rationale: text("rationale"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertChangeOrderSchema = createInsertSchema(changeOrdersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertChangeOrder = z.infer<typeof insertChangeOrderSchema>;
export type ChangeOrder = typeof changeOrdersTable.$inferSelect;
