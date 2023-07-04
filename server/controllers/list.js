const List = require("../models/list");
const Board = require("../models/board");

exports.addList = function (req, res, next) {
  const id = req.params.board;

  Board.findById(id)
  .then((result) => {
    console.log('board query: ', result)
    
    console.log('req.body: ', req.body);
    const list = new List({
      name: req.body.listName,
      board: result._id
    });
    list.save();
    console.log('list saved: ', list);
    result.lists.push(list);
    result.save();
    console.log('board query after adding list: ', result);
    res.send(list);
  })
  .catch((err) => {
    console.log(err);
    res.json(err)
  })
}

exports.moveList = function (req, res, next) {

}