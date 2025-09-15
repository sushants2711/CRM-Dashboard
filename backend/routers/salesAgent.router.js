import express from "express";
import { createSalesAgentMiddleware, updateSalesAgentMiddleware } from "../middleware/salesAgent.middleware.js";
import { createSaleAgentControllers, deleteSalesAgentController, getAllSalesAgentControllers, updateSalesAgentControllers } from "../controllers/salesAgent.controller.js";

const saleRouter = express.Router();

saleRouter.route("/add").post(createSalesAgentMiddleware, createSaleAgentControllers);
saleRouter.route("/get").get(getAllSalesAgentControllers);
saleRouter.route("/update/:id").put(updateSalesAgentMiddleware ,updateSalesAgentControllers);
saleRouter.route("/delete/:id").delete(deleteSalesAgentController);

export default saleRouter;