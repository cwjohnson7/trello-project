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
  //for existing users to login. can add another post route for /auth/signup if needed.
  app.post('/api/addOrg', Authentication.addOrg)
  app.post('/api/signup', Authentication.signUp)
  app.post('/api/signin', requireSignin, Authentication.signIn)

  app.get('/api/current_user', requireAuth, Authentication.currentUser);
  

  //create a new board
  app.post('/api/addBoard', requireAuth, Board.addBoard)
  //after sigin-in, user gets all boards associated with their org, this is for the homepage
  app.get('/api/getUserBoards', requireAuth, Board.getUserBoards)

  //create a new list on a specific board
  app.post('/api/addList', requireAuth, List.addList)
  // app.post('/api/moveList', List.moveList)


  // add/move/remove a card 
  app.post('/api/addCard', requireAuth, Card.addCard)
  app.post('/api/addComment', requireAuth, Comment.addComment)
  app.post('/api/addActivity', requireAuth, Activity.addActivity)
  app.post('/api/moveCard', requireAuth, Card.moveCard)
  app.post('/api/updateCardName', requireAuth, Card.updateCardName)
  app.post('/api/updateCardDescription', requireAuth, Card.updateCardDescription)
  app.post('/api/removeCard', requireAuth, Card.removeCard)

}