require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_URL } = process.env;
const userModelFn = require('./models/User')
const favoriteModelFn = require('./models/Favorite')


const sequelize = new Sequelize(
   // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   DB_URL,
   { logging: false, native: false }
);


userModelFn(sequelize)
favoriteModelFn(sequelize)


const { User, Favorite } = sequelize.models;


User.belongsToMany(Favorite, { through: 'user_favorite' })
Favorite.belongsToMany(User, { through: 'user_favorite' } )



module.exports = {
   User,
   Favorite,
   conn: sequelize,
};
