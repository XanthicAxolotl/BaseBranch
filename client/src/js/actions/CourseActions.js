/*==================== REQUIRE MODULES ====================*/
var Reflux = require('reflux');

/*==================== CREATE ACTIONS =====================*/
module.exports = Reflux.createActions(['upVote', 'downVote', 'getComments', 'newComment']);