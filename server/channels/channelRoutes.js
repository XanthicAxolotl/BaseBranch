// Channel Routes
// --------------
//
// These routes further route any requests sent to the /api/channel path. The Channel Controller exposes methods for handling the functionality associated with each type of request. The Channel Controller methods are associated with specific paths and HTTP request methods.

var channelController = require('./channelController.js');

module.exports = function(app) {
  
  // Send back the full list of channels from the database.
  app.route('/')
    .get(channelController.getAllChannels);

  // Send back all of the nodes associated with a specific channel.
  app.route('/nodes/:name')
    .get(channelController.getAllNodes);

  // Send back all of the curricula associated with a specific channel.
  app.route('/curricula/:name')
    .get(channelController.getAllCurricula);

  // Send back all of the related channels for a specific channel.
  app.route('/channels/:name')
    .get(channelController.getRelatedChannels);
};
