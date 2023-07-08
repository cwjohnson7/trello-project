const Board = require("../models/board");
const Organization = require("../models/organization")

exports.addBoard = async function (req, res, next) {
  const { title, tempId, orgId } = req.body;
  try {
    const result = await Organization.findById(orgId);
    const board = new Board({
      title: title,
      org: result._id
    });
    await board.save();
    result.boards.push(board);
    console.log(result);
    await result.save();
    res.status(200).send({ board, tempId });
  } catch (err) {
    res.json(err);
  }
}

exports.getUserBoards = async function(req, res, next) {
  const { orgId } = req.body;

  // const result = await Organization.findById(orgId)
  // .populate({
  //   path: 'boards',
  //   populate: {path: 'lists'},
  //   populate: {path: 'cards'} })

  const boards = await Board.find({org: orgId})
  .populate({
    path: 'lists',
    model: 'list',
    populate: {
      path: 'cards',
      model:'card',
      populate: {
        path: 'comments',
        model: 'comment'
      }
    }
  })
  res.send({ boards })

}