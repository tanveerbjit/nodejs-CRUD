const badResponse = require('../util/badResponse');

module.exports = async function validator(req,res) {
    try {


        if (req.body.hasOwnProperty('account_id') && req.body.account_id !== undefined){
            return ;
        }

        badResponse(res);

    } catch (error) {
  
      throw error;
      
    }
  }
  