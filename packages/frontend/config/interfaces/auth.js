export class User {
  id;
  name;
  address;
  created = new Date().toISOString();
  toObject = () => ({
    name: this.name,
    address: this.address,
    created: this.created,
  });
}

export class Auth {
  token;
  /**
   * type of User class
   */
  user;
}
