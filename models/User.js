import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const UserSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: uuidv4,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: 'user',
		},
		avatarUrl: {
			type: String,
			default:
				'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg',
		},
	},
	{ timestamps: true }
)

export default mongoose.model('User', UserSchema)
