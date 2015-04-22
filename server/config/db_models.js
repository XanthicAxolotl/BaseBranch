// Database Models
// ---------------
//
// Connect to the MySQL database, define the Sequelize models, and create initial data for the database. Sequelize is an ORM for the MySQL database, and bcrypt is used for password hashing.

var Sequelize = require("sequelize");
var bcrypt = require("bcrypt-nodejs");

// Get the correct MySQL connection depending on the environment. If the app is deployed to Heroku then we use the MySQL connection string stored in the environment variable to connect to the database. Otherwise, if the app is run locally then we connect to the locally running instance of MySQL. The local instance of MySQL must be started prior to starting the local server.
var connectionString = process.env.CLEARDB_DATABASE_URL || 'mysql://admin:password@localhost:3306/basebranch';
var sequelize = new Sequelize(connectionString, {logging: false});

// Check the database connection status.
sequelize.authenticate().complete(function (err) {
    if (err) {
        console.log('Sequelize connection error: ', err);
    } else {
      console.log('Sequelize connection has been created successfully');
    }
});

// Define the Users model.
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

// Define the Channels model.
var Channels = sequelize.define('channels', {
  name: {type: Sequelize.STRING, allowNull: false}
});

// Define the Nodes model.
var Nodes = sequelize.define('nodes', {
  name: {type: Sequelize.STRING, allowNull: false}
});

// Define the Curricula model.
var Curricula = sequelize.define('curricula', {
  name: {type: Sequelize.STRING, allowNull: false},
  description: Sequelize.STRING,
  rating: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
});

// Define the Resources model.
var Resources = sequelize.define('resources', {
  name: {type: Sequelize.STRING, allowNull: false},
  url: {type: Sequelize.STRING, allowNull: false},
  type: {type: Sequelize.STRING, allowNull: false},
  description: Sequelize.STRING,
  rating: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
});

// Define the Comments model.
var Comments = sequelize.define('comments', {
  text: {type: Sequelize.STRING, allowNull: false}
});

// Define relationships between the models. Sequelize uses these relationships to setup the appropriate foreign keys and join tables in the MySQL database.
Nodes.belongsTo(Channels);
Resources.belongsTo(Nodes);
Resources.belongsTo(Users);
Comments.belongsTo(Resources);
Comments.belongsTo(Users);
Curricula.belongsTo(Users);
Curricula.belongsTo(Channels);

// Create a 'nodes_nodes' join table to allow Nodes to have references to other Nodes in a graph view.
Nodes.belongsToMany(Nodes, {as: 'Neighbors', through:'nodes_nodes'});

// Create a 'channels_channels' join table to allow a Channel to have references to other related Channels.
Channels.belongsToMany(Channels, {as: 'Neighbors', through: 'channels_channels'});

// Create a 'curricula_resources' join table to allow Resources to be used in multiple Curricula.
Resources.belongsToMany(Curricula, {through: 'curricula_resources'});
Curricula.belongsToMany(Resources, {through: 'curricula_resources'});

// Create a 'subscriptions' join table to allow Users to subscribe to multiple Curricula.
Curricula.belongsToMany(Users, {through: 'subscriptions'});
Users.belongsToMany(Curricula, {through: 'subscriptions'});

// Sync all of the models to the MySQL database. This causes tables to be created in the database for all of the models and any join tables if those tables do not exist yet.
sequelize.sync().success(function() {
    console.log('basebranch tables created successfully');

    // Create initial data in the MySQL database if the data does not exist yet.
    var channel1, channel2, channel3, channel4, channel5, node1, node2, node3, node4, resource1, resource2, resource3, resource4, resource5;

    // Create a channel.
    Channels.findOrCreate({ where: {name: 'JavaScript'}})
    .spread(function(channel, created){
      channel1 = channel;
      console.log('Found or created channel ', channel.name);
      console.log('Created? ', created);
      // Create a related channel: Angular
      Channels.findOrCreate({ where: {name: 'Angular'}})
      .spread(function(channel, created){
        channel2 = channel;
        console.log('Found or created channel ', channel.name);
        console.log('Created? ', created);
        channel1.addNeighbor(channel)
        .then(function(){
          console.log('successfully related JavaScript and Angular channels');
          // Create a node in the channel.
          Nodes.findOrCreate({ where: {name: 'Intro to JavaScript'}, defaults: {channelId: channel1.id}})
          .spread(function(node, created){
            node1 = node;
            console.log('Found or created node ', node.name);
            console.log('Created? ', created);
            // Create a neighbor node in the same channel.
            Nodes.findOrCreate({ where: {name: 'JavaScript Objects'}, defaults: {channelId: channel1.id}})
            .spread(function(node, created){
              node2 = node;
              console.log('Found or created node ', node.name);
              console.log('Created? ', created);
              node1.addNeighbor(node)
              .then(function(){
                console.log('successfully related Intro to JavaScript and JavaScript Objects nodes');
                // Create a resource in a node.
                Resources.findOrCreate({ where: {name: 'Eloquent JavaScript'}, defaults: {url: 'http://eloquentjavascript.net/', type: 'online book', description: 'An online book for learning the fundamentals of JavaScript.', nodeId: node1.id}})
                .spread(function(resource, created){
                  resource1 = resource;
                  console.log('Found or created resource ', resource.name);
                  console.log('Created? ', created);
                  // Create a second resource in the node.
                  Resources.findOrCreate({ where: {name: 'MDN JavaScript Reference'}, defaults: {url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', type: 'website', description: 'An online reference for JavaScript.', nodeId: node1.id}})
                  .spread(function(resource, created){
                    resource2 = resource;
                    console.log('Found or created resource ', resource.name);
                    console.log('Created? ', created);
                    // Create a resource in the second node.
                    Resources.findOrCreate({ where: {name: 'Introduction to Object-Oriented JavaScript'}, defaults: {url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript', type: 'website', description: 'An online guide to objects in JavaScript.', nodeId: node2.id}})
                    .spread(function(resource, created){
                      resource3 = resource;
                      console.log('Found or created resource ', resource.name);
                      console.log('Created? ', created);
                      // Create a curriculum.
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
                            // Create a related channel: React
                            Channels.findOrCreate({ where: {name: 'React'}})
                            .spread(function(channel, created){
                              channel3 = channel;
                              console.log('Found or created channel ', channel.name);
                              console.log('Created? ', created);
                              channel1.addNeighbor(channel)
                              .then(function(){
                                console.log('successfully related JavaScript and React channels');
                                // Create a related channel: BackBone
                                Channels.findOrCreate({ where: {name: 'Backbone'}})
                                .spread(function(channel, created){
                                  channel4 = channel;
                                  console.log('Found or created channel ', channel.name);
                                  console.log('Created? ', created);
                                  channel1.addNeighbor(channel)
                                  .then(function(){
                                    console.log('successfully related JavaScript and Backbone channels');
                                    // Create a channel: Ruby
                                    Channels.findOrCreate({ where: {name: 'Ruby'}})
                                      .spread(function(channel, created){
                                        channel5 = channel;
                                        console.log('Found or created channel ', channel.name);
                                        console.log('Created? ', created);
                                      }).then(
                                        Nodes.findOrCreate({ where: {name: 'Intro to React'}, defaults: {channelId: channel3.id}})
                                          .spread(function(node, created){
                                            node3 = node;
                                            console.log('Found or created node ', node.name);
                                            console.log('Created? ', created);
                                            // Create a neighbor node in the same channel.
                                            Nodes.findOrCreate({ where: {name: 'Flux Architecture'}, defaults: {channelId: channel3.id}})
                                            .spread(function(node, created){
                                              node4 = node;
                                              console.log('Found or created node ', node.name);
                                              console.log('Created? ', created);
                                              node3.addNeighbor(node)
                                              .then(function(){
                                                console.log('successfully related Intro to React and Flux Architecture nodes');
                                                // Create a resource in a node.
                                                Resources.findOrCreate({ where: {name: 'A Quick Introduction to React'}, defaults: {url: 'http://words.taylorlapeyre.me/an-introduction-to-react', type: 'blog', description: 'Taylor Lapeyre\s introductory blog post', nodeId: node3.id}})
                                                .spread(function(resource, created){
                                                  resource4 = resource;
                                                  console.log('Found or created resource ', resource.name);
                                                  console.log('Created? ', created);
                                                  // Create a second resource in the node.
                                                  Resources.findOrCreate({ where: {name: 'Flux Overview'}, defaults: {url: 'https://facebook.github.io/flux/docs/overview.html', type: 'website', description: 'An online reference for Flux', nodeId: node4.id}})
                                                  .spread(function(resource, created){
                                                    resource5 = resource;
                                                    console.log('Found or created resource ', resource.name);
                                                    console.log('Created? ', created);
                                                  });
                                                });
                                              });
                                            });
                                          })
                                        
                                      );
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
