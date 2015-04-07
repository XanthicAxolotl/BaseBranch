var channelController = require('./channelController.js');

module.exports = function(app) {
    app.route('/nodes/:channelId')
      .get(channelController.getAllNodes);

    app.route('/curricula/:channelId')
      .get(channelController.getAllCurricula);
};
