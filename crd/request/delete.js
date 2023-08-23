const AccountController = require("../controller/AccountController");
const getPostData = require("../util/bodyParser");
const badResponse = require("../util/badResponse");

module.exports = async (req, res) => {
  if (req.url === "/api/v1/account/") {
    try{
      const data = await getPostData(req);
      req.id = data.id;
      AccountController.destroy(req, res);
    }catch(err){
      badResponse(res);
    }
    
  }else{
    badResponse(res);
  }
};
