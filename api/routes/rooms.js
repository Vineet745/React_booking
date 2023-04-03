import express from "express"
import { createRoom, deleteRoom, getallRooms, getsingleRoom, updateRoom, updateRoomAvailablity } from "../Controllers/roomsController.js";
const router = express.Router();
import { verifyadmin } from "../utils/verifytoken.js";

// Create
router.post("/:hotelid", verifyadmin, createRoom)

// Update
router.put("/:id", verifyadmin, updateRoom)
 
router.put("/availability/:id", updateRoomAvailablity)
// Delete
router.delete("/:id/:hotelid", verifyadmin, deleteRoom)
// Get
router.get("/:id", getsingleRoom)
// Get all
router.get("/", getallRooms)

export default router;