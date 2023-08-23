const badResponse = require('../util/badResponse');
const validate = require('../validators/validate')
module.exports = async function getPostData(req,res) {
  try {
    let body = "";

    for await (const chunk of req) {
      body += chunk.toString();
    }

    req.body = JSON.parse(body);
    
    if(req.mac === "post"){
      validate(req,res)
    }
    
    return JSON.parse(body);

  } catch (error) {

    throw error;
    
  }
}

