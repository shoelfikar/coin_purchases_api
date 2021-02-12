const { check, validationResult } = require('express-validator');


const registerValidate = ()=> {
	return [
		check('fullname', 'fullname is required!').not().isEmpty(),
		check('email', 'Please input valid value!').isEmail().not().isEmpty(),
		check('password', 'Your password must be at least 5 characters!').not().isEmpty(),
		check('level', 'role not found!').isIn(['master-agent', 'agent', 'buyer'])
		]
}

const loginValidate = ()=> {
	return [
		check('email', 'Please input valid value!').isEmail().not().isEmpty(),
		check('password', 'password is required!').not().isEmpty(),
	]
}


const topupValidate = ()=> {
	return [
		check('received', 'Please input valid value!').isEmail().withMessage('Must email format').not().isEmpty(),
		check('topup', 'topup is required!').not().isEmpty().isNumeric().withMessage('Only numeric format'),
	]
}

const masterAgentValidate = ()=> {
	return [
		check('masterAgentEmail', 'Please input valid value!').isEmail().withMessage('Must email format').not().isEmpty(),
	]
}

const validate = (req, res, next)=> {
	const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
	registerValidate,
	loginValidate,
	topupValidate,
	masterAgentValidate,
	validate
}