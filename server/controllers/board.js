const Board = require("../models/board");

exports.addBoard = function (req, res) {
  const boardName = req.body.boardName;
  console.log(req.body);
  const newBoard = new Board({
    name: req.body.boardName
  });
//response isn't including  the name entered in the new org above
  res.send(newBoard);
}