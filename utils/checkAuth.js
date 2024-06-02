import jwt from 'jsonwebtoken'

const checkAuth = (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

	if (!token) {
		return res
			.status(401)
			.json({ message: 'No authorization token specified.' })
	}

	try {
		const decoded = jwt.verify(token, 'secret123')
		req.userData = decoded
		next()
	} catch (error) {
		return res.status(401).json({ message: 'Invalid authorization token.' })
	}
}

export default checkAuth
