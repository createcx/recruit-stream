import { Router } from "express";
import { db } from "@workspace/db";
import { placementsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/placements", async (req, res) => {
  const { status } = req.query as { status?: string };
  let rows = await db.select().from(placementsTable);
  if (status) rows = rows.filter((r) => r.status === status);
  res.json(rows);
});

router.post("/placements", async (req, res) => {
  const [row] = await db.insert(placementsTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/placements/:id", async (req, res) => {
  const [row] = await db.select().from(placementsTable).where(eq(placementsTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/placements/:id", async (req, res) => {
  const [row] = await db.update(placementsTable).set(req.body).where(eq(placementsTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.delete("/placements/:id", async (req, res) => {
  await db.delete(placementsTable).where(eq(placementsTable.id, Number(req.params.id)));
  res.status(204).send();
});

export default router;
