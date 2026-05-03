import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const onboardingTasksTable = pgTable("onboarding_tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  candidate: text("candidate").notNull(),
  category: text("category"),
  status: text("status").notNull().default("pending"),
  assignee: text("assignee"),
  dueDate: text("due_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertOnboardingTaskSchema = createInsertSchema(onboardingTasksTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertOnboardingTask = z.infer<typeof insertOnboardingTaskSchema>;
export type OnboardingTask = typeof onboardingTasksTable.$inferSelect;
