var commentController = require('./commentController.js');

module.exports = function(app) {
    app.route('/')
      .post(commentController.createComment);

};
