const AccountController = require("../controller/AccountController");
const badResponse = require("../util/badResponse");
const log = require('../log/listener');



module.exports = (req, res) => {
  

////////////// all account  
  if(req.url === '/api/v1/account/'){
    try{
      AccountController.index(req, res);
    }catch(err){
      badResponse(res)
    }
    
  }


/////////// single account
  else if ( req.url.match(/\/api\/v1\/account\/\d+/) ){
    try{
      const id = req.url.split("/")[4];
      req.id = id;
      AccountController.show(req, res);
    }catch(err){
      badResponse(res)
    }
    
  }

////////// pagination
  else if ( req.url.match(/\/api\/v1\/account\/paginate\/\d+\/\d+/) ) {
    try{
      req.page = {
        offset: req.url.split("/")[5],
        limit: req.url.split("/")[6],
      };
      AccountController.pagination(req, res);

    }catch(err){
      badResponse(res)
    }
    
  } 
  else {
    badResponse(res);
  }

};
