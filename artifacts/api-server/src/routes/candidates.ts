import { Router } from "express";
import { db } from "@workspace/db";
import { candidatesTable } from "@workspace/db";
import { eq, ilike, or } from "drizzle-orm";

const router = Router();

router.get("/candidates", async (req, res) => {
  const { status, search } = req.query as { status?: string; search?: string };
  let query = db.select().from(candidatesTable);
  const rows = await query;
  let results = rows;
  if (status) results = results.filter((r) => r.status === status);
  if (search) {
    const s = search.toLowerCase();
    results = results.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        r.email.toLowerCase().includes(s) ||
        (r.title ?? "").toLowerCase().includes(s)
    );
  }
  res.json(results);
});

router.post("/candidates", async (req, res) => {
  const [row] = await db.insert(candidatesTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/candidates/:id", async (req, res) => {
  const [row] = await db
    .select()
    .from(candidatesTable)
    .where(eq(candidatesTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/candidates/:id", async (req, res) => {
  const [row] = await db
    .update(candidatesTable)
    .set(req.body)
    .where(eq(candidatesTable.id, Number(req.params.id)))
    .returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.delete("/candidates/:id", async (req, res) => {
  await db.delete(candidatesTable).where(eq(candidatesTable.id, Number(req.params.id)));
  res.status(204).send();
});

export default router;
