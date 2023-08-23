const Account = require("../model/Account");
const response = require("../util/response");
const badResponse = require("../util/badResponse");
const notfoundResponse = require('../util/notFoundResponse')


class AccountController {

  
  async index(req, res) {
    try{

      const data = await Account.find();
      response(res, data);

    }catch(err){

      badResponse(res)

    }
    
  }


  async show(req, res) {
    try{

      const data = await Account.findByArg({ _id: req.id });
      data.length > 0 ? response(res, data):notfoundResponse(res);

    }catch(err){

      badResponse(res)

    }
    
  }

  async store(req, res) {

    try{
      
      const data = await Account.insertOne(req.data);
      console.log(data);
      response(res, data);

    }catch(err){

      badResponse(res)

    }
    
  }

  async update(req, res) {
    try{
      // console.log(req.doc,req.id);
      const data = await Account.updateOne({ _id: req.id }, req.doc,res);
      response(res, data);

    }catch(err){

      badResponse(res)

    }
    
  }

  async destroy(req, res) {

    try{

      const data = await Account.deleteOne({ _id: req.id });
      response(res, data);

    }catch(err){

      badResponse(res)

    }
    
  }

  async pagination(req, res) {
    try{

      const data = await (await (await Account.paginate()).offset(req.page)).limit(req.page);
      response(res, data);

    }catch(err){

      badResponse(res)

    }
    
  }
}


module.exports = new AccountController();