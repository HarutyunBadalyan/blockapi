const sequelize = require("../../connections/db_connection");
const {DataTypes} = require("sequelize");
const Comments = require("./comment");
const Favorite_post = require("./favorite_post")

const {
    Model
} = require('sequelize');

class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}

Post.init({
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    image_url:DataTypes.STRING,
    public_id:DataTypes.STRING
}, {
    sequelize,
    modelName: 'Post',
})

Post.hasMany(Comments, {foreignKey: "post_id"})
Post.hasMany(Favorite_post, {foreignKey: "post_id"})


module.exports = Post