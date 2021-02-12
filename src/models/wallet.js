const db = require('../config/db')

const createWallet = (data)=> {
	return new Promise((resolve, reject)=> {
		db.query('INSERT INTO wallet SET ?', data, (err, result)=> {
			if(!err) {
        resolve(result)
      }else{
        reject(new Error(err))
      }
		})
	})
}


const topupWallet = (topup,user_id)=> {
	return new Promise((resolve, reject)=> {
		db.query('UPDATE wallet SET saldo = ? where user_id = ?', [topup, user_id], (err, result)=> {
			if(!err) {
        resolve(result)
      }else{
        reject(new Error(err))
      }
		})
	})
}

const addMasterAgent = (parent_id, user_id)=> {
	return new Promise((resolve, reject)=> {
		db.query('UPDATE wallet SET parent_id = ? where user_id = ?', [parent_id, user_id], (err, result)=> {
			if(!err) {
        resolve(result)
      }else{
        reject(new Error(err))
      }
		})
	})
}



module.exports = {
	createWallet,
	topupWallet,
	addMasterAgent
}