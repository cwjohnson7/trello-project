const Authentication = require("./controllers/authentication");
const Board = require("./controllers/board");
const List = require("./controllers/list");
const Card = require("./controllers/card");
const Comment = require("./controllers/comment");
const Activity = require("./controllers/activity");

module.exports = function(app) {

  app.post('/api/addOrg', Authentication.addOrg);

  app.post('/api/signup', Authentication.signUp);

  app.post('/api/addBoard', Board.addBoard);

  app.get('/api/getUserBoards', Board.getUserBoards);

  app.post('/api/addList', List.addList);

  app.post('/api/addCard', Card.addCard);

  app.post('/api/addComment', Comment.addComment);

  app.post('/api/addActivity', Activity.addActivity);

}