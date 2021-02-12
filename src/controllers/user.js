const { register, checkUser, allUser } = require('../models/user')
const { createWallet } = require('../models/wallet')
const { response } = require('../helpers/index')
const {genSaltSync, hashSync, compareSync} = require('bcryptjs')


const handleRegister =  async (req, res)=> {
	try {
		const salt = genSaltSync(18)
		const data = {
			fullname: req.body.fullname,
			email: req.body.email,
			password: hashSync(req.body.password, salt),
			level: req.params.level,
		}
		if(req.session.user){
			req.session.user = undefined
		}
		const user = await checkUser(data.email)
		if(user.length === 0){
			const query = await register(data)
			if(query){
				const eWallet = {user_id: query.insertId, saldo: 0}
				await createWallet(eWallet)
			}
			return response(res, query, 201, 'Register success!')
		}else{
			return response(res, null, 409, 'Email already taken!')
		}
	} catch (error) {
		return response(res, null, 500, 'Server error!')
	}

}



const handleLogin = async (req, res)=> {
	try {
		const data = {
			email: req.body.email,
			password: req.body.password
		}
		if(req.session.user){
			return response(res, req.session.user, 200, 'User login!')
		}
		const user = await checkUser(data.email)
		if(user.length === 0){
			return response(res, null, 404, 'Email not found, please register!')
		}else{
			const checkPassword = compareSync(data.password, user[0].password)
			if(checkPassword){
				user[0].password = undefined
				req.session.user = user[0]
				return response(res, user[0], 200, 'Login success!')
			}else{
				return response(res, null, 401, 'Wrong password!')
			}
		}
	} catch (error) {
		return response(res, null, 500, 'Server error!')
	}
}


const handleGetAllUser = async (req, res)=> {
	try {
		const dataUser = await allUser()
		console.log(dataUser)
		if(dataUser.length == 0){
			return response(res, null, 404, 'Users not found!')
		}
		return response(res, dataUser, 200, 'Data all users!')
	} catch (error) {
		console.log(error)
		return response(res, null, 500, 'Server error!')
	}
}



const handleLogout = (req, res)=> {
	if(req.session.user){
		req.session.user = undefined
		return response(res, null, 200, 'User logout!')
	}else{
		return response(res, null, 401, 'nothing user login, please login!')
	}
}


module.exports = {
	handleRegister,
	handleLogin,
	handleLogout,
	handleGetAllUser
}