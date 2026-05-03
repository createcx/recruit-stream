import { pgTable, text, serial, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const sowsTable = pgTable("sows", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  client: text("client").notNull(),
  value: numeric("value", { precision: 15, scale: 2 }).notNull(),
  status: text("status").notNull().default("draft"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  description: text("description"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertSowSchema = createInsertSchema(sowsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertSow = z.infer<typeof insertSowSchema>;
export type Sow = typeof sowsTable.$inferSelect;
