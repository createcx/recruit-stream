import { Router } from "express";
import { db } from "@workspace/db";
import { forecastsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/forecasts", async (_req, res) => {
  const rows = await db.select().from(forecastsTable);
  res.json(rows);
});

router.post("/forecasts", async (req, res) => {
  const [row] = await db.insert(forecastsTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/forecasts/:id", async (req, res) => {
  const [row] = await db.select().from(forecastsTable).where(eq(forecastsTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/forecasts/:id", async (req, res) => {
  const [row] = await db.update(forecastsTable).set(req.body).where(eq(forecastsTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

export default router;
