const Joi = require('joi');

// Common validation schemas
const userValidationSchema = {
    name: Joi.string().min(3).max(100).required().messages({
        'string.base': 'Name must be a string.',
        'string.empty': 'Name is required.',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name cannot exceed 100 characters.',
        'any.required': 'Name is required.',
    }),
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.base': 'Username must be a string.',
        'string.empty': 'Username is required.',
        'string.min': 'Username must be at least 3 characters long.',
        'string.max': 'Username cannot exceed 30 characters.',
        'any.required': 'Username is required.',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string.',
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required.',
    }),
    contactNumber: Joi.string().pattern(/^\d{10}$/).required().messages({
        'string.pattern.base': 'Contact number must be a valid 10-digit number.',
        'string.empty': 'Contact number is required.',
        'any.required': 'Contact number is required.',
    }),
    password: Joi.string().min(6).max(12).required().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 6 characters long.',
        'string.max': 'Password cannot exceed 12 characters.',
        'any.required': 'Password is required.',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match the password.',
        'string.empty': 'Confirm password is required.',
        'any.required': 'Confirm password is required.',
    }),
};

// Middleware functions
const signupValidation = (req, res, next) => {
    const schema = Joi.object(userValidationSchema);
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            status: 400,
            message: 'Validation error',
            errors: error.details.map(err => ({
                field: err.context.label,
                message: err.message,
            })),
        });
    }
    next();
};


//loginValidation 

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: userValidationSchema.email(), // Ensure this is defined as a Joi schema
        password: userValidationSchema.password(), // Ensure this is called as a Joi schema function
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            status: 400,
            message: 'Validation error',
            errors: error.details.map(err => ({
                field: err.path.join('.'), // Use `err.path` to identify the field
                message: err.message,
            })),
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation,
};
