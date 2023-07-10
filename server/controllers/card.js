const Card = require("../models/card");
const List = require("../models/list");
const Board = require("../models/board");

exports.addCard = function (req, res, next) {
  const { name, description, tempId, listId, boardId, index } = req.body;
  const id = req.body.listId;
  
  List.findById(id)
  .then((result) => {
    const card = new Card({
      name: name,
      description: description,
      index: index,
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


// exports.moveCard = async function(req, res, next) {
//   const { cardId, sourceListId, targetListId, index } = req.body;
//   const sourceList = await List.findById(sourceListId)
//   const cardIndex = sourceList.cards.indexOf(cardId)
//   sourceList.cards.splice(cardIndex, 1);
//   await sourceList.save()
    
//   const targetList = await List.findById(targetListId)
    
//   targetList.cards.push(cardId);
// }

// exports.removeCard = function(req, res, next) {

// }