import db from "../utils/db/server";
import { User } from "../config/interfaces";
import database from "./database";

const UserModel = new Model("user");
export default UserModel;

// export default class UserRepository {
//   constructor() {}

//   async validate(address) {
//     const entries = await db.collection("user").get();
//     const entriesData = entries.docs.map((entry) => entry.data());
//     const user = entriesData.find((entry) => entry.address === address);

//     console.log("USER ===>", user);
//     if (!user) {
//       console.log("USER ===> VALIDA", user);
//       return await this.register(address);
//     }
//     return user;
//   }

//   /**
//    *
//    * @param {address} address Wallet Address
//    */
//   async register(address) {
//     const newUser = new User();
//     newUser.address = address;
//     newUser.name = "unnamed";
//     console.log("NEW-USER", newUser.toObject());
//     const { id } = await db.collection("user").add(newUser.toObject());
//     newUser.id = id;
//     console.log("NEW-USER-Melo", id);
//     return newUser;
//   }
// }
