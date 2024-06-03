import bcrypt from 'bcrypt'
import 'dotenv/config'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import UserModel from '../models/User.js'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRATION = process.env.JWT_EXPIRATION
const COOKIE_SECURE = process.env.COOKIE_SECURE === 'true'

export const register = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}

		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const doc = new UserModel({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
			description: req.body.description,
			passwordHash: hash,
		})

		const user = await doc.save()

		const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
			expiresIn: JWT_EXPIRATION,
		})

		res.cookie('token', token, {
			httpOnly: true,
			secure: COOKIE_SECURE,
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів
		})

		console.log('Token:', token)

		const { passwordHash, ...userData } = user._doc

		res.json({ ...userData, token })
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Failed to register' })
	}
}

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const isValidPass = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		)

		if (!isValidPass) {
			return res.status(400).json({ message: 'Invalid login or password' })
		}

		const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
			expiresIn: JWT_EXPIRATION,
		})

		res.cookie('token', token, {
			httpOnly: true,
			secure: COOKIE_SECURE,
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів
		})

		const { passwordHash, ...userData } = user._doc

		res.json({ ...userData, token })
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Login failed' })
	}
}
