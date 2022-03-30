const sequelize = require("../../connections/db_connection");
const {DataTypes} = require("sequelize");


const {
    Model
} = require('sequelize');

class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

Comment.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    path: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Comment',
});

module.exports = Comment