var curricula = require('../config/db_models.js').Nodes;
var Curricula = require('../config/db_models.js').Curricula;

module.exports = {

  getAllNodes: function(req, res, next) {
    // TODO: Implement
    Nodes.findAll({where:{ channelId: req.params.channelId }})
    .then(function(nodes){
      console.log('Successfully found all nodes', nodes);
      res.json(nodes);
    })
    .error(function(err){
      console.error('Error in finding all nodes:', err);
    })
  },

  getAllCurricula: function(req, res, next) {
    // TODO: Implement
    Curricula.findAll({where:{ channelId: req.params.channelId }})
    .then(function(curricula){
      console.log('Successfully found all curricula', curricula);
      res.json(curricula);
    })
    .error(function(err){
      console.error('Error in finding all curricula:', err);
    })
  }
};
