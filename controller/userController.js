
const { mailsend } = require("../mail");
const grev = require("../models/userSchema");
const herolo = require('../models/heroSchema')
const jwt = require('jsonwebtoken')


exports.save = async (req, res) => {
    const { name, email, category, grievance } = req.body;
    try {
        const existingUser = await grev.findOne({ name: name })
        if (existingUser) {
            res.status(400).json('Name already exists')
        }
        else {
            const newGrev = new grev({
                name: name,
                email: email,
                category: category,
                grievance: grievance
            });
            await newGrev.save();
            mailsend(name, email, category, grievance);
            res.status(201).json('Grivance save successfully')
        }
    } catch (err) {
        res.status(401).json("save request failed", err)
    }
}

exports.getgrev = async (req, res) => {
    const searchKey = req.query.search;
    const searchQuery = {
        $or: [
            {
                name: {
                    $regex: searchKey,
                    $options: 'i'
                }
            },
            {
                category: {
                    //options i is used to remove case sensitivity
                    $regex: searchKey,
                    $options: 'i'
                }
            }
        ]
    };
    try {
        const allgrev = await grev.find(searchQuery)
        res.status(200).json(allgrev)
    }
    catch (err) {
        res.send(401).json('request failed due to:', err)
    }
}



exports.deletegrev = async (req, res) => {
    const { id } = req.params;
    try {
        const removegrev = await grev.findByIdAndDelete({ _id: id })
        res.status(200).json(removegrev)
    } catch (err) {
        res.status(401).json(err)
    }
}


exports.login = async (req, res) => {
    const { username, password } = req.body

    try {
        const existingUser = await herolo.find({ username: username,password:password })
        if (existingUser) {
            const token = jwt.sign({userId:existingUser._id},"userpwd123")
            console.log(token);
            res.status(200).json(
                {
                    data: existingUser,
                    token: token

                }
            )
        }
        else {
            res.status(401).json("Invalid Email or Password")
        }
    }
    catch (err) {
        res.status(401).json("Register request failed due to")
        console.log(err);
        
    }


}