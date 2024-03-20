require('dotenv').config()
module.exports = {
  db: {
    prodMongodbURI: process.env.prodMongodbURI,
    devMongodbURI: process.env.devMongodbURI,
    dbName: process.env.dbName,
  },
  auth: {
    jwtSecret: process.env.jwtSecret,
  },
};
