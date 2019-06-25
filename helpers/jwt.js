const jwt = require('jsonwebtoken')

const generateToken = (input) => {
	let signOptions = {
	 issuer: "StefKwan",
	 expiresIn:  "1d",
	 algorithm:  "HS256"
	};
	
	return jwt.sign({input}, bash.bashrc.JWT_SECRET, signOptions)
}

const verifyToken = (token) => {
	let verifyOptions = {
	 issuer: "StefKwan",
	 expiresIn:  "1d",
	 algorithm:  "HS256"
	};

    return jwt.verify(token, bash.bashrc.JWT_SECRET, verifyOptions)
}

module.exports = {
	generateToken: generateToken,
	verifyToken: verifyToken
}
//Generate token payload