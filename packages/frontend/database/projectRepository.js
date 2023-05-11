import db from "./database";
import { Project } from "../config/interfaces";

export default class ProjectRepository {
  constructor() {
    this.collection = "project";
  }

  /**
   * Metodo para almacenar proyecto en firebase
   * @param {Project} project item a insertar
   * @returns id
   */
  async create(project) {
    // const project = new Project();
    // project.address = data.address;
    // project.ownerId = data.ownerId;
    // project.statusId = data.statusId;
    // project.name = data.name;
    // project.description = data.description;
    // project.location = data.location;
    // project.price = data.price;
    // project.tokenCount = data.tokenCount;
    // project.location = data.location;
    // project.category = data.category;
    // project.city = data.city;
    // project.cost = data.cost;
    // project.country = data.country;
    // project.postalCode = data.postalCode;
    return await db.create(this.collection, project);
  }

  async getAll() {
    return await db.getList(this.collection);
  }

  async getById(id) {
    return await db.get(this.collection, id);
  }
}
