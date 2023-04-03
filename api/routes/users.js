import express from "express"
import { deleteUser,  getalluser,  getsingleuser,  updateUser } from "../Controllers/userController.js";
import { verifyadmin, verifyToken, verifyuser } from "../utils/verifytoken.js";

const router = express.Router();


// checkAuthenticate
// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("User Logged in")
// })

// router.get("/checkuser/:id",verifyuser,(req,res,next)=>{
//     res.send("User Logged in and you can delete your account")
// })

// router.get("/checkadmin/:id",verifyadmin,(req,res,next)=>{
//     res.send("User Logged in and you can delete all account")
// })




// Update
router.put("/:id", verifyuser, updateUser)
// Delete
router.delete("/:id", verifyuser, deleteUser)
// Get
router.get("/:id", verifyuser, getsingleuser)
// Get all
router.get("/", verifyadmin, getalluser)


export default router;
