const sequelize = require("../../connections/db_connection");
const {DataTypes} = require("sequelize");

const {
    Model
} = require('sequelize');

class Favorite_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

Favorite_post.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Favorite_post',
});



module.exports = Favorite_post