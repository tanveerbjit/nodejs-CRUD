const GET = require('./request/get')
const POST = require("./request/post");
const PUT = require("./request/put");
const DELETER = require("./request/delete");
const errResponse = require("./util/badResponse");
const log = require('./log/listener');

class Route {
  process_request_method(req, res) {
    try{
      switch (req.method) {
        case "GET":
          GET(req, res);
          break;
  
        case "POST":
          POST(req, res);
          break;
  
        case "PUT":
          PUT(req, res);
          break;
  
        case "DELETE":
          DELETER(req, res);
          break;
  
        default:
          res.statusCode = 400;
          res.write("no response");
          res.end();
          break;}
    }catch(err){
      badResponse(res);
    }
  }
}

module.exports = new Route(); // Export the class itself
