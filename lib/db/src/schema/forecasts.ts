import { pgTable, text, serial, timestamp, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const forecastsTable = pgTable("forecasts", {
  id: serial("id").primaryKey(),
  period: text("period").notNull(),
  revenue: numeric("revenue", { precision: 15, scale: 2 }).notNull(),
  headcount: integer("headcount").notNull(),
  scenario: text("scenario"),
  status: text("status").notNull().default("draft"),
  assumptions: text("assumptions"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertForecastSchema = createInsertSchema(forecastsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertForecast = z.infer<typeof insertForecastSchema>;
export type Forecast = typeof forecastsTable.$inferSelect;
