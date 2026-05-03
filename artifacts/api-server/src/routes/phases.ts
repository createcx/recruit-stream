import { Router } from "express";
import { db } from "@workspace/db";
import { phasesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/phases", async (_req, res) => {
  const rows = await db.select().from(phasesTable);
  res.json(rows);
});

router.post("/phases", async (req, res) => {
  const [row] = await db.insert(phasesTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/phases/:id", async (req, res) => {
  const [row] = await db.select().from(phasesTable).where(eq(phasesTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/phases/:id", async (req, res) => {
  const [row] = await db.update(phasesTable).set(req.body).where(eq(phasesTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

export default router;
