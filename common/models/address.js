'use strict';
const logger = require('../../server/logger').slog;
const AddressService = require('../service/address/addressService');

module.exports = function(Address) {
	const service = new AddressService(Address);

	//Address.static / instance methods 호출하는거를 최대한 자제하기위해 Service를 별도 생성
	Address.createAddressByUserId = (mainAddress, subAddress, zipCode, seq, isMain, req, cb) => {
		return service.createAddress({
			mainAddress: mainAddress,
			subAddress: subAddress,
			zipCode: zipCode,
			seq: seq,
			isMain: isMain,
			userId: req.userInfo.id.toString()
		}, cb);
	};

	Address.findAll = (cb) => {
		return service.getAddressList(cb);
	}

//토큰에 있는 유저아이디를 조건으로
	Address.me = (req, cb) => {
		return service.getAddressListByCondition({
			where: {
				userId: req.userInfo.id.toString()
			},
			order: 'seq ASC'
		})
	};

	Address.deleteById = (id, req, cb) => {
		return service.deleteById({
			where:{
				and:[
					{userId: req.userInfo.id.toString()},
					{id: id}
				]
			}
		}, cb);
	};

	Address.updateAddress = (mainAddress, req, cb) => {
		return service.updateMainAddress({mainAddress:mainAddress}, cb)
	};

	Address.updateById = (id, data, req, cb) => {
		return service.updateByCondition({id:id}, { ...data }, cb)
	};

	Address.destroyAddressById = (id, cb) => {
		return service.destroyByCondition(id, cb)
	};
}