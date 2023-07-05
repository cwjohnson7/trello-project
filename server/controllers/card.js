const Card = require("../models/card");
const List = require("../models/list");
const Board = require("../models/board");

exports.addCard = function (req, res, next) {
  const id = req.body.listId;

  List.findById(id)
  .then((result) => {
    console.log('list doc found: ', result)
    
    console.log('req.body: ', req.body);
    const card = new Card({
      name: req.body.name,
      description: req.body.description,
      label: 'none',
      list: result._id,
      board: result.board
    });
   card.save();
    console.log('card saved: ', card);
    result.cards.push(card);
    result.save();
    console.log('list doc after adding card: ', result);
    res.send(card);
  })
  .catch((err) => {
    console.log(err);
    res.json(err)
  })
}


// exports.moveCard = function(req, res, next) {

// }

// exports.removeCard = function(req, res, next) {

// }