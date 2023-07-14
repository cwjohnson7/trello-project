const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
const Board = require("./controllers/board");
const List = require("./controllers/list");
const Card = require("./controllers/card");
const Comment = require("./controllers/comment");
const Activity = require("./controllers/activity");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  //auth
  app.post('/api/addOrg', Authentication.addOrg)
  app.post('/api/signup', Authentication.signUp)
  app.post('/api/signin', requireSignin, Authentication.signIn)
  app.get('/api/current_user', requireAuth, Authentication.currentUser)

  //board
  app.get('/api/getUserBoards', requireAuth, Board.getUserBoards)
  app.post('/api/addBoard', requireAuth, Board.addBoard)
  
  //list
  app.post('/api/addList', requireAuth, List.addList)
  // app.post('/api/moveList', List.moveList)
  app.post('/api/updateListName', requireAuth, List.updateListName)
  
  //card
  app.post('/api/addCard', requireAuth, Card.addCard)
  app.post('/api/moveCard', requireAuth, Card.moveCard)
  app.post('/api/updateCardName', requireAuth, Card.updateCardName)
  app.post('/api/updateCardDescription', requireAuth, Card.updateCardDescription)
  app.post('/api/updateCardLabel', requireAuth, Card.updateCardLabel)
  app.post('/api/removeCard', requireAuth, Card.removeCard)

  //activity
  app.post('/api/addActivity', requireAuth, Activity.addActivity)

  //comment
  app.post('/api/addComment', requireAuth, Comment.addComment)

}