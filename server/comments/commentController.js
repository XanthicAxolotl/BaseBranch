// Comment Controller
// ------------------
//
// The method in the Comment Controller is invoked when requests are sent to specific paths with specific HTTP request methods. The method uses Sequelize to create a new Comment instance in the database, and then sends that newly created comment back to the client.

var Comments = require('../config/db_models.js').Comments;

module.exports = {

  // Create a new Comment instance in the database based on the data sent in on the request.
  createComment: function(req, res, next) {
    Comments.create({
      text: req.body.text,
      resourceId: req.body.resourceId,
      userId: req.body.userId
    })
    .then(function(comments) {
      console.log('Successfully created comments in database');
      // Send back to the client the Comment instance as a JSON object.
      res.json(comments);
    })
    .error(function(err){
      console.error('Error in creating instance of comments: ', err);
    });
  }

};
