import mongoose from "mongoose";
import tagModel from "../model/tag.model.js";

export const createTagController = async (req, res) => {
    try {
        const { name } = req.body;

        const tagExist = await tagModel.findOne({ name });

        if (tagExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Tag already exist."
                });
        };

        const newTag = new tagModel({
            name
        });

        const savedTag = await newTag.save();

        if (!savedTag) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured happens when we save the tag."
                });
        };

        return res
            .status(201)
            .json({
                success: true,
                message: "Tag Created Successfully",
                data: savedTag
            });
    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const getAllTagController = async (req, res) => {
    try {
        const allTag = await tagModel.find();

        if (!allTag || allTag.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Tags Data available."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Tags Data fetch Successfully.",
                data: allTag
            });
    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const updateTagController = async (req, res) => {
    try {
        const { name } = req.body;

        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing."
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

        const tagExist = await tagModel.findById(id);

        if (!tagExist || tagExist.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Tag Not Exist."
                });
        };

        if (name && name !== tagExist.name) {
            const uniqueTag = await tagModel.findOne({ name });

            if (uniqueTag) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Tag already exist in db"
                    });
            };
        };

        if(name && name === tagExist.name) {
            return res
            .status(200)
            .json({
                success: true,
                message: "Tag that you want to update it is similar to existing tag.",
                data: tagExist
            });
        };

        const updateTag = {
            name: name || tagExist.name
        };

        const updateData = await tagModel.findByIdAndUpdate(id, updateTag, { new: true });

        if (!updateData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured while update the data."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch Successfully.",
                data: updateData
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const deleteTagController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing."
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

        const tagExist = await tagModel.findById(id);

        if (!tagExist || tagExist.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Tag Not Exist."
                });
        };

        const deleteTag = await tagModel.findByIdAndDelete(id);

        if (!deleteTag) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured while deleting the tag."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Tag Deleted Successfully."
            });
    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};