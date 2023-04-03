import bcrypt from 'bcryptjs';
import User from "../models/Users.js"
import { createError } from '../utils/error.js';
import jwt from "jsonwebtoken"
export const authregister = async (req, res, next) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        next(error)
    }
}

export const authlogin = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not found!"));

        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isPassword) return next(createError(400, "Wrong Credentials"))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(otherDetails)
    } catch (error) {
        next(error)
    }
}