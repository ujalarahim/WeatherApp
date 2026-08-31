import { Router } from "express";
import authMiddleWare from "../middleware/authMiddleWare.middleware.js";
import { allowRoles } from "../middleware/AllowedRoles.js";
import { deleteUser } from "../controllers/admin.controller.js";

const adminRoute = Router()


adminRoute.route('/delete/:userId').delete(authMiddleWare , allowRoles("superman","admin"), deleteUser);



export default adminRoute