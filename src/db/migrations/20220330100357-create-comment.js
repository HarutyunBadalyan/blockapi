
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
        onDelete:"cascade",
        references: {
          model: "Users",
          key: "id"
        }
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        onDelete: "cascade",
        references: {
          model: "Posts",
          key: "id"
        }
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
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