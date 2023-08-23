const Model = require("../temp/")

class Transaction extends Model{

    constructor(){
        super('transactions');
    }
    
}

module.exports = new Transaction();