import db from "../utils/db/server";
import { Project } from "../config/interfaces";

export default class ProjectRepository {
  constructor() {}

  async create(data) {
    const project = new Project();
    project.address = data.address;
    project.ownerId = data.ownerId;
    project.statusId = data.statusId;
    project.name = data.name;
    project.description = data.description;
    project.location = data.location;
    project.price = data.price;
    project.tokenCount = data.tokenCount;
    project.location = data.location;
    project.category = data.category;
    project.city = data.city;
    project.cost = data.cost;
    project.country = data.country;
    project.postalCode = data.postalCode;
    const { id } = await db.collection("project").add(project.toObject());
    project.id = id;
    return project;
  }

  async getAllDocuments() {
    const result = await db.collection("project").get();
    const list = [];
    result.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      list.push(data);
    });
    return list.length ? list : null;
  }

  async getById(id) {
    const result = await db.collection("project").doc(id).get();
    if (!result.exists) return null; 

    const doc = result.data();
    doc.id = result.id;
    return doc;
  }
}
