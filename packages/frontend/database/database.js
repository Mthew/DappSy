import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

class Database {
  constructor() {
    if (this.instance) return this.instance;

    Database.instance = this;
    if (!admin.apps.length) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } catch (error) {
        console.log("Firebase admin initialization error", error.stack);
      }
    }

    this.firestore = admin.firestore();
  }

  async create(collection, document) {
    const result = await this.firestore.collection(collection).add(document);
    document.id = result.id;
    return document;
  }

  async getList(collection) {
    const result = await this.firestore.collection(collection).get();

    const list = [];
    result.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      list.push(data);
    });
    return list.length ? list : null;
  }

  async get(collection, id) {
    const result = await this.firestore.collection(collection).doc(id).get();
    if (!result.exists) return null; // Record not found

    const doc = result.data();
    doc.id = result.id;
    return doc;
  }

  async findOne(collection, searchConcept) {
    const key = Object.keys(searchConcept)[0];
    const value = searchConcept[key];

    const entries = await this.firestore.collection(collection).get();
    const entriesData = entries.docs.map((entry) => ({
      id: entry.id,
      ...entry.data(),
    }));
    const result = entriesData.find((entry) => entry[key] === value);
    return result;
  }

  async set(collection, id, document) {
    const doc = this.firestore.collection(collection).doc(id);
    const result = await doc.get();

    if (!result.exists) return null; // Record not found

    const data = {
      ...result.data(),
      ...document,
    };
    await doc.set(data);

    data.id = id;
    return data;
  }

  async delete(collection, id) {
    const doc = this.firestore.collection(collection).doc(id);
    const result = await doc.get();

    if (!result.exists) return null; // Record not found

    await doc.delete();

    return { id };
  }
}

export default new Database();
