import { Router } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/contacts", async (_req, res) => {
  const rows = await db.select().from(contactsTable);
  res.json(rows);
});

router.post("/contacts", async (req, res) => {
  const [row] = await db.insert(contactsTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/contacts/:id", async (req, res) => {
  const [row] = await db.select().from(contactsTable).where(eq(contactsTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/contacts/:id", async (req, res) => {
  const [row] = await db.update(contactsTable).set(req.body).where(eq(contactsTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.delete("/contacts/:id", async (req, res) => {
  await db.delete(contactsTable).where(eq(contactsTable.id, Number(req.params.id)));
  res.status(204).send();
});

export default router;
