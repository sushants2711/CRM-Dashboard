import express from "express";
import { createTagMiddleware, updateTagMiddleware } from "../middleware/tag.middleware.js";
import { createTagController, deleteTagController, getAllTagController, updateTagController } from "../controllers/tag.controller.js";

const tagRouter = express.Router();

tagRouter.route("/add").post(createTagMiddleware, createTagController);
tagRouter.route("/get").get(getAllTagController);
tagRouter.route("/update/:id").put(updateTagMiddleware, updateTagController);
tagRouter.route("/delete/:id").delete(deleteTagController);

export default tagRouter;