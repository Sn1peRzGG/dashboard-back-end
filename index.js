import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'

import { BandController, UserController } from './controllers/index.js'
import { loginValidation, registerValidation } from './validations.js'

import { handleValidationErrors } from './utils/index.js'

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`
	)
	.then(() => console.log('Database OK'))
	.catch(err => console.log('Database error: ', err))

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.post(
	'/auth/login',
	loginValidation,
	handleValidationErrors,
	UserController.login
)
app.post(
	'/auth/register',
	registerValidation,
	handleValidationErrors,
	UserController.register
)
// app.get('/auth/me', checkAuth, UserController.getMe)
app.get('/bands/:id', BandController.getBandById)

app.get('/bands', BandController.getAllBands)

app.post('/bands', BandController.create)

// app.put('/bands/:id', async (req, res) => {
// 	try {
// 		const bandId = req.params.id
// 		const updatedBand = await Band.findByIdAndUpdate(bandId, req.body, {
// 			new: true,
// 		})
// 		res.json(updatedBand)
// 	} catch (error) {
// 		console.error('Error updating band:', error)
// 		res.status(500).json({ message: 'Error updating band' })
// 	}
// })

app.delete('/bands/:id', BandController.remove)

// Route for deleting a track
app.delete('/bands/:id/tracks/:trackIndex', async (req, res) => {
	try {
		const band = await Band.findById(req.params.id)
		if (!band) return res.status(404).json({ message: 'Band not found' })

		const trackIndex = parseInt(req.params.trackIndex, 10)
		if (trackIndex >= 0 && trackIndex < band.tracks.length) {
			band.tracks.splice(trackIndex, 1)
			await band.save()
			res.json(band)
		} else {
			res.status(404).json({ message: 'Track not found' })
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

const PORT = process.env.PORT || 5000
app.listen(PORT, err => {
	if (err) {
		return console.log(err)
	}

	console.log('Server OK')
})
