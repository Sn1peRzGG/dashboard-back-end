import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

// const checkAuth = (req, res, next) => {
// 	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

// 	if (!token) {
// 		return res
// 			.status(401)
// 			.json({ message: 'No authorization token specified.' })
// 	}

// 	try {
// 		const decoded = jwt.verify(token, JWT_SECRET)
// 		req.userData = decoded
// 		next()
// 	} catch (error) {
// 		return res.status(401).json({ message: 'Invalid authorization token.' })
// 	}
// }

const checkAuth = (req, res, next) => {
	const token = req.cookies.token
	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' })
	}
	try {
		const decoded = jwt.verify(token, JWT_SECRET)
		req.userData = decoded
		next()
	} catch (err) {
		return res.status(401).json({ error: 'Unauthorized' })
	}
}

export default checkAuth
