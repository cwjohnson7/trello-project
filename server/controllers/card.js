const Card = require("../models/card");
const List = require("../models/list");

exports.addCard = function (req, res, next) {
  const id = req.params.list;

  List.findById(id)
  .then((result) => {
    console.log('list query: ', result)
    
    console.log('req.body: ', req.body);
    const card = new Card({
      name: req.body.cardName,
      description: req.body.description,
      label: 'none',
      list: result._id
    });
   card.save();
    console.log('card saved: ', card);
    result.cards.push(card);
    result.save();
    console.log('list query after adding card: ', result);
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