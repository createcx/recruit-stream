import { Router } from "express";
import { db } from "@workspace/db";
import { changeOrdersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/change-orders", async (_req, res) => {
  const rows = await db.select().from(changeOrdersTable);
  res.json(rows);
});

router.post("/change-orders", async (req, res) => {
  const [row] = await db.insert(changeOrdersTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/change-orders/:id", async (req, res) => {
  const [row] = await db.select().from(changeOrdersTable).where(eq(changeOrdersTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/change-orders/:id", async (req, res) => {
  const [row] = await db.update(changeOrdersTable).set(req.body).where(eq(changeOrdersTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

export default router;
