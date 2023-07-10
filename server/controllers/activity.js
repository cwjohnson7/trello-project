const Card = require('../models/card');
const Activity = require('../models/activity');

exports.addActivity = async function (req, res) {
  const { cardId, text } = req.body
  const id = cardId
  try {
    const result = await Card.findById(id)
    console.log('result: ', result)
    const activity = new Activity({
      cardId: result._id,
      text: text
    })
    
    console.log('activity: ', activity)
    await activity.save();
    await result.activities.push(activity);
    await result.save();
    console.log('result after activity: ', result)
    res.status(200).send(activity);
  } catch (err) {
    res.json(err)
  }
}