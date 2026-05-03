import { Router } from "express";
import { db } from "@workspace/db";
import { clientsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/clients", async (_req, res) => {
  const rows = await db.select().from(clientsTable);
  res.json(rows);
});

router.post("/clients", async (req, res) => {
  const [row] = await db.insert(clientsTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/clients/:id", async (req, res) => {
  const [row] = await db.select().from(clientsTable).where(eq(clientsTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/clients/:id", async (req, res) => {
  const [row] = await db.update(clientsTable).set(req.body).where(eq(clientsTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.delete("/clients/:id", async (req, res) => {
  await db.delete(clientsTable).where(eq(clientsTable.id, Number(req.params.id)));
  res.status(204).send();
});

export default router;
