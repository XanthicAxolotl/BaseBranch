var Nodes = require('../config/db_models.js').Nodes;
var Curricula = require('../config/db_models.js').Curricula;
var Channels = require('../config/db_models.js').Channels;

module.exports = {

  getAllNodes: function(req, res, next) {
    Channels.find({where: { name: req.params.name }})
    .then(function(channel){
      console.log('Found channel');
      Nodes.findAll({where:{ channelId: channel.id }})
      .then(function(nodes){
        console.log('Successfully found all nodes', nodes);
        res.json(nodes);
      })
      .error(function(err){
        console.error('Error in finding all nodes:', err);
      })
    }).error(function(err){
      console.error('Error in finding channel: ', err);
    })
  },

  getAllCurricula: function(req, res, next) {
    Channels.find({where: { name: req.params.name }})
    .then(function(channel){
      console.log('Found channel');
      Curricula.findAll({where:{ channelId: channel.id }})
      .then(function(curricula){
        console.log('Successfully found all curricula', curricula);
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

  getRelatedChannels: function(req, res, next) {
    Channels.find({where: { name: req.params.name }})
    .then(function(channel){
      console.log('Found channel');
      channel.getNeighbors()
      .then(function(neighbors){
        console.log('Found related channels');
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
