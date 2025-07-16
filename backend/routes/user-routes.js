import express from "express";
import { getUser,getContacts, refreshContacts, handleAcceptingInvite } from "../controllers/user.js";

const router = express.Router();

router.get("/get-user", getUser);
router.get("/get-contacts", getContacts);
router.get("/refresh-contacts", refreshContacts);
router.get("/accept-invite/:connectionId", handleAcceptingInvite);

export default router