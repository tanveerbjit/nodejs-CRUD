const http = require("http");
const route = require("./Route");
const log = require('./log/listener');


const server = http.createServer((req, res) => {
  log.updateLog(req);
  route.process_request_method(req, res);
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
