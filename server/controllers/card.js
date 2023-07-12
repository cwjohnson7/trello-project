const Card = require("../models/card");
const List = require("../models/list");
const Board = require("../models/board");

exports.addCard = function (req, res, next) {
  const { name, description, tempId, listId, boardId } = req.body;
  const id = req.body.listId;
  List.findById(id)
  .then((result) => {
    const card = new Card({
      name: name,
      description: description,
      label: 'none',
      list: result._id,
      board: result.board
    });
    card.save();
    result.cards.push(card);
    result.save();
    res.status(200).send({card, tempId, listId, boardId});
  })
  .catch((err) => {
    console.log(err);
    res.json(err)
  })
}
