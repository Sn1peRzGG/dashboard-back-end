import BandModel from '../models/Band.js'

export const getBandById = async (req, res) => {
	try {
		const bandId = req.params.id
		const band = await BandModel.findById(bandId)

		if (!band) {
			return res.status(404).json({ message: 'Гурт не знайдено' })
		}

		res.json(band)
	} catch (err) {
		console.error('Помилка при отриманні гурту', err)
		res.status(500).json({ error: 'Помилка при отриманні гурту' })
	}
}

export const getAllBands = async (req, res) => {
	try {
		const bands = await BandModel.find()
		res.json(bands)
	} catch (err) {
		console.error('Failed to fetch bands', err)
		res.status(500).json({ error: 'Failed to fetch bands' })
	}
}

export const updateBands = async (req, res) => {
	try {
		const deletedBand = await Band.findByIdAndDelete(req.params.id)
		res.json(deletedBand)
	} catch (error) {
		console.error('Error deleting band:', error)
		res.status(500).json({ error: 'Error deleting band' })
	}
}

export const createNewBand = async (req, res) => {
	try {
		const newBand = new Band(req.body)
		const savedBand = await newBand.save()
		res.json(savedBand)
	} catch (error) {
		console.error('Error saving band:', error)
		res.status(500).json({ error: 'Error saving band' })
	}
}

export const create = async (req, res) => {
	try {
		const doc = new BandModel({
			bandName: req.body.bandName,
			soloist: req.body.soloist,
			icon: req.body.icon,
			participants: req.body.participants,
			tracks: req.body.tracks,
		})

		const band = await doc.save()

		res.json(band)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать группу',
		})
	}
}

export const remove = async (req, res) => {
	try {
		const bandId = req.params.id
		const deletedBand = await BandModel.findOneAndDelete({ _id: bandId })

		if (!deletedBand) {
			return res.status(404).json({ message: 'Групу не знайдено' })
		}

		res.json({ message: 'Групу успішно видалено' })
	} catch (error) {
		console.error('Помилка видалення групи:', error)
		res.status(500).json({ message: 'Помилка видалення групи' })
	}
}
