var resourceController = require('./resourceController.js');

module.exports = function(app) {
    app.route('/')
      .post(resourceController.createResource);

    app.route('/:resourceId')
      .get(resourceController.getResource);

    app.route('/rating/:resourceId')
      .post(resourceController.updateRating);

    app.route('/comment/:resourceId')
      .get(resourceController.getAllComments);

};
