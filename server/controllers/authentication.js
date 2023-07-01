const Organization = require("../models/organization");

exports.addOrg = function (req, res) {
  const org = req.body.orgName;
  console.log(req.body);
  const newOrg = new Organization({
    name: req.body.orgName
  });
//response isn't including  the name entered in the new org above
  res.send(newOrg);
}