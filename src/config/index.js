module.exports = {
  db: {
    prodMongodbURI: process.env.prodMongodbURI,
    devMongodbURI: process.env.devMongodbURI
  },
  auth: {
    jwtSecret: process.env.jwtSecret,
  },
};
