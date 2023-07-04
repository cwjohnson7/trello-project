const Authentication = require("./controllers/authentication");
const Board = require("./controllers/board");
const List = require("./controllers/list");
const Card = require("./controllers/card");

module.exports = function(app) {
  //for existing users to login. can add another post route for /auth/signup if needed.
  app.post('/auth/signin', Authentication.addOrg)

  app.post('/auth/signup', Authentication.signUp)

  //after sigin-in, user gets all boards associated with their org, this is for the homepage
  app.get('/:current_user/boards')

  //get the selected board based on the board's _id using findById and req.params... it should show all the lists
  app.get('/boards/:board')

  //create a new board
  app.post('/:org/boards', Board.addBoard)

  //create a new list on a specific board
  app.post('/:board/lists', List.addList)

  //add a card to a specific list
  app.post('/:list/cards', Card.addCard)

  //get the card detail for one card on a specific list
  app.get('/cards/:card')

  //update the lists' cards arrays when a card gets moved to a different list
  app.post('/:list/:card')



}