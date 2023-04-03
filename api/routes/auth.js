import express from "express";
import { authlogin, authregister } from "../Controllers/authcontroller.js";

const router = express.Router();

router.post("/register" , authregister)
router.post("/login" , authlogin)

export default router