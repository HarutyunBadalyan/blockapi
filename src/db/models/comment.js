const {DataTypes} = require("sequelize");
const sequelize = require("../../connections/db_connection")
const {
    Model
} = require('sequelize');

class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

comment.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    parent_id: DataTypes.STRING
}, {
    sequelize,
    modelName: 'comment',
})

module.exports = Comment