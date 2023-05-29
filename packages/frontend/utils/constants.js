export const ROUTES = {
  home: "/",
  newProject: "/project",
  favorites: "/favorites",
  myProjects: "/project/my",
  tokens: "/tokens",
  profile: "/profile",
  transactions: "/transacctions",
  logout: "/auth/signout",
  login: "/auth/signin",
};

export const PROJECT_CATEGORIES = [
  "Residencial",
  "Comercial",
  "Industrial",
  "Infraestructura",
  "Residencial de lujo",
  "Propiedades especiales",
];

export const TYPE_MESSAGE = {
  Success: 0,
  Error: 1,
  Warning: 2,
  Exception: 3,
  Required: 4,
  Confirm: 5,
};

export const TRANSACTION_TYPE = {
  Creation: 0,
  Sell: 1,
};
