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
  category;
  city;
  cost;
  country;
  postalCode;
  created = new Date().toISOString();
  toObject = () => ({
    id: this.id,
    address: this.address,
    ownerId: this.ownerId,
    statusId: this.statusId,
    name: this.name,
    description: this.description,
    price: this.price,
    tokenCount: this.tokenCount,
    location: this.location,
    category: this.category,
    city: this.city,
    cost: this.cost,
    country: this.country,
    postalCode: this.postalCode,
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
