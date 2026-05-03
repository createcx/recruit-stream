import { Router } from "express";
import { db } from "@workspace/db";
import { companiesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/companies", async (req, res) => {
  const { status } = req.query as { status?: string };
  let rows = await db.select().from(companiesTable);
  if (status) rows = rows.filter((r) => r.status === status);
  res.json(rows);
});

router.post("/companies", async (req, res) => {
  const [row] = await db.insert(companiesTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/companies/:id", async (req, res) => {
  const [row] = await db.select().from(companiesTable).where(eq(companiesTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/companies/:id", async (req, res) => {
  const [row] = await db.update(companiesTable).set(req.body).where(eq(companiesTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.delete("/companies/:id", async (req, res) => {
  await db.delete(companiesTable).where(eq(companiesTable.id, Number(req.params.id)));
  res.status(204).send();
});

export default router;
