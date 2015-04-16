// Curriculum Routes
// -----------------
//
// These routes further route any requests sent to the /api/curriculum path. The Curriculum Controller exposes methods for handling the functionality associated with each type of request. The Curriculum Controller methods are associated with specific paths and HTTP request methods.

var curriculumController = require('./curriculumController.js');

module.exports = function(app) {
  
  // Create a new curriculum.
  app.route('/')
    .post(curriculumController.createCurriculum);

  // Send back a specific curriculum.
  app.route('/:curriculumId')
    .get(curriculumController.getCurriculum);

  // Upvote the rating for a specific curriculum.
  app.route('/rating/up/:curriculumId')
    .post(curriculumController.upRating);

  // Downvote the rating for a specific curriculum.
  app.route('/rating/down/:curriculumId')
    .post(curriculumController.downRating);    

  // Send back all of the resources associated with a specific curriculum.
  app.route('/resource/:curriculumId')
    .get(curriculumController.getAllResources);
};
