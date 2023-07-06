const Board = require("../models/board");
const Organization = require("../models/organization")

exports.addBoard = function (req, res, next) {
  const { title, tempId, org } = req.body
  const id = org;

  Organization.findById(id)
  .then((result) => {
    const board = new Board({
      title: title,
      org: result._id
    });
    board.save();
    result.boards.push(board);
    result.save();
    res.status(200).send({ board, tempId });
  })
  .catch((err) => {
    res.json(err)
  })
}

// exports.getUserBoards = function (req, res, next) {
  
// }