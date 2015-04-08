var Nodes = require('../config/db_models.js').Nodes;
var Resources = require('../config/db_models.js').Resources;

module.exports = {

  createNode: function(req, res, next) {

    Nodes.create({
      name: req.body.name
    })
    .then(function(node) {
      console.log('Successfully created node in database');
      node.addNeighbor(req.body.neighbor)
      .then(function(){
        console.log('Successfully set neighbor');
      })
      .error(function(err){
        console.error('Error in setting neighbor');
      })
      res.json(node);
    })
    .error(function(err){
      console.error('Error in creating instance of node: ', err);
    });
  },

  getNode: function(req, res, next) {
    Nodes.find({ where:{ id: req.params.nodeId } })
    .then(function(node){
      console.log('Successfully found node', node);
      res.json(node);
    })
    .error(function(err){
      console.error('Error in finding node', err);
    })
  },

  getResources: function(req, res, next) {
    Resources.findAll({where:{ nodeId: req.params.nodeId }})
    .then(function(resources){
      console.log('Successfully found all resources', resources);
      res.json(resources);
    })
    .error(function(err){
      console.error('Error in finding all resources:', err);
    })
  }
};
