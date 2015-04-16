// Comment Routes
// --------------
//
// This route further routes any requests sent to the /api/comment path. The Comment Controller exposes methods for handling the functionality associated with each type of request. The Comment Controller methods are associated with specific paths and HTTP request methods.

var commentController = require('./commentController.js');

module.exports = function(app) {

    // Create a new comment for a resource.
    app.route('/')
      .post(commentController.createComment);
};
