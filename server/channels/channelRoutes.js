var channelController = require('./channelController.js');

module.exports = function(app) {
    app.route('/nodes/:name')
      .get(channelController.getAllNodes);

    app.route('/curricula/:name')
      .get(channelController.getAllCurricula);

    app.route('/channels/:name')
      .get(channelController.getRelatedChannels);
};
