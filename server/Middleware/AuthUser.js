const jwt = require("jsonwebtoken")
//Used for secure authentication and authorization
//It is used to generate token and verify token
const secret_key = "mernbatch"

const AuthUserProfile = async (req, res, next) => {
    try {
        const token=await req.header("auth-token")
        if (token) {
            const userinfo=await jwt.verify(token,secret_key)
            console.log(userinfo)
            req.userid=userinfo.id
            next()
        } else {
           res.json({success:false,message:"Unauthorized Token!"}) 
        }
    } catch (error) {
        console.log(error)
        res.json(500).json({success:false,message:" Internal Server Error!"})
    }
}
module.exports=AuthUserProfile;