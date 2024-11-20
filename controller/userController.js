
const { mailsend } = require("../mail");
const grev = require("../models/userSchema");


exports.save = async (req, res) => {
    const { name, email, grievance } = req.body;
    try {
        const existingUser = await grev.findOne({ name: name })
        if (existingUser) {
            res.status(400).json('Name already exists')
        }
        else {
            const newGrev = new grev({
                name: name,
                email: email,
                grievance: grievance
            });
            await newGrev.save();
            mailsend(name, email, grievance);
            res.status(201).json('Grivance save successfully')
        }
    } catch (err) {
        res.status(401).json("save request failed", err)
    }
}

exports.getgrev = async (req, res) => {
    const searchKey = req.query.search;
    const searchQuery = {
        name: {
            $regex: searchKey,
            $options: 'i'
        }
    };
    try {
        const allgrev = await grev.find(searchQuery)
        res.status(200).json(allgrev)
    }
    catch (err) {
        res.send(401).json('request failed due to:', err)
    }
}


exports.deletegrev  = async(req,res)=>{
    const {id}=req.params;
    try{
        const removegrev= await grev.findByIdAndDelete({_id:id})
        res.status(200).json(removegrev)
    }catch(err){
        res.status(401).json(err)
    }
}


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await grev.findOne({ name: username, email: password });
        if (existingUser) {
            res.status(200).json(
                {
                    data: existingUser
                    
                }
            )


        }
        else {

            res.status(401).json("Invalid Email or Password")

        }
    }
    catch (error) {
        res.status(500).json("Internal server error")
    }




}