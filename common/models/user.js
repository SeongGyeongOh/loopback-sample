'use strict';

const logger = require('../../server/logger').slog;

module.exports = function(User) {

  User.observe('before save', (context, next) => {
    const _instance = context.instance;
    const updatedDate = new Date();

    if (_instance) {
      _instance.emailVerified = true;
      _instance.created = updatedDate;
      _instance.updated = updatedDate;
    } else {
      if (!context.currentInstance) {
        return next();
      } else {
        context.data.updated = updatedDate;
      }
    }

    return next();
  });

	User.createUserByParams = (params, cb) => {
		User.create({...params})
		.then(result => {
			return cb(null, result);
		})
		.catch(error => {
			return cb(error);
		});
	}

  User.me = (req, cb) => {
    logger.info("여기가 프로필을 요청하는 API");
    const _user = req.userInfo;

    delete _user.password;

    logger.info("response Data:" , _user);
    return cb(null, _user);
  }; 
};

//promise 문법(깃 push - pull 확인용 괄호임)
//JS는 기본적으로 함수형 언어, 비동기가 기본
//동기 처리를 하기 위한 문법

//callback이 불러주는 순간 api가 끝난다... -> 뒤의 로직이 남아있어도 프론트에 전달되지 않는다
//callback을 중복해서 부르면 에러가 난다