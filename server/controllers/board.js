const Board = require("../models/board");
const Organization = require("../models/organization")

exports.addBoard = function (req, res, next) {
  const id = req.body.orgId;

  Organization.findById(id)
  .then((result) => {
    console.log('org query: ', result)
    // const boardName = req.body.boardName;
    console.log('req.body: ', req.body);
    const board = new Board({
      title: req.body.boardName,
      org: result._id
    });
    board.save();
    console.log('board saved: ', board);
    result.boards.push(board);
    result.save();
    console.log('org query after adding board: ', result);
    res.send(board);
  })
  .catch((err) => {
    console.log(err);
    res.json(err)
  })
}

// exports.getUserBoards = function (req, res, next) {
  
// }