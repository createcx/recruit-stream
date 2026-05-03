import { Router } from "express";
import { db } from "@workspace/db";
import { activitiesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/activities", async (req, res) => {
  const { type } = req.query as { type?: string };
  let rows = await db.select().from(activitiesTable);
  if (type) rows = rows.filter((r) => r.type === type);
  res.json(rows);
});

router.post("/activities", async (req, res) => {
  const [row] = await db.insert(activitiesTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/activities/:id", async (req, res) => {
  const [row] = await db.select().from(activitiesTable).where(eq(activitiesTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.delete("/activities/:id", async (req, res) => {
  await db.delete(activitiesTable).where(eq(activitiesTable.id, Number(req.params.id)));
  res.status(204).send();
});

export default router;
