const { response } = require('../helpers/index')


module.exports = {
	checkLogin: (req, res, next)=> {
		try {
			if(req.session.user){
				var hour = 36000000
				req.session.cookie.maxAge = hour
				next()
			}else{
				return response(res, null, 401, 'please login!')
			}
		} catch (error) {
			return response(res, null, 500, 'Server error!')
		}
	}
}