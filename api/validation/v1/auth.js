const Joi = require('joi')
exports.signup = (validData) => {
    const schema = joi.object({
        firstName: Joi.string()
            .required()
            .messages({
                "any.required": "Please Enter Your First Name"
            }),
        lastName: Joi.string()
            .required()
            .messages({
                "any.required": "Please Enter Your Last Name"
            }),

        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                "string.email": "Please Enter a Valid Email Address",
                "any.required": "Please Enter an Email"
            }),

        password: Joi.string()
            .min(6)
            .required()
            .messages({
                "any.required": "Please Enter a Password",
                "string.min": "Password must be at least 6 characters long"
            }),
            image:Joi.string().optional()
    });

    return schema.validate(validData, { abortEarly: false }); // Returns all validation errors

}