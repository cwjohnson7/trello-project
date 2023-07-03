const Organization = require("../models/organization");
const User = require("../models/user");

exports.addOrg = function (req, res) {
  const org = req.body.orgName;
  console.log(req.body);
  const newOrg = new Organization({
    name: req.body.orgName
  });
  newOrg.save();
//response isn't including  the name entered in the new org above
  res.send(newOrg);
}

exports.signUp = function (req, res, next) {

  const email = req.body.email;
  const org = req.body.orgName;
  console.log(req.body);

  User.findOne({ email: email })
  .then((err, result) => {
    if(err) { return next(err)}

  // If a user with email does exist, return an error
  if (result) {
    return res.status(422).send({ error: 'Email is in use' });
  }
  
  Organization.findOne({ name: org }).then((err, existingOrg) => {
    if (!existingOrg) { 
      let newOrg = new Organization({ name: org })
      newOrg.save();
      console.log('NewOrg: ', newOrg);
    }
  })

  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    org: req.body.orgName
  })

  user.save();

  res.send(user)

  })
  
  
}