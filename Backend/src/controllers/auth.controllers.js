import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";



export async function register(req, res) {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await UserModel.findOne({
        $or: [{ email }, { username }]
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User with the given email or username already exists",
            success: false,
            err: "User already exists"
        });
    }

    const user = await UserModel.create({ username, email, password });

    const emailVerificationToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );


    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity - Please Verify Your Email",
        html: `
    <p>Hello <strong>${username}</strong>,</p>

    <p>Thanks for registering on <strong>Perplexity</strong>.</p>

    <p>
      Click below to verify your email:
    </p>

    <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}"
       style="display:inline-block; padding:8px 16px; background:#4CAF50; color:#fff; text-decoration:none; border-radius:4px;">
       Verify Email
    </a>

    <p>If you didn’t sign up, ignore this email.</p>
  `
    });

    return res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

export async function verifyEmail(req, res) {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({
                message: "Invalid token",
                success: false,
                err: "User not found"
            })
        }
        if (user.verified) {
            const html = `
        <h1>Email Already Verified ✅</h1>
          <p>Your email has already been verified. You can log in to your account.</p>      
           <a href="http://localhost:3000/login"
             style="display:inline-block; padding:8px 16px; background:#4CAF50; color:#fff; text-decoration:none; border-radius:4px;">
            Go to Login
    </a>`;

            return res.send(html);

        }
        user.verified = true;
        await user.save();

        const html = `
  <h1>Email Verified ✅</h1>
  <p>Your email has been successfully verified. You can now log in to your account.</p>

  <a href="http://localhost:3000/login"
     style="display:inline-block; padding:8px 16px; background:#4CAF50; color:#fff; text-decoration:none; border-radius:4px;">
     Go to Login
  </a>
`;

        return res.send(html);

    }
    catch (err) {
        return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: err.message
        })
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User with the given email does not exist",
            success: false,
            err: "User not found"
        })
    }
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(401).json({
            message: "Incorrect password",
            success: false,
            err: "Invalid credentials"
        })
    }
    if (!user.verified) {
        return res.status(400).json({
            message: "Email not verified",
            success: false,
            err: "Please verify your email before logging in"
        })
    }
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })


}

export async function getMe(req, res) {
    const user = await UserModel.findById(req.user.id).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })
    }

    res.status(200).json({
        message: "User details fetched successfully",
        success: true,
        user
    })
}


