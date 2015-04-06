var Sequelize = require("sequelize");

// Get the correct MySQL connection depending on the environment. If the app is deployed to Heroku then we use the MySQL connection string stored in the environment variable to connect to the database. Otherwise, if the app is run locally then we connect to the locally running instance of MySQL. The local instance of MySQL must be started prior to starting the local server.

module.exports = function() {

    var connectionString = process.env.CLEARDB_DATABASE_URL || 'mysql://admin:password@localhost:3306/basebranch';
    var sequelize = new Sequelize(connectionString);

    // Check the database connection status
    sequelize.authenticate().complete(function (err) {
        if (err) {
            console.log('Sequelize connection error: ', err);
        } else {
          console.log('Sequelize connection has been created successfully');
        }
    });

    // define Users model
    var Users = sequelize.define('users', {
      name: Sequelize.STRING,
      password: Sequelize.STRING,
      email: Sequelize.STRING,
      reputation: Sequelize.INTEGER
    });
    
    // define Channels model
    var Channels = sequelize.define('channels', {
      name: Sequelize.STRING
    });

    // define Nodes model
    var Nodes = sequelize.define('nodes', {
      name: Sequelize.STRING,
    });

    // define Curricula model
    var Curricula = sequelize.define('curricula', {
      name: Sequelize.STRING
    });

    // define Resources model
    var Resources = sequelize.define('resources', {
      name: Sequelize.STRING,
      url: Sequelize.STRING,
      type: Sequelize.STRING,
      description: Sequelize.STRING,
      rating: Sequelize.INTEGER
    });

    // define Comments model
    var Comments = sequelize.define('comments', {
      text: Sequelize.STRING
    });
    
    // define relationships
    Nodes.belongsTo(Channels);
    Resources.belongsTo(Nodes);
    Resources.belongsTo(Users);
    Comments.belongsTo(Resources);
    Comments.belongsTo(Users);
    Curricula.belongsTo(Users);
    Curricula.belongsTo(Channels);

    Resources.belongsToMany(Curricula, {through: 'curricula_resources'});
    Curricula.belongsToMany(Resources, {through: 'curricula_resources'});

    // sync tables to database
    sequelize.sync().success(function() {
        console.log('basebranch tables created successfully');
    });
};
