import { Router } from "express";

import { login, register, verifyEmail } from "../controllers/auth.controllers.js";
import { registerValidator, loginValidator } from "../validators/auth.validators.js";


const authRouter = Router();


/*   Register Route
     Endpoint: POST /api/auth/register       
*/

authRouter.post("/register", registerValidator, register);

authRouter.post("/login",loginValidator, login);


authRouter.get("/verify-email", verifyEmail);

export default authRouter;
