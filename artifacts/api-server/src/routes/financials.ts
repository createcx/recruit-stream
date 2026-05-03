import { Router } from "express";
import { db } from "@workspace/db";
import { financialsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/financials", async (_req, res) => {
  const rows = await db.select().from(financialsTable);
  res.json(rows);
});

router.post("/financials", async (req, res) => {
  const [row] = await db.insert(financialsTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/financials/:id", async (req, res) => {
  const [row] = await db.select().from(financialsTable).where(eq(financialsTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/financials/:id", async (req, res) => {
  const [row] = await db.update(financialsTable).set(req.body).where(eq(financialsTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

export default router;
