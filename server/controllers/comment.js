const Card = require("../models/card");
const Comment = require("../models/comment")

exports.addComment = async function (req, res) {
  const { cardId, userId, text } = req.body
  const id = cardId
  try {
    const result = await Card.findById(id)
    console.log('result: ', result)
    const comment = new Comment({
      createdBy: userId,
      cardId: result._id,
      text: text
    })
    
    console.log('comment: ', comment)
    await comment.save();
    await result.comments.push(comment);
    await result.save();
    console.log('result after comment: ', result)
    res.status(200).send(comment);
  } catch (err) {
    res.json(err)
  }

  

}