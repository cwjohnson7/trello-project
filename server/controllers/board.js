const Board = require("../models/board");
const Organization = require("../models/organization");

exports.addBoard = async function (req, res, next) {
  const { title, tempId, orgId } = req.body;
  console.log(
    `exports.addBoard is invoked with following values from dispatch(addBoardThunk): title: ${title} tempId: ${tempId} orgId: ${orgId}`
  );
  // for testing purposes while we do not have auth build out, we'll create an epty board and send it back for user to populate redux state with to get us a starting point of testing full stack
  if (!orgId) {
    try {
      const board = new Board({
        title: title,
        lists: []
      });
      await board.save();
      res.status(200).send({ board, tempId });
    } catch (err) {
      res.json(err);
    }
  } else { // preserve this for auth-d access
    try {
      const result = await Organization.findById(orgId);
      const board = new Board({
        title: title,
        org: result._id,
        lists: []
      });
      await board.save();
      result.boards.push(board);
      await result.save();
      res.status(200).send({ board, tempId });
    } catch (err) {
      res.json(err);
    }
  }
};

exports.getUserBoards = async function (req, res, next) {
  const { orgId } = req.body;
  // for testing purposes while we do not have auth build out, we'll create an epty board and send it back for user to populate redux state with to get us a starting point of testing full stack
  if (!orgId) {
    const board = new Board({
      title: "TEST BOARD",
    });
    await board.save();
    res.send({ boards: [board] });
  } else {
    const boards = await Board.find({ org: orgId }).populate({
      path: "lists",
      model: "list",
      populate: {
        path: "cards",
        model: "card",
        populate: [
          {
            path: "comments",
            model: "comment",
          },
          {
            path: "activities",
            model: "activity",
          },
        ],
      },
    });
    res.send({ boards });
  }
};
