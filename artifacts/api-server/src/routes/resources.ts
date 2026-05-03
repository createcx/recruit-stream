import { Router } from "express";
import { db } from "@workspace/db";
import { resourcesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/resources", async (_req, res) => {
  const rows = await db.select().from(resourcesTable);
  res.json(rows);
});

router.post("/resources", async (req, res) => {
  const [row] = await db.insert(resourcesTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/resources/:id", async (req, res) => {
  const [row] = await db.select().from(resourcesTable).where(eq(resourcesTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/resources/:id", async (req, res) => {
  const [row] = await db.update(resourcesTable).set(req.body).where(eq(resourcesTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

export default router;
