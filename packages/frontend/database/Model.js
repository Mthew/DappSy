import database from "./database";

export default class Model {
  collectionName;

  constructor(collectionName) {
    if (this.instance) return this.instance;
    this.collectionName = collectionName;
    Model.instance = this;
  }

  get() {
    return database.getList(this.collectionName);
  }

  getById(id) {
    return database.get(this.collectionName, id);
  }

  findOne(searchConcept) {
    return database.findOne(this.collectionName, searchConcept);
  }

  create(item) {
    return database.create(this.collectionName, item);
  }

  delete(id) {
    return database.delete(this.collectionName, id);
  }

  update(id, item) {
    return database.set(this.collectionName, id, item);
  }
}
