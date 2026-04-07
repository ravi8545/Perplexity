import { Router } from "express";

import { register, verifyEmail } from "../controllers/auth.controllers.js";
import { registerValidator } from "../validators/auth.validators.js";


const authRouter = Router();


/*   Register Route
     Endpoint: POST /api/auth/register       
*/

authRouter.post("/register", registerValidator, register);

authRouter.get("/verify-email", verifyEmail);

export default authRouter;
