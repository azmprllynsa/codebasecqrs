
class Query {

  constructor(db) {
    this.db = db;
  }

  async findAddress(parameter) {
    this.db.setCollection('addresses');
    const recordset = await this.db.findMany(parameter);
    return recordset;
  }

  async findOneAddress(parameter) {
    this.db.setCollection('addresses');
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }
}

module.exports = Query;
