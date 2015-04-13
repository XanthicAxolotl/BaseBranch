var Sequelize = require("sequelize");
var bcrypt = require("bcrypt-nodejs");

// Get the correct MySQL connection depending on the environment. If the app is deployed to Heroku then we use the MySQL connection string stored in the environment variable to connect to the database. Otherwise, if the app is run locally then we connect to the locally running instance of MySQL. The local instance of MySQL must be started prior to starting the local server.

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
  name: {type: Sequelize.STRING, allowNull: false},
  password: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false},
  reputation: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
  picture: Sequelize.TEXT,
  githubId: {type: Sequelize.INTEGER, allowNull: true}
  },
  { classMethods: {
      generateHash: function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }
    },
    instanceMethods: {
      validPassword: function(password){
        return bcrypt.compareSync(password, this.password);
      }
    }
  }
);

// define Channels model
var Channels = sequelize.define('channels', {
  name: {type: Sequelize.STRING, allowNull: false}
});

// define Nodes model
var Nodes = sequelize.define('nodes', {
  name: {type: Sequelize.STRING, allowNull: false}
});

// define Curricula model
var Curricula = sequelize.define('curricula', {
  name: {type: Sequelize.STRING, allowNull: false},
  description: Sequelize.STRING,
  rating: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
});

// define Resources model
var Resources = sequelize.define('resources', {
  name: {type: Sequelize.STRING, allowNull: false},
  url: {type: Sequelize.STRING, allowNull: false},
  type: {type: Sequelize.STRING, allowNull: false},
  description: Sequelize.STRING,
  rating: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
});

// define Comments model
var Comments = sequelize.define('comments', {
  text: {type: Sequelize.STRING, allowNull: false}
});

// define relationships
Nodes.belongsTo(Channels);
Resources.belongsTo(Nodes);
Resources.belongsTo(Users);
Comments.belongsTo(Resources);
Comments.belongsTo(Users);
Curricula.belongsTo(Users);
Curricula.belongsTo(Channels);

Nodes.belongsToMany(Nodes, {as: 'Neighbors', through:'nodes_nodes'});

Channels.belongsToMany(Channels, {as: 'Neighbors', through: 'channels_channels'});

Resources.belongsToMany(Curricula, {through: 'curricula_resources'});
Curricula.belongsToMany(Resources, {through: 'curricula_resources'});

Curricula.belongsToMany(Users, {through: 'subscriptions'});
Users.belongsToMany(Curricula, {through: 'subscriptions'});

// sync tables to database
sequelize.sync().success(function() {
    console.log('basebranch tables created successfully');

    // create instances if they do not exist already
    var channel1, channel2, node1, node2, resource1, resource2, resource3;

    // create channel
    Channels.findOrCreate({ where: {name: 'JavaScript'}})
    .spread(function(channel, created){
      channel1 = channel;
      console.log('Found or created channel ', channel.name);
      console.log('Created? ', created);
      // create related channel
      Channels.findOrCreate({ where: {name: 'Angular'}})
      .spread(function(channel, created){
        channel2 = channel;
        console.log('Found or created channel ', channel.name);
        console.log('Created? ', created);
        channel1.addNeighbor(channel)
        .then(function(){
          console.log('successfully related JavaScript and Angular channels');
          // create node in channel
          Nodes.findOrCreate({ where: {name: 'Intro to JavaScript'}, defaults: {channelId: channel1.id}})
          .spread(function(node, created){
            node1 = node;
            console.log('Found or created node ', node.name);
            console.log('Created? ', created);
            // create neighbor node in channel
            Nodes.findOrCreate({ where: {name: 'JavaScript Objects'}, defaults: {channelId: channel1.id}})
            .spread(function(node, created){
              node2 = node;
              console.log('Found or created node ', node.name);
              console.log('Created? ', created);
              node1.addNeighbor(node)
              .then(function(){
                console.log('successfully related Intro to JavaScript and JavaScript Objects nodes');
                // create resource in node
                Resources.findOrCreate({ where: {name: 'Eloquent JavaScript'}, defaults: {url: 'http://eloquentjavascript.net/', type: 'online book', description: 'An online book for learning the fundamentals of JavaScript.', nodeId: node1.id}})
                .spread(function(resource, created){
                  resource1 = resource;
                  console.log('Found or created resource ', resource.name);
                  console.log('Created? ', created);
                  // create second resource in node
                  Resources.findOrCreate({ where: {name: 'MDN JavaScript Reference'}, defaults: {url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', type: 'website', description: 'An online reference for JavaScript.', nodeId: node1.id}})
                  .spread(function(resource, created){
                    resource2 = resource;
                    console.log('Found or created resource ', resource.name);
                    console.log('Created? ', created);
                    // create resource in second node
                    Resources.findOrCreate({ where: {name: 'Introduction to Object-Oriented JavaScript'}, defaults: {url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript', type: 'website', description: 'An online guide to objects in JavaScript.', nodeId: node2.id}})
                    .spread(function(resource, created){
                      resource3 = resource;
                      console.log('Found or created resource ', resource.name);
                      console.log('Created? ', created);
                      // create curriculum
                      Curricula.findOrCreate({ where: {name: 'Learn JavaScript'}, defaults: {description: 'This curriculum will get you started with coding in JavaScript.'}})
                      .spread(function(curriculum, created){
                        console.log('Found or created curriculum ', curriculum.name);
                        console.log('Created? ', created);
                        curriculum.setResources([resource1, resource2, resource3])
                        .then(function(){
                          console.log('successfully related resources with curriculum');
                          curriculum.setChannel(channel1)
                          .then(function(){
                            console.log('successfully related curriculum with channel');
                          })
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      }); 
    });
});

module.exports.sequelize = sequelize;
module.exports.Users = Users;
module.exports.Channels = Channels;
module.exports.Comments = Comments;
module.exports.Curricula = Curricula;
module.exports.Resources = Resources;
module.exports.Nodes = Nodes;
