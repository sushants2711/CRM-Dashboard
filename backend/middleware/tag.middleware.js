import joi from "joi";

export const createTagMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(2).max(55).required().trim()
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

export const updateTagMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(2).max(55).required().trim()
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