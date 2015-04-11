var resourceController = require('./resourceController.js');

module.exports = function(app) {
    app.route('/')
      .post(resourceController.createResource);

    app.route('/:resourceId')
      .get(resourceController.getResource);

    app.route('/rating/up/:resourceId')
      .post(resourceController.upRating);

    app.route('/rating/down/:resourceId')
      .post(resourceController.downRating);

    app.route('/comment/:resourceId')
      .get(resourceController.getAllComments);

};
