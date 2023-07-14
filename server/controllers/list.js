const List = require("../models/list");
const Board = require("../models/board");

exports.addList = function (req, res, next) {
  const { name, boardId, tempId } = req.body;
  const id = boardId;

  Board.findById(id)
  .then((result) => {
    const list = new List({
      name: name,
      board: result._id,
      org: result.org
    });
    list.save();
    result.lists.push(list);
    result.save();
    res.status(200).send({ list, tempId });
  })
  .catch((err) => {
    res.json(err)
  })
}

// exports.moveList = function (req, res, next) {

// }

exports.updateListName = async function (req, res) {
  const { listId, name } = req.body;
  const list = await List.findByIdAndUpdate(listId, {name: name});
  //card sends back the query results, not the updated card document.
  res.status(200).send(list);
}