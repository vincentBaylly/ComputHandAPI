module.exports = {
  DB_URL: process.env.DB_URL || "cluster0.ay5wp.mongodb.net",
  ALLOWED_URL: process.env.ALLOWED_URL,
  APP_PORT: process.env.PORT || 4000,
  DB_PORT: process.env.DB_PORT || 27017,
  DB_USER: process.env.DB_USER || "adminMongo",
  DB_PWD: process.env.DB_PWD || "@dm1nMongo",
  DB_COLLECTION: process.env.DB_COLLECTION || "computhand",
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || 3600,
};
