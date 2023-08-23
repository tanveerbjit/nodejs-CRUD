const AccountController = require("../controller/AccountController");
const getPostData = require("../util/bodyParser");
const badResponse = require("../util/badResponse");

module.exports = async (req, res) => {
  if ( req.url.match(/\/api\/v1\/account\/\d+/) ){
    try{
      req.doc = await getPostData(req);
      req.id = req.url.split("/")[4];
      AccountController.update(req, res);
    }catch(err){
      badResponse(res);
    }
    

  }else{
    badResponse(res);
  }
};
