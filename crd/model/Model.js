const fs = require('fs');
const notfoundResponse = require('../util/notFoundResponse')

class Model {

  constructor(arg) {
    this._file = arg;
  }

  configpath(){
    this.path = `./data/${this._file}.json`;
    return this.path;
  }

  async find() {
    return await this._readCollection();
  }

  async findByArg(arg) {
   
    const keys = Object.keys(arg);
    let col = await this._readCollection();
    this.data = col.filter(
      (element) => element[keys[0].toString()] == arg[keys[0]]
    );
    return this.data;

  }

  async insertOne(doc) {
    let col = await this._readCollection();
    col.push({ ...doc, _id: (col[col.length - 1]._id + 1) });
    await this._writeCollection(col);
    return { acknowledgement: true, inserted: 1 };
  }

  async insertMany(docs) {
    let col = await this._readCollection();
    docs.map((doc) => {
      col.push({ ...doc, id: col[col.length - 1].id + 1 });
    });
    await this._writeCollection(col);
    return { acknowledgement: true, inserted: docs.length };
  }

  async updateOne(arg, doc,res) {
    const find = await this.find(arg);

    if (find.length > 0) {
      const keys = Object.keys(arg);
      let col = await this._readCollection();
      
      let flag = 0;

      let updatedCol = col.map((element) => {
        if (element[keys[0]] == arg[keys[0]] && !flag) {
          flag = 1;
          return { ...element, ...doc };
        } else {
          return element;
        }
      });

      if(flag === 0){
        notfoundResponse(res);
      }

      await this._writeCollection(updatedCol);
      return { acknowledgement: true, updated: 1 };
    }
    return { acknowledgement: false, updated: 0 };
  }

  async updateMany(arg, doc) {
    const keys = Object.keys(arg);
    let col = this._readCollection();
    let updatedCol = col.map((element) =>
      element[keys[0]] === arg[keys[0]] ? { ...element, ...doc } : element
    );
    await this._writeCollection(updatedCol);
  }

  async deleteOne(arg) {
    const find = await this.findByArg(arg);
    if (find.length > 0) {
      console;
      const keys = Object.keys(arg);
      let col = await this._readCollection();
      let updatedCol = col.filter(
        (element) => element[keys[0].toString()] != arg[keys[0]]
      );
      await this._writeCollection(updatedCol);
      return { acknowledgement: true, deleted: 1 };
    }
    return { acknowledgement: false, deleted: 0 };
  }

  async deleteMany(arg) {
    const keys = Object.keys(arg);
    console.log(keys);
    let col = this._readCollection();
    let updatedCol = col.filter((element) => element[keys[0]] !== arg[keys[0]]);
    await this._writeCollection(updatedCol);
  }

  async hasMany(arg) {
    const keys = Object.keys(arg);
    let col = await this._readCollection();
    return col.filter((element) => element[Model.prototype.foreignId] === arg);
  }

  async paginate() {
    this.data = await this._readCollection();
    this.len = this.data.length;
    return this;
  }

  async offset({ offset, limit }) {
    console.log(offset, limit);
    this.data = await this.data.slice((offset * limit) - offset-1); // Remove the specified number of elements from the beginning
    return this; // Return the instance for method chaining
  }

  async limit({ offset, limit }) {
    await this.data.splice(limit, this.data.length - limit); // Remove elements except the last 'param' elements
    return this.data;
  }

  async _readCollection() {
    return await JSON.parse(
      fs.readFile(this.configpath(), "utf8")
    );
  }

  async _writeCollection(col) {
    await fs.writeFile(this.configpath(), JSON.stringify(col));
  }

}


module.exports = Model;