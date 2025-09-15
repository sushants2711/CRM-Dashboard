import joi from "joi";

export const createCommentMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            commentText: joi.string().min(5).max(150).required().trim(),
            author: joi.string().min(24).max(24).required().trim()
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