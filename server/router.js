const Authentication = require("./controllers/authentication")

module.exports = function(app) {
  //for existing users to login. can add another post route for /auth/signup if needed.
  app.post('/auth/signin', Authentication.addOrg)

  app.post('/auth/signup', Authentication.signUp)

  //after sigin-in, user gets all boards associated with their org, this is for the homepage
  app.get('/:current_user/boards')

  //this gets the selected board based on the board's _id using findById and req.params... it should show all the list
  app.get('/boards/:board')

  //create a new board
  app.post('/:org/boards')

  //create a new list on a specific board
  app.post('/boards/:board/lists')

  //add a card to a list
  app.post('/boards/:board/:list/cards')

  //get the card detail for one card on a specific list
  app.get('/board/:list/:card')

  //



}