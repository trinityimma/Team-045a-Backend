const jwt = require('jsonwebtoken');


exports.verifyToken = (req, res, next)=>{
	const authHeaders = req.headers('authorization');
	if(authHeaders !== undefined){
	 const userToken = authHeaders.split(' ')[1]
	 if(userToken !== null || userToken !== undefined){
	 	jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
	 		if(err){
	 			res.status(403).json({message: "You do not have access"})
	 		}else{
	 			req.user = user;
	 			next();
	 		}
	 	})
	 }
        
	}else{
		res.status(401).json({message: "Access Denied"});
	}
}