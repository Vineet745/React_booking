import Hotel from "../models/Hotel.js";
import Rooms from "../models/Rooms.js";

export const hotelhome = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error);
    }
}

export const updatehotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateHotel)
    } catch (error) {
        next(error);
    }
}

export const deletehotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel Deleted")
    } catch (error) {
        next(error);
    }
}

export const getsinglehotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    } catch (error) {
        next(error);
    }
}

export const getallhotel = async(req,res,next)=>{
    const {min,max,...others} = req.query;
    try {
        const hotels =await Hotel.find({...others,cheapestPrice:{$gt:min||1, $lt:max||1400 }}) 
        console.log(others)
        res.status(200).json(hotels);
    } catch (error) {
        next(error)
    }
}

export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        
    }
}

export const countByType = async(req,res,next)=>{
    try {
    const hotelCount = await Hotel.countDocuments({type:"Hotel"})
    const apartmentCount =await Hotel.countDocuments({type:"Apartment"})
    const resourtCount =await Hotel.countDocuments({type:"Resort"})
    const villaCount =await Hotel.countDocuments({type:"Villa"})
    const cabinCount =await Hotel.countDocuments({type:"Cabin"})

    res.status(200).json([
        {type:"Hotel", count:hotelCount},
        {type:"Apartments",count:apartmentCount},
        {type:"Resourt",count:resourtCount},
        {type:"Villas",count:villaCount},
        {type:"Cabin",count:cabinCount},
    ]);
} catch(err){
next(err)
}
};

export const getHotelRooms = async(req,res,next)=>{
    try {
        const hotel =await Hotel.findById(req.params.id)
        const list =await Promise.all(hotel.rooms.map((room)=>{
            return Rooms.findById(room)
        }))
       res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
