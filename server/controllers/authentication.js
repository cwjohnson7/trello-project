const Organization = require("../models/organization");
const User = require("../models/user");
const jwt = require("jwt-simple");
const keys = require("../config/dev");

function tokenForUser(user) {
  return jwt.encode({ sub: user.id,
  iat: Math.round(Date.now() / 1000),
  exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, keys.TOKEN_SECRET)
}

exports.addOrg = function (req, res) {
  console.log(req.body, "org");
  const newOrg = new Organization({
    name: req.body.org,
  });
  newOrg.save();
  res.send(newOrg);
};

exports.signIn = async function(req, res, next) {
  const user = req.user;
  const id = req.user.org
  const orgName = await Organization.findById(id)

  res.send({
    token: tokenForUser(user),
    user: user,
    orgName: orgName.name
  })
}

exports.currentUser = async function(req, res) {

  const id = req.user.org
  const orgName = await Organization.findById(id)
  const user = {
    email: req.user.email,
    token: tokenForUser(req.user),
    orgName: orgName.name
  };

  res.send(user)
}

exports.signUp = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const org = req.body.org;
  console.log(req.body, "sign UP");

  if (!email || !password) {
    return res.status(422).send({ error: "You must provide email and password"})
  }

  User.findOne({ email: email }).then((err, result) => {
    if (err) {
      return next(err);
    }
    // If a user with email does exist, return an error
    if (result) {
      return res.status(422).send({ error: "Email is in use" });
    }

    Organization.findOne({ name: org }).then((existingOrg) => {
      if (!existingOrg) {
        let newOrg = new Organization({ name: org });
        newOrg.save();

        const user = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          org: newOrg._id,
          org: newOrg.name
        });
        user.setPassword(password);
        user.save().then(() => {
          res.json({ token: tokenForUser(user) })
        });
        console.log("NewOrg: ", newOrg);
      } else {
        const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        org: existingOrg._id,
        orgName: existingOrg.name
        });
        user.setPassword(password);
        user.save().then(() => {
          res.json({ token: tokenForUser(user), user })
        })
      };
    });
  });
};
