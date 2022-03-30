
const {DataTypes} = require("sequelize");
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "Users",
          key: "id"
        }
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "Posts",
          key: "id"
        }
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('comments');
  }
};