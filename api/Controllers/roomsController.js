
import Hotel from "../models/Hotel.js"
import Rooms from "../models/Rooms.js";
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Rooms (req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            })
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedRoom)

    } catch (error) {
        next(error);
    }


}

export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Rooms.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateRoom)
    } catch (error) {
        next(error);
    }
}

export const updateRoomAvailablity = async (req, res, next) => {
    try {
        await Rooms.updateOne({"roomNumbers._id":req.params.id},{
            $push:{
                "roomNumbers.$.unavailableDates": req.body.dates
            },
        }) ;
        res.status(200).json("Room status has been updated")

    } catch (error) {
        next(error);
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Rooms.findByIdAndDelete(req.params.id);
        res.status(200).json("Rooms Deleted")
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            })
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

export const getsingleRoom = async (req, res, next) => {
    try {
        const room = await Rooms.findById(req.params.id);
        res.status(200).json(room)
    } catch (error) {
        next(error);
    }
}

export const getallRooms = async(req,res,next)=>{
    
    try {
        const allrooms = await Rooms.find() ;
        res.status(200).json(allrooms)
    } catch (error) {
        next(error)
    }
}