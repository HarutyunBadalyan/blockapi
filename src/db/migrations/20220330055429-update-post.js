module.exports = {
    up: function(queryInterface, Sequelize) {
      // logic for transforming into the new state
      return queryInterface.addColumn(
        'Posts',
        'public_id',{
       type: Sequelize.STRING,
       defaultValue: null,
        }
      );
  
    },
  
    down: function(queryInterface, Sequelize) {
      // logic for reverting the changes
      return queryInterface.removeColumn(
        'Posts',
        'public_id'
      );
    }
  }