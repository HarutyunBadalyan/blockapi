const {DataTypes} = require("sequelize");
const sequelize = require("../../connections/db_connection");
const {
    Model
} = require('sequelize');

class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

Image.init({
    user_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    public_id: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Image',
})

module.exports = Image