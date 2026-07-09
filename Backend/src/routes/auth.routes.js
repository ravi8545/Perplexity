import { Router } from "express";

import { login, register, verifyEmail, getMe, resendVerificationEmail, logout, forgotPassword, resetPassword } from "../controllers/auth.controllers.js";
import { registerValidator, loginValidator, resendVerificationValidator, forgotPasswordValidator, resetPasswordValidator } from "../validators/auth.validators.js";
import { authUser } from "../middleware/auth.middleware.js";


const authRouter = Router();


/*   Register Route
     Endpoint: POST /api/auth/register       
*/

authRouter.post("/register", registerValidator, register);

authRouter.post("/login", loginValidator, login);


authRouter.get("/get-me", authUser, getMe);


authRouter.get("/verify-email", verifyEmail);

authRouter.post("/resend-verification", resendVerificationValidator, resendVerificationEmail);

authRouter.post("/logout", authUser, logout);

authRouter.post("/forgot-password", forgotPasswordValidator, forgotPassword);

authRouter.post("/reset-password", resetPasswordValidator, resetPassword);

export default authRouter;
