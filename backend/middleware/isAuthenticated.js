 import jwt from 'jsonwebtoken';

 const isAuthenticated =async (req,res,next) =>{
    try{

        const token = req.cookies.token;
        console.log(token);
        console.log("Cookies:", req.cookies);

        if(!token){
            return res.status(401).json({message:"User not authenticated"});

        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({message:"invalid token "});
        }
        req.id= decode.userId;
        next();
    }catch(error){
      console.log(error);
    }
 }

 export default isAuthenticated;