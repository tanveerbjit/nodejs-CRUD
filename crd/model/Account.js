const Model = require("../temp/model.js")




class Account extends Model {
  constructor() {
    super("accounts");
  }
}

module.exports = new Account();