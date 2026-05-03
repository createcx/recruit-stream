import { Router } from "express";
import { db } from "@workspace/db";
import { integrationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/integrations", async (_req, res) => {
  const rows = await db.select().from(integrationsTable);
  res.json(rows);
});

router.post("/integrations/:id/toggle", async (req, res) => {
  const [current] = await db
    .select()
    .from(integrationsTable)
    .where(eq(integrationsTable.id, Number(req.params.id)));
  if (!current) return res.status(404).json({ error: "Not found" });
  const newStatus = current.status === "active" ? "inactive" : "active";
  const [row] = await db
    .update(integrationsTable)
    .set({ status: newStatus, lastSync: newStatus === "active" ? new Date().toISOString() : current.lastSync })
    .where(eq(integrationsTable.id, Number(req.params.id)))
    .returning();
  res.json(row);
});

export default router;
