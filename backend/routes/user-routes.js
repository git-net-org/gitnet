import express from "express";
import { getUser,getContacts, refreshContacts } from "../controllers/user.js";

const router = express.Router();

router.get("/get-user", getUser);
router.get("/get-contacts", getContacts);
router.get("/refresh-contacts", refreshContacts);

export default router