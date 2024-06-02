import { body } from 'express-validator'

export const loginValidation = [
	body('email', 'Invalid email format').isEmail(),
	body('password', 'Password must be at least 5 characters long').isLength({
		min: 4,
	}),
]

export const registerValidation = [
	body('firstName', 'First name must be at least 2 characters long').isLength({
		min: 2,
	}),
	body('lastName', 'Last name must be at least 2 characters long').isLength({
		min: 2,
	}),
	body('email', 'Invalid email format').isEmail(),
	body('phone', 'Phone must be in the format +380XXXXXXXXX').matches(
		/^\+38\d{3}\d{7}$/
	),
	body(
		'description',
		'Description must be at least 10 characters long'
	).isLength({
		min: 10,
	}),
	body(
		'password',
		'Password must be between 8 and 16 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
	)
		.isLength({ min: 8, max: 16 })
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/),
]
