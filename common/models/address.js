'use strict';
const logger = require('../../server/logger').slog;

module.exports = function(Address) {
	//createAddressByUserId
	Address.createAddressByUserId = (mainAddress, subAddress, zipCode, seq, isMain, req, cb) => {
		Address.create({
			mainAddress: mainAddress,
			subAddress: subAddress,
			zipCode: zipCode,
			seq: seq,
			isMain: isMain,
			userId: req.userInfo.id.toString()
		})
		.then(result => {
			return cb(null, result);
		})
		.catch(error => {
			logger.error(error)
			return cb(error)
		});
	};

	Address.findAll = (cb) => {
		Address.find({})
		.then(result => {
		return cb(null, result);
		})
		.catch(error => {
			logger.error(error)
			return cb(error)
		})
	}

//토큰에 있는 유저아이디를 조건으로
	Address.me = (req, cb) => {
		Address.find({
			where: {
				userId: req.userInfo.id
			},
			order: 'seq ASC'
		})
		.then(result => {
			return cb(null, result);
		})
		.catch(error => {
			logger.error(error);
			return cb(error)
		})
	};

	Address.deleteById = (id, req, cb) => {
		Address.findOne({
			where:{
				and:[
					{userId: req.userInfo.id.toString()},
					{id: id}
				]
			}
		})
		.then(address => {
			if(!address) {
				throw new Error('에러에러');
			}
			return address.destroy()
		})
		.then(result => {
			console.log('result', result);
			return cb(null, result);
		})
		.catch(error => {
			logger.error(error);
			return cb(error)
		})
	};

	Address.updateAddress = (mainAddress, req, cb) => {
		Address.updateAll({
			mainAddress: mainAddress
		})
		.then(result => {
			return cb(null, result);
		})
		.catch(error => {
			logger.error(error);
			return cb(error)
		})
	};

	Address.updateById = (id, data, req, cb) => {
		Address.updateAll({id:id}, { ...data })
		.then(result => {
			return cb(null, result);
		})
		.catch(error => {
			logger.error(error);
			return cb(error)
		})
	};

	Address.destroyAddressById = (id, cb) => {
		Address.destroyById(id)
		.then(result => {
			return cb(null, result);
		})
		.catch(error => {
			logger.error(error);
			return cb(error)
		})
	};	
};
