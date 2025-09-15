import express from "express";
import { createLeadMiddleware, updateLeadMiddleware } from "../middleware/lead.middleware.js";
import { createLeadController, deleteLeadController, fetchAllLeadsClosedInLastWeekController, fetchAllLeadStatusController, getLeadController, leadDetailsController, reportClosedBySalesAgentController, updateLeadController } from "../controllers/lead.controller.js";

const leadRouter = express.Router();

leadRouter.route("/add").post(createLeadMiddleware, createLeadController);
leadRouter.route("/get").get(getLeadController);
leadRouter.route("/lead-detail/:id").get(leadDetailsController);
leadRouter.route("/update/:id").put(updateLeadMiddleware, updateLeadController);
leadRouter.route("/delete/:id").delete(deleteLeadController);

leadRouter.route("/report/last-week").get(fetchAllLeadsClosedInLastWeekController);
leadRouter.route("/report/pipeline").get(fetchAllLeadStatusController);
leadRouter.route("/report/closed-by-agent").get(reportClosedBySalesAgentController);


export default leadRouter;