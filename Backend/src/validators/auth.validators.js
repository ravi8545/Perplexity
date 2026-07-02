import { body, validationResult } from "express-validator";

// ✅ Validation middleware 
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const formattedErrors = errors.array().map((err) => ({
        field: err.path ?? err.param,
        message: err.msg,
    }));

    return res.status(422).json({
        message: "Validation failed",
        success: false,
        errors: formattedErrors,
    });
};

// ✅ Register Validator
export const registerValidator = [
    body("username")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Username is required")
        .bail()
        .isString()
        .withMessage("Username must be a string")
        .bail()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be between 3 and 30 characters")
        .bail()
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username can only contain letters, numbers, and underscores"),

    body("email")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Email is required")
        .bail()
        .isString()
        .withMessage("Email must be a string")
        .bail()
        .trim()
        .isEmail()
        .withMessage("Email must be a valid email address")
        .normalizeEmail(),

    body("password")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Password is required")
        .bail()
        .isString()
        .withMessage("Password must be a string")
        .bail()
        .isLength({ min: 6, max: 128 })
        .withMessage("Password must be between 6 and 128 characters"),

    validate 
];

export const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Email must be valid")
        .bail()
        .normalizeEmail(),
        
    body("password")
        .notEmpty().withMessage("Password is required"),
    validate,
]