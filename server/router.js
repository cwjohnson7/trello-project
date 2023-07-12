const Authentication = require("./controllers/authentication");
const Board = require("./controllers/board");
const List = require("./controllers/list");
const Card = require("./controllers/card");
const Comment = require("./controllers/comment");
const Activity = require("./controllers/activity");

module.exports = function(app) {
  //for existing users to login. can add another post route for /auth/signup if needed.
  app.post('/api/addOrg', Authentication.addOrg)
  app.post('/api/signup', Authentication.signUp)
  // app.post('/auth/signin', Authentication.signIn)
  

  //create a new board
  app.post('/api/addBoard', Board.addBoard)
  //after sigin-in, user gets all boards associated with their org, this is for the homepage
  app.get('/api/getUserBoards', Board.getUserBoards)

  //create a new list on a specific board
  app.post('/api/addList', List.addList)
  // app.post('/api/moveList', List.moveList)
  //get the selected board's list based on the board's _id using findById... it should show all the lists on that Board not archived
  // app.get('/api/getBoardLists', List.getBoardLists)

  // add/move/remove a card 
  app.post('/api/addCard', Card.addCard)
  app.post('/api/addComment', Comment.addComment)
  app.post('/api/addActivity', Activity.addActivity)
  app.post('/api/moveCard', Card.moveCard)
  app.post('/api/removeCard', Card.removeCard)

  //get the card detail for one card on a specific list
  // app.get('/cards/:card')
}