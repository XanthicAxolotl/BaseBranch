var curriculumController = require('./curriculumController.js');

module.exports = function(app) {
    app.route('/')
      .post(curriculumController.createCurriculum);

    app.route('/:curriculumId')
      .get(curriculumController.getCurriculum);

    app.route('/rating/up/:curriculumId')
      .post(curriculumController.upRating);

    app.route('/rating/down/:curriculumId')
      .post(curriculumController.downRating);    

    app.route('/resource/:curriculumId')
      .get(curriculumController.getAllResources);
};
