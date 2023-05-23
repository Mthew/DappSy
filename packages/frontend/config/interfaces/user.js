export class User {
  id;
  name;
  lastname;
  status;
  profilePhoto;
  coverPhoto;
  email;
  location;
  country;
  city;
  postalCode;
  projects = [];
  tokens = [];
  favorites = [];
  address;
  description;
  created = new Date().toISOString();
  toObject = () => ({
    id: this.id,
    name: this.nameid,
    lastname: this.lastnameid,
    status: this.statusid,
    profilePhoto: this.profilePhotoid,
    coverPhoto: this.coverPhotoid,
    email: this.emailid,
    location: this.locationid,
    country: this.countryid,
    city: this.cityid,
    postalCode: this.postalCodeid,
    projects: this.projects,
    tokens: this.tokens,
    favorites: this.favorites,
    address: this.addressid,
    description: this.descriptionid,
  });
}
