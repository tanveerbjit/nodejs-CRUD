const AccountController = require("../controller/AccountController");
const getPostData = require("../util/bodyParser");
const badResponse = require("../util/badResponse");

module.exports = async (req, res) => {

  if (req.url === "/api/v1/account/") {
    
    try{
      req.mac = "post"
      req.data = await getPostData(req,res);
      console.log(req.data);
      AccountController.store(req,res);
    }catch(err){
      badResponse(res);
    }

  }else{
    badResponse(res);
  }

};
