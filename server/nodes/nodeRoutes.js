var nodeController = require('./nodeController.js');

module.exports = function(app) {
    app.route('/')
      .post(nodeController.createNode);

    app.route('/:nodeId')
      .get(nodeController.getNode);

    app.route('/resources/:nodeId')
      .get(nodeController.getResources);
};
