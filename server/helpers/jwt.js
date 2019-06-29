const jwt = require('jsonwebtoken')
const secret="secret"

const generateToken = (input) => {
	let signOptions = {
	 issuer: "StefKwan",
	 expiresIn:  "1d",
	 algorithm:  "HS256"
	};

	return jwt.sign({input}, secret, signOptions)
}

const verifyToken = (token) => {
	let verifyOptions = {
	 issuer: "StefKwan",
	 expiresIn:  "1d",
	 algorithm:  "HS256"
	};

    return jwt.verify(token, secret, verifyOptions)
}

module.exports = {
	generateToken: generateToken,
	verifyToken: verifyToken
}
//Generate token payload