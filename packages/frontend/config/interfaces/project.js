export class Project {
  id;
  address;
  ownerId;
  statusId;
  name;
  description;
  location;
  price;
  tokenCount;
  created = new Date().toISOString();
  toObject = () => ({
    id: this.id,
    address: this.address,
    ownerId: this.ownerId,
    statusId: this.statusId,
    name: this.name,
    description: this.description,
    location: this.location,
    price: this.price,
    tokenCount: this.tokenCount,
    created: this.created,
  });
}

export class ProjectDocuemnts {
  id;
  projectId;
  uri;
  name;
  description;
  created = new Date().toISOString();
  toObject = () => ({
    id: this.id,
    projectId: this.projectId,
    uri: this.uri,
    name: this.name,
    description: this.description,
  });
}

export class ProjectStatus {
  id;
  name;
  description;
  toObject = () => ({
    id: this.id,
    name: this.name,
    description: this.description,
  });
}
