import joi from "joi";

export const createSalesAgentMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(2).max(55).required().trim(),
            email: joi.string().email().min(8).max(55).required().lowercase().trim()
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

export const updateSalesAgentMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(2).max(55).trim().optional().empty().allow(""),
            email: joi.string().email().min(8).max(55).lowercase().trim().optional().empty().allow("")
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