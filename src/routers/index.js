const express = require('express')
const { handleRegister, handleLogin, handleLogout, handleGetAllUser } = require('../controllers/user')
const { handleTopupMember, handleTopupAgent, handleAddMasterAgent } = require('../controllers/wallet')
const { registerValidate, loginValidate, topupValidate, masterAgentValidate, validate} = require('../middleware/validate')
const { checkLogin } = require('../middleware/auth')
const Router = express.Router()




Router
		.post('/register/:level?', registerValidate(), validate, handleRegister)
		.post('/login', loginValidate(), validate, handleLogin)
		.get('/logout', handleLogout)
		.get('/all-user', handleGetAllUser)
		.post('/topup-member',checkLogin, topupValidate(), validate, handleTopupMember)
		.post('/topup-agent',checkLogin, topupValidate(), validate, handleTopupAgent)
		.post('/add-master-agent',checkLogin, masterAgentValidate(), validate, handleAddMasterAgent)
		.get('/', (req,res) => {
			res.send({
					Messages: 'Welcome to REST API',
					Author: 'Sulfikardi',
					version: '1.0'
			})
		})

module.exports = Router