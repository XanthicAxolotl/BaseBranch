// Channel Controller
// ------------------
//
// The methods in the Channel Controller are invoked when requests are sent to specific paths with specific HTTP request methods. The methods use Sequelize to retrieve Channel model data from the MySQL database, and return it to the client.

var Nodes = require('../config/db_models.js').Nodes;
var Curricula = require('../config/db_models.js').Curricula;
var Channels = require('../config/db_models.js').Channels;
var Users = require('../config/db_models.js').Users;

module.exports = {

  // Retrieve all of the Channels from the database and send back to the client.
  getAllChannels: function(req, res, next){
    Channels.findAll()
    .then(function(channels){
      console.log('Successfully found all channels')
      // Send back to the client the Channel instances as a JSON object.
      res.json(channels);
    })
    .error(function(err){
      console.error('Error in finding all channels')
    })
  },

  // Retrieve all of the Nodes for a specific Channel from the database and send back to the client.
  getAllNodes: function(req, res, next) {
    // Lookup the Channel instance that matches the Channel passed in as a request parameter.
    Channels.find({where: { name: req.params.name }})
    .then(function(channel){
      console.log('Found channel');
      // Lookup all of the Node instances that are associated with the Channel instance.
      Nodes.findAll({where:{ channelId: channel.id }})
      .then(function(nodes){
        console.log('Successfully found all nodes');
        // Send back to the client the Node instances as a JSON object.
        res.json(nodes);
      })
      .error(function(err){
        console.error('Error in finding all nodes:', err);
      })
    }).error(function(err){
      console.error('Error in finding channel: ', err);
    })
  },

  // Retrieve all of the Curricula for a specific Channel from the database and send back to the client.
  getAllCurricula: function(req, res, next) {
    // Lookup the Channel instance that matches the Channel passed in as a request parameter.
    Channels.find({where: { name: req.params.name }})
    .then(function(channel){
      console.log('Found channel');
      // Lookup all of the Curriculum instances that are associated with the Channel instance.
      Curricula.findAll({where:{ channelId: channel.id }, include: [ Users ]})
      .then(function(curricula){
        console.log('Successfully found all curricula');
        // Send back to the client the Curriculum instances as a JSON object.
        res.json(curricula);
      })
      .error(function(err){
        console.error('Error in finding all curricula:', err);
      })
    })
    .error(function(err){
      console.error('Error in finding channel: ', err);
    })
  },

  // Retrieve all of the related Channels for a specific Channel from the database and send back to the client.
  getRelatedChannels: function(req, res, next) {
    // Lookup the Channel instance that matches the Channel passed in as a request parameter.
    Channels.find({where: { name: req.params.name }})
    .then(function(channel){
      console.log('Found channel');
      // Lookup all of the Channel instances that are associated with the target Channel instance.
      channel.getNeighbors()
      .then(function(neighbors){
        console.log('Found related channels');
        // Send back to the client the Channel instances as a JSON object.
        res.json(neighbors);
      })
      .error(function(err){
        console.error('Error in finding related channels: ', err);
      })
    })
    .error(function(err){
      console.error('Error in finding channel: ', err);
    })
  }
};
