// Resource Routes
// ---------------
//
// These routes further route any requests sent to the /api/resource path. The Resource Controller exposes methods for handling the functionality associated with each type of request. The Resource Controller methods are associated with specific paths and HTTP request methods.

var resourceController = require('./resourceController.js');

module.exports = function(app) {

  // Create a new resource.
  app.route('/')
    .post(resourceController.createResource);

  // Send back a specific resource.
  app.route('/:resourceId')
    .get(resourceController.getResource);

  // Upvote the rating for a specific resource.
  app.route('/rating/up/:resourceId')
    .post(resourceController.upRating);

  // Downvote the rating for a specific curriculum.
  app.route('/rating/down/:resourceId')
    .post(resourceController.downRating);

  // Send back all of the comments associated with a specific resource.
  app.route('/comment/:resourceId')
    .get(resourceController.getAllComments);
};
