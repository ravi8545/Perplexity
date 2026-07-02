import { Router } from "express";

import { login, register, verifyEmail, getMe} from "../controllers/auth.controllers.js";
import { registerValidator, loginValidator } from "../validators/auth.validators.js";
import { authUser } from "../middleware/auth.middleware.js";


const authRouter = Router();


/*   Register Route
     Endpoint: POST /api/auth/register       
*/

authRouter.post("/register", registerValidator, register);

authRouter.post("/login", loginValidator, login);


authRouter.get("/get-me", authUser, getMe);


authRouter.get("/verify-email", verifyEmail);



export default authRouter;
