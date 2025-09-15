import mongoose from "mongoose";
import commentModel from "../model/comment.model.js";
import leadModel from "../model/lead.model.js";
import salesAgentModel from "../model/salesAgent.model.js";

export const cretaeCommentController = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, commentText } = req.body;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing",
                });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format.",
                });
        }

        const leadExist = await leadModel.findById(id);

        if (!leadExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Lead not exist in db.",
                });
        }

        const salesAgentExist = await salesAgentModel.findById(author);

        if (!salesAgentExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Sales Agent not exist in db.",
                });
        }

        const newComment = new commentModel({
            lead: id,
            author,
            commentText,
        });

        const savedData = await newComment.save();

        if (!savedData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured while saved the data."
                })
        }

        return res
            .status(201)
            .json({
                success: true,
                message: "Comment Cretaed Successfully",
                data: savedData,
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
    }
};

export const getCommentControllers = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id."
                });
        };

        const leadExist = await leadModel.findById(id);

        if (!leadExist || leadExist.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Lead Id not exist in Db."
                });
        };

        const getLeadComments = await commentModel.find({ lead: id }).populate("author", "name email");

        if (!getLeadComments || getLeadComments.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Comment found for this lead."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Lead Comments fetch Successfully.",
                data: getLeadComments
            });

    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error, message
            });
    };
};