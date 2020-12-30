'use strict';

const logger = require('../../server/logger').slog;

module.exports = function(Work) {

	Work.createWorkInfoByUserId = (department, position, address, tel, req, cb) => {
		Work.create({
			department: department,
			position: position,
			address: address,
			tel: tel,
			userId: req.userInfo.id.toString()
		})
		.then(result => {
			return cb(null, result)
		})
		.catch(error => {
			logger.error(error);
			return cb(error)
		})
	};

	Work.findByUserId = (req, cb) => {
		Work.find({
			where: {
				userId: req.userInfo.id
			}
		})
		.then(result => {
			return cb(null, result)
		})
		.catch(error => {
			logger.error(error);
			return cb(error)
		})
	};

	Work.updateWorkInfo = (id, data, req, cb) => {
		Work.updateAll({id:id}, { ...data })
		.then(result => {
			return cb(null, result)
		})
		.catch(error => {
			logger.error(error)
			return cb(error)
		})
	};

	Work.deleteById = (id, req, cb) => {
		Work.findOnd({
			where: {
				userId: req.userInfo.id.toString(),
				id: id
			}
		})
		.then(workInfo => {
			return workInfo.destroy()
		})
		.then(result => {
			return cb(null, result)
		})
		.catch(error => {
			logger.error(error)
			return cb(error)
		})
	} 
};
