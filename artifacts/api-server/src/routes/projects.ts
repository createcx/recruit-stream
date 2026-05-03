import { Router } from "express";
import { db } from "@workspace/db";
import { projectsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/projects", async (_req, res) => {
  const rows = await db.select().from(projectsTable);
  res.json(rows);
});

router.post("/projects", async (req, res) => {
  const [row] = await db.insert(projectsTable).values(req.body).returning();
  res.status(201).json(row);
});

router.get("/projects/:id", async (req, res) => {
  const [row] = await db.select().from(projectsTable).where(eq(projectsTable.id, Number(req.params.id)));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.patch("/projects/:id", async (req, res) => {
  const [row] = await db.update(projectsTable).set(req.body).where(eq(projectsTable.id, Number(req.params.id))).returning();
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.delete("/projects/:id", async (req, res) => {
  await db.delete(projectsTable).where(eq(projectsTable.id, Number(req.params.id)));
  res.status(204).send();
});

export default router;
