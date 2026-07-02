import { Router } from "express";

import { login, register, verifyEmail, getMe, resendVerificationEmail, logout } from "../controllers/auth.controllers.js";
import { registerValidator, loginValidator, resendVerificationValidator } from "../validators/auth.validators.js";
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

export default authRouter;
