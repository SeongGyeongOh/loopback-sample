const logger = require('../../../server/logger').slog;

module.exports = class AddressService {
	constructor(Address) {
		this.address = Address;
	} 

	//data가 들어왔을 때 address를 insert 하는 함수
	createAddress(data, cb) {
		if (!cb) {
			return this.address.create(data)	
		}
		
		return this.address.create(data);
		then(result => {
			return cb(null, result)
		})
		.catch(error => {
			logger.error(`createAddress error: ${error}`)
			return cb(error)
		});
	}

	//조건없이 모든 주소를 가져오는 함수 (find는 무조건 리스트로 날라옴)
	getAddressList(cb) {
		if(!cb) {
			return this.address.find({});
		}

		return this.address.find({})
		.then(result => {
			return cb(null, result)
		})
		.catch(error => {
			logger.error(`getAddress error: ${error}`);
			return cb(error)
		});
	}

	//조건에 따라 주소를 가져오기
	getAddressListByCondition(condition, cb) {
		if(!cb) {
			return this.address.find(condition);
		}

		return this.address.find(condition)
		.then(result => {
			return cb(null, result)
		})
		.catch(error => {
			logger.error(`getAddress error: ${error}`);
			return cb(error)
		});
	}

	getAddressByCondition(condition, cb) {
		if(!cb) {
			return this.address.findOne(condition);
		}

		return this.address.findOne(condition)
		.then(result => {
			if (!result ) {
				throw new Error("존재하지 않는 사용자입니다")
			}
			return cb(null, result)
		})
		.catch(error => {
			logger.error(`getAddress error: ${error}`);
			return cb(error)
		});
	}

	updateByCondition(condition, data, cb) {
		if(!cb) {
			return this.address.updateAll(condition, data);
		}

		return this.address.updateAll(condition, data)
		.then(result => {
			return cb(null, !!result.count)
		})
		.catch(erorr => {
			logger.error(`updateByCondition error: ${error}`);
			return cb(error)
		});
	}

	updateMainAddress(data, cb) {
		if(!cb) {
			return this.address.updateAll();
		}

		return this.address.updateAll(data)
		.then(result => {
			return cb(null, !!result.count)
		})
		.catch(error => {
			logger.error(`updateMainAddress error: ${error}`);
			return cb(error)
		});
	}

	destroyByCondition(condition, cb) {
		if(!cb) {
			return this.address.destroyById(condition)
		}

		return this.address.destroyById(condition)
		.then(result => {
			return cb(null, result)
		})
		.catch(error => {
			logger.error(`updateMainAddress error: ${error}`);
			return cb(error)
		});
	}

	deleteById(condition, cb) {
		return this.getAddressByCondition(condition)
		.then(result => {
			if(!result) {
				throw new Error("존재하지 않는 주소")
			}
			return result.destroy()
		})
		.then(result => {
			return cb(null, !!result.count);
		})
		.catch(error => {
			logger.error(`updateMainAddress error: ${error}`);
			return cb(error)
		});
	}
}