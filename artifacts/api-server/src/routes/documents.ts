import { Router } from "express";
import { db } from "@workspace/db";
import { documentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/documents", async (_req, res) => {
  const rows = await db.select().from(documentsTable);
  res.json(rows);
});

router.post("/documents", async (req, res) => {
  const [row] = await db.insert(documentsTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/documents/:id", async (req, res) => {
  const [row] = await db.select().from(documentsTable).where(eq(documentsTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.delete("/documents/:id", async (req, res) => {
  await db.delete(documentsTable).where(eq(documentsTable.id, Number(req.params.id)));
  res.status(204).send();
});

export default router;
