import { Router } from "express";
import { db } from "@workspace/db";
import {
  candidatesTable,
  jobsTable,
  clientsTable,
  financialsTable,
  activitiesTable,
} from "@workspace/db";
import { count, sum, avg } from "drizzle-orm";

const router = Router();

router.get("/dashboard/summary", async (_req, res) => {
  const [totalCandidatesRow] = await db.select({ count: count() }).from(candidatesTable);
  const [openJobsRow] = await db.select({ count: count() }).from(jobsTable);
  const [activeClientsRow] = await db.select({ count: count() }).from(clientsTable);
  const [revenueRow] = await db.select({ total: sum(financialsTable.amount) }).from(financialsTable);

  res.json({
    totalCandidates: Number(totalCandidatesRow?.count ?? 0),
    openJobs: Number(openJobsRow?.count ?? 0),
    activeClients: Number(activeClientsRow?.count ?? 0),
    totalRevenue: Number(revenueRow?.total ?? 0),
    activeCandidates: Number(totalCandidatesRow?.count ?? 0),
    submissionsThisMonth: 0,
    placementsThisMonth: 0,
    avgDaysToPlace: 0,
  });
});

router.get("/dashboard/pipeline-stats", async (_req, res) => {
  const stages = ["New", "Submitted", "Interviewing", "Offer", "Placed"];
  const candidates = await db.select().from(candidatesTable);
  const stats = stages.map((stage) => ({
    stage,
    count: candidates.filter((c) => c.status?.toLowerCase() === stage.toLowerCase()).length,
  }));
  res.json(stats);
});

router.get("/dashboard/recent-activities", async (_req, res) => {
  const rows = await db
    .select()
    .from(activitiesTable)
    .limit(20);
  res.json(rows.reverse());
});

export default router;
