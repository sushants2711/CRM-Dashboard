import joi from "joi";

export const createLeadMiddleware = async (req, res, next) => {

    if (req.body && typeof req.body.tags === "string") {
        try {
            req.body.tags = JSON.parse(req.body.tags);
        } catch (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid JSON format in 'tags' field",
                    error: error.message
                });
        };
    };

    try {
        const schema = joi.object({
            name: joi.string().min(2).max(55).required().trim(),
            source: joi.string().required().trim().valid('Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other'),
            status: joi.string().required().trim().valid('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'),
            tags: joi.array().items(joi.string().required().trim().optional().empty()).required(),
            timeToClose: joi.number().greater(0).positive().required(),
            priority: joi.string().required().trim().valid("High", "Medium", "Low"),
            salesAgent: joi.string().min(24).max(24).required().trim(),
            closedAt: joi.date().optional().empty().allow("")
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details[0].message
                });
        };

        next();

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

export const updateLeadMiddleware = async (req, res, next) => {

    if (req.body && req.body.tags && typeof req.body.tags === "string") {
        try {
            req.body.tags = JSON.parse(req.body.tags);
        } catch (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid JSON format in 'tags' field",
                    error: error.message
                });
        };
    };

    try {
        const schema = joi.object({
            name: joi.string().min(2).max(55).trim().optional().empty().allow(""),
            status: joi.string().trim().valid('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed').optional().empty().allow(""),
            source: joi.string().trim().valid('Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other').optional().empty().allow(""),
            salesAgent: joi.string().min(24).max(24).trim().optional().empty().allow(""),
            tags: joi.array().items(joi.string().trim().optional().empty().allow("")),
            timeToClose: joi.number().greater(0).positive().optional().empty().allow(""),
            priority: joi.string().trim().valid("High", "Medium", "Low").optional().empty().allow(""),
            closedAt: joi.date().optional().empty().allow("")
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details[0].message
                });
        };

        next();

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