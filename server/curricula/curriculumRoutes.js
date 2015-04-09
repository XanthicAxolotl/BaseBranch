var curriculumController = require('./curriculumController.js');

module.exports = function(app) {
    app.route('/')
      .post(curriculumController.createCurriculum);

    app.route('/:curriculumId')
      .get(curriculumController.getCurriculum);

    app.route('/rating/:curriculumId')
      .get(curriculumController.getRating)
      .post(curriculumController.updateRating);

    app.route('/user/:curriculumId')
      .get(curriculumController.getUser);

    app.route('/resource/:curriculumId')
      .get(curriculumController.getResources);
};
