import mongoose from "mongoose";
import saleModel from "../model/salesAgent.model.js";

export const createSaleAgentControllers = async (req, res) => {
    try {
        const { name, email } = req.body;

        const salesAgentExist = await saleModel.findOne({ email });

        if (salesAgentExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Email already exist."
                });
        };

        const newSaleAgent = new saleModel({
            name,
            email
        });

        const saveData = await newSaleAgent.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "SaleAgent created successfully",
                data: saveData
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
    }
};

export const getAllSalesAgentControllers = async (req, res) => {
    try {
        const allSalesAgent = await saleModel.find();

        if (!allSalesAgent) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No SalesAgent found."
                });
        };

        if (allSalesAgent.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Sales Agent data found."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "SalesAgent Data found Successfully.",
                data: allSalesAgent
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

export const updateSalesAgentControllers = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, email } = req.body;

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

        if (!name && !email) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "At least one field is required to update the SalesAgent Data."
                });
        };

        const salesAgentExist = await saleModel.findById(id);

        if (!salesAgentExist || salesAgentExist.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Sales Agent not exist."
                });
        };

        if (email && email !== salesAgentExist.email) {
            const checkUniqueEmail = await saleModel.findOne({ email });
            if (checkUniqueEmail) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Email already exist in someone SalesData profile."
                    });
            };
        };

        const updateSalesAgentData = {
            name: name || salesAgentExist.name,
            email: email || salesAgentExist.email
        };

        const updateSaleData = await saleModel.findByIdAndUpdate(id, updateSalesAgentData, { new: true });

        if (!updateSaleData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error occured, when data is updated."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data updated Successfully ",
                data: updateSaleData
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

export const deleteSalesAgentController = async (req, res) => {
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

        const salesAgentExist = await saleModel.findById(id);

        if (!salesAgentExist || salesAgentExist.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Sales Agent not exist"
                });
        };

        const deleteData = await saleModel.findByIdAndDelete(id);

        if (!deleteData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured while deleting data."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data deleted successfully"
            });

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