import express from "express"
import {  countByCity, countByType, deletehotel, getHotelRooms, getallhotel,  getsinglehotel,  hotelhome, updatehotel } from "../Controllers/hotelsController.js";
const router = express.Router();
import { verifyadmin } from "../utils/verifytoken.js";

// Create
router.post("/", verifyadmin, hotelhome)

// Update
router.put("/:id", verifyadmin, updatehotel)
// Delete
router.delete("/:id",verifyadmin, deletehotel)
// Get
router.get("/find/:id", getsinglehotel)
// Get all

router.get("/", getallhotel)

router.get("/countByCity", countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)

export default router;