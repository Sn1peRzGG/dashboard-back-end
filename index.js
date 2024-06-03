import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import * as UserController from './controllers/UserController.js'
import checkAuth from './utils/checkAuth.js'
import { loginValidation, registerValidation } from './validations.js'

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`
	)
	.then(() => console.log('Database OK'))
	.catch(err => console.log('Database error: ', err))

const app = express()

app.use(express.json())
app.use(cors())

app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)

app.get('/dashboard', checkAuth, (req, res) => {
	const { role } = req.userData

	res.json({ role: role })
})

const PORT = process.env.PORT
app.listen(PORT, err => {
	if (err) {
		return console.log(err)
	}

	console.log('Server OK')
})
