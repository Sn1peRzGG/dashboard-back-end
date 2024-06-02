import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import * as UserController from './controllers/UserController.js'
import checkAuth from './utils/checkAuth.js'
import { loginValidation, registerValidation } from './validations.js'

mongoose
	.connect(
		'mongodb+srv://admin:0000@users.huhlc6e.mongodb.net/?retryWrites=true&w=majority&appName=users'
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

	role === 'admin' ? res.send('Admin') : res.send('Dashboard')
})

app.listen(8000, err => {
	if (err) {
		return console.log(err)
	}

	console.log('Server OK')
})
