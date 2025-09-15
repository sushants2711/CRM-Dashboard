import express from "express";
import { createCommentMiddleware } from "../middleware/comment.middleware.js";
import { cretaeCommentController, getCommentControllers } from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.route("/add/:id").post(createCommentMiddleware, cretaeCommentController);
commentRouter.route("/get/:id").get(getCommentControllers);

export default commentRouter;