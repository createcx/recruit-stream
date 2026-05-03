import { pgTable, text, serial, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const placementsTable = pgTable("placements", {
  id: serial("id").primaryKey(),
  candidate: text("candidate").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  salary: numeric("salary", { precision: 15, scale: 2 }),
  feeAmount: numeric("fee_amount", { precision: 15, scale: 2 }),
  feePercent: numeric("fee_percent", { precision: 5, scale: 2 }),
  type: text("type"),
  status: text("status").notNull().default("active"),
  invoiceNum: text("invoice_num"),
  paymentStatus: text("payment_status"),
  guaranteePeriod: text("guarantee_period"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertPlacementSchema = createInsertSchema(placementsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertPlacement = z.infer<typeof insertPlacementSchema>;
export type Placement = typeof placementsTable.$inferSelect;
