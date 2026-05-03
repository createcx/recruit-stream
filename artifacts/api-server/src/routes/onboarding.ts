import { Router } from "express";
import { db } from "@workspace/db";
import { onboardingTasksTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/onboarding", async (_req, res) => {
  const rows = await db.select().from(onboardingTasksTable);
  res.json(rows);
});

router.post("/onboarding", async (req, res) => {
  const [row] = await db.insert(onboardingTasksTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/onboarding/:id", async (req, res) => {
  const [row] = await db.select().from(onboardingTasksTable).where(eq(onboardingTasksTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/onboarding/:id", async (req, res) => {
  const [row] = await db.update(onboardingTasksTable).set(req.body).where(eq(onboardingTasksTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

export default router;
