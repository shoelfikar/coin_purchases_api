const db = require('../config/db')


const register =  (data)=> {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users SET ?', data, (err, result)=> {
      if(!err) {
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })   
  })
}

const checkUser = (email)=> {
	return new Promise((resolve, reject)=> {
		db.query('SELECT users.*, wallet.parent_id, wallet.saldo FROM users INNER JOIN wallet ON users.id = wallet.user_id WHERE users.email = ?', email, (err, result)=> {
			if(!err) {
        resolve(result)
      }else{
        reject(new Error(err))
      }
		})
	})
}

const allUser = ()=> {
	return new Promise((resolve, reject)=> {
		db.query('SELECT users.*, wallet.parent_id, wallet.saldo FROM users INNER JOIN wallet ON users.id = wallet.user_id WHERE users.id ORDER BY users.id DESC',  (err, result)=> {
			if(!err) {
        resolve(result)
      }else{
        reject(new Error(err))
      }
		})
	})
}




module.exports = {
	register,
	checkUser,
	allUser
}