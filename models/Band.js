import mongoose from 'mongoose'

const TrackSchema = new mongoose.Schema(
	{
		name: String,
		duration: Number,
	},
	{ _id: false }
)

const BandSchema = new mongoose.Schema({
	id: { type: Number, default: Math.floor(Math.random() * 100) },
	bandName: String,
	soloist: { type: String, default: 'No Soloist' },
	icon: {
		type: String,
		default: 'https://placehold.co/340x340?text=No%20Image',
	},
	participants: [{ type: String, default: 'No Other Participants' }],
	tracks: [{ type: TrackSchema }],
})

export default mongoose.model('Band', BandSchema)
