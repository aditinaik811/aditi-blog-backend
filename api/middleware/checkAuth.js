const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    console.log(req.headers.authorization)
    try{
        const token = req.headers.authorization.split(" ")[1];   //Bearer token....... so we are extracting space
        const verify = jwt.verify(token,'I am Aditi');
        console.log(verify);
        if(verify.userType=='user'){
            next()
        }
        else
        {
            return res.status(401).json({
                error:"User is not Valid"
            })
        }
    }
    catch(err)
    {
        return res.status(401).json({
            Message:"Not a Valid User"
        })
    }
}