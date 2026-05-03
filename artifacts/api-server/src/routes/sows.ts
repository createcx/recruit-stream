import { Router } from "express";
import { db } from "@workspace/db";
import { sowsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/sows", async (_req, res) => {
  const rows = await db.select().from(sowsTable);
  res.json(rows);
});

router.post("/sows", async (req, res) => {
  const [row] = await db.insert(sowsTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/sows/:id", async (req, res) => {
  const [row] = await db.select().from(sowsTable).where(eq(sowsTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/sows/:id", async (req, res) => {
  const [row] = await db.update(sowsTable).set(req.body).where(eq(sowsTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.delete("/sows/:id", async (req, res) => {
  await db.delete(sowsTable).where(eq(sowsTable.id, Number(req.params.id)));
  res.status(204).send();
});

export default router;
