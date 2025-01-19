const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");

const signup = async (req,res)=>{
    try{
        const {name,username,email,contactNumber,password} = req.body; 
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({message:"User is already exixt, you can signin",success:false});
        }
        const UserModel = new UserModel({name,username,email,contactNumber,password});
        UserMode.password = await bcrypt.hash(password,10);
        await UserModel.save();
        res.status(201)
            .json({
                message:"Signup Successfully",success:true
            })
    }catch(err){
        res.status(500)
            .json({
                message:"Internal Server Error",success:false 
            })
    }
}
module.exports={
    signup
}