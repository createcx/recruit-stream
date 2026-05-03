import { Router } from "express";
import { db } from "@workspace/db";
import { jobsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/jobs", async (req, res) => {
  const { status, search } = req.query as { status?: string; search?: string };
  let rows = await db.select().from(jobsTable);
  if (status) rows = rows.filter((r) => r.status === status);
  if (search) {
    const s = search.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.title.toLowerCase().includes(s) ||
        r.company.toLowerCase().includes(s)
    );
  }
  res.json(rows);
});

router.post("/jobs", async (req, res) => {
  const [row] = await db.insert(jobsTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/jobs/:id", async (req, res) => {
  const [row] = await db.select().from(jobsTable).where(eq(jobsTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/jobs/:id", async (req, res) => {
  const [row] = await db.update(jobsTable).set(req.body).where(eq(jobsTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.delete("/jobs/:id", async (req, res) => {
  await db.delete(jobsTable).where(eq(jobsTable.id, Number(req.params.id)));
  res.status(204).send();
});

export default router;
