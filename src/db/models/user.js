const sequelize = require("../../connections/db_connection");
const {DataTypes} = require("sequelize")
const Post = require("./post")
const Favorite_post = require("./favorite_post");

const {
    Model
} = require('sequelize');

class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        }
    },
    password: DataTypes.STRING,
    nick_name: DataTypes.STRING,
    authenticated: DataTypes.BOOLEAN,
}, {
    sequelize,
    modelName: 'User',
});

User.hasMany(Post,{foreignKey:"user_id"})
User.hasMany(Favorite_post,{foreignKey:"user_id"})

module.exports = User
