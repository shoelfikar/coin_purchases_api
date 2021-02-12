const { topupWallet, addMasterAgent } = require('../models/wallet')
const { checkUser } = require('../models/user')
const { response } = require('../helpers/index')

const handleTopupMember = async (req, res)=> {
	try {
		const received = await checkUser(req.body.received)
		const sender = await checkUser(req.session.user.email)
		if(received.length == 0 || sender.length == 0 || received[0].level !== 'buyer' && sender[0].level !== 'agent'){
			return response(res, null, 401, 'Topup only from agent to buyer!')
		}
		const saldo = received[0].saldo + parseInt(req.body.topup)
		const topup = await topupWallet(saldo, received[0].id)
		if(topup){
			received[0].saldo = saldo
			received[0].password = undefined
			return response(res, received[0], 200, 'Topup coin success!')
		}
	} catch (error) {
		return response(res, null, 500, 'Server error!')
	}
}


const handleTopupAgent = async (req, res)=> {
	try {
		const received = await checkUser(req.body.received)
		const sender = await checkUser(req.session.user.email)
		if(received.length == 0 || sender.length == 0 || received[0].level !== 'agent' && sender[0].level !== 'master-agent'){
			return response(res, null, 401, 'Topup only from agent to buyer!')
		}
		if(!received[0].parent_id){
			return response(res, null, 401, 'You dont have master-agent, please add master agent!')
		}
		const saldo = received[0].saldo + parseInt(req.body.topup)
		const topup = await topupWallet(saldo, received[0].id)
		if(topup){
			received[0].saldo = saldo
			received[0].password = undefined
			return response(res, received[0], 200, 'Topup coin success!')
		}
	} catch (error) {
		return response(res, null, 500, 'Server error!')
	}
}


const handleAddMasterAgent = async (req, res)=> {
	try {
		const masterAgentUser = await checkUser(req.body.masterAgentEmail)
		const agentUser = await checkUser(req.session.user.email)
		if(masterAgentUser.length == 0 && agentUser[0].length == 0){
			return response(res, null, 404, 'Master agent not found!')
		}
		if(masterAgentUser[0].level !== 'master-agent' && agentUser[0].level !== 'agent' || masterAgentUser[0].level == agentUser[0].level){
			return response(res, null, 403, 'Master agent choise the level not master agent!')
		}
		const masterAgent = await addMasterAgent(masterAgentUser[0].id, agentUser[0].id)
		if(masterAgent){
			agentUser[0].parent_id = masterAgentUser[0].id
			agentUser[0].password = undefined
			return response(res, agentUser[0], 200, 'Master agent accept!')
		}
	} catch (error) {
		console.log(error)
		return response(res, null, 500, 'Server error!')
	}
}


module.exports = {
	handleTopupMember,
	handleTopupAgent,
	handleAddMasterAgent
}