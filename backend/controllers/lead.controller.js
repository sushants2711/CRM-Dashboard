import mongoose from "mongoose";
import leadModel from "../model/lead.model.js";
import salesAgentModel from "../model/salesAgent.model.js";

export const createLeadController = async (req, res) => {
    try {
        const { name, source, status, tags, timeToClose, priority, salesAgent, closedAt = "" } = req.body;

        if (!mongoose.Types.ObjectId.isValid(salesAgent)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb salesAgent Id.",
                });
        };

        const salesAgentExist = await salesAgentModel.findById(salesAgent);

        if (!salesAgentExist || salesAgentExist === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Sales Agent not exist",
                });
        };

        const closedAtValue = status === "Closed" ? (closedAt || new Date()) : null

        const newLead = new leadModel({
            name,
            source,
            salesAgent,
            status,
            tags,
            timeToClose,
            priority,
            closedAt: closedAtValue
        });

        const savedData = await newLead.save();
        const populatedData = await savedData.populate("salesAgent", "name");

        return res
            .status(201)
            .json({
                success: true,
                message: "Lead Created Successfully",
                data: populatedData
            });
    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
    }
};

export const getLeadController = async (req, res) => {
    try {
        const { name, source, tags, status, priority, salesAgent, timeToClose="" } = req.query;

        let sortOption = {};

        if (timeToClose === "asc") {
            sortOption.timeToClose = 1;
        } else if (timeToClose === "dsc") {
            sortOption.timeToClose = -1;
        }

        if (!name && !source && !tags && !status && !priority && !salesAgent) {

            const allLeadData = await leadModel.find().populate("salesAgent", "name email").sort(sortOption);

            if (!allLeadData || allLeadData.length === 0) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "No Lead Available"
                    });
            };

            return res
                .status(200)
                .json({
                    success: true,
                    message: "Lead fetch Successfully",
                    data: allLeadData
                });

        };

        let searchData = {};

        if (name) {
            searchData.name = { $regex: name, $options: "i" };
        };

        if (source) {
            searchData.source = { $regex: source, $options: "i" };
        };

        if (tags) {
            const tagArray = tags.split(",").map((curr) => curr.trim());
            searchData.tags = { $in: tagArray };
        };

        if (status) {
            searchData.status = { $regex: status, $options: "i" };
        };

        if (priority) {
            searchData.priority = { $regex: priority, $options: "i" };
        };

        if (salesAgent) {
            searchData.salesAgent = { $regex: salesAgent, $options: "i" };
        };

        const allLeads = await leadModel.find(searchData).populate("salesAgent", "name email").sort(sortOption);

        if (!allLeads) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Lead found.",
                });
        };

        if (allLeads.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Lead Available for this Query.",
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Lead Found Successfully",
                data: allLeads
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

export const updateLeadController = async (req, res) => {
    try {
        const { id } = req.params;

        const { status, salesAgent, tags, timeToClose, priority } = req.body;

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

        if (!status && !salesAgent && !tags && !timeToClose && !priority) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "At least one field is required to update the Lead."
                });
        };

        const leadExist = await leadModel.findById(id);

        if (!leadExist || leadExist.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Lead not exist in Db."
                });
        };

        const closedAtValue = status === "Closed" ? new Date() : null

        const updateData = {
            status: status || leadExist.status,
            salesAgent: salesAgent || leadExist.salesAgent,
            tags: tags || leadExist.tags,
            timeToClose: timeToClose || leadExist.timeToClose,
            priority: priority || leadExist.priority,
            updatedAt: new Date(),
            closedAt: closedAtValue
        };

        const updateLeadData = await leadModel.findByIdAndUpdate(id, updateData, { new: true })

        if (!updateLeadData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While Upadate the Lead Data."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Lead Update Successfully",
                data: updateLeadData
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

export const deleteLeadController = async (req, res) => {
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
                    message: "Lead not exist in Db."
                });
        };

        const deleteLead = await leadModel.findByIdAndDelete(id);

        if (!deleteLead) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While deleting the Lead."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Lead Data Deleted Successfully."
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

export const leadDetailsController = async (req, res) => {
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
                    message: "Id is missing"
                });
        };

        const leadExist = await leadModel.findById(id).populate("salesAgent", "name email");

        if (!leadExist || leadExist.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Lead not Exist."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Lead find Successfully",
                data: leadExist
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

// ask with chatGpt
export const fetchAllLeadsClosedInLastWeekController = async (req, res) => {
    try {
        // Calculate 7 days ago from now
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Query leads closed in the last week
        const leadsClosedInLastWeek = await leadModel.find({
            status: "Closed",
            updatedAt: { $gte: sevenDaysAgo }
        }).populate("salesAgent", "name email"); // optional: include agent info


        if (!leadsClosedInLastWeek || leadsClosedInLastWeek.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No leads Closed in Last-Week."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Leads closed in the last 7 days fetched successfully",
                data: leadsClosedInLastWeek
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

export const fetchAllLeadStatusController = async (req, res) => {
    try {
        const groupByLeadStatus = await leadModel.aggregate(
            [
                {
                    $group: {
                        _id: "$status",
                        totalLeadsCounts: { $sum: 1 }
                    }
                },
            ]
        );

        if (!groupByLeadStatus || groupByLeadStatus.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No data available."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch Successfully",
                data: groupByLeadStatus
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

// ask some help from chatGpt
export const reportClosedBySalesAgentController = async (req, res) => {
    try {
        const eachSalesAgentStatusClosed = await leadModel.aggregate(
            [
                {
                    $match: {
                        status: "Closed"
                    }
                },
                {
                    $group: {
                        _id: "$salesAgent",
                        totalLeadClosedByEachSalesAgent: { $sum: 1 },
                    }
                },
                {
                    $lookup: {
                        from: "salesagents",
                        localField: "_id",
                        foreignField: "_id",
                        as: "agent"
                    }
                },
                {
                    $unwind: "$agent"
                },
                {
                    $project: {
                        _id: 0,
                        agentId: "$agent._id",
                        agentName: "$agent.name",
                        totalLeadClosedByEachSalesAgent: 1
                    }
                }
            ]
        );

        return res
            .status(200)
            .json({
                success: true,
                message: "Lead Closed by Each SalesAgent find Successfully",
                data: eachSalesAgentStatusClosed
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

