import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const phasesTable = pgTable("phases", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  project: text("project").notNull(),
  status: text("status").notNull().default("not_started"),
  completion: integer("completion").default(0),
  owner: text("owner"),
  dueDate: text("due_date"),
  blockers: text("blockers"),
  criteria: text("criteria"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertPhaseSchema = createInsertSchema(phasesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertPhase = z.infer<typeof insertPhaseSchema>;
export type Phase = typeof phasesTable.$inferSelect;
