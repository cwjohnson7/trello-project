module.exports = function(app) {
  //for existing users to login. can add another post route for /auth/signup if needed.
  app.post('/auth/signin')

  //after sigin-in, user gets all boards associated with their org, this is for the homepage
  app.get('/current_user/boards')

  //this gets the selected board based on the board's _id using findById and req.params... it should show all the list
  app.get('/boards/:board')

}