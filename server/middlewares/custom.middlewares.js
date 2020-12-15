const mongoose = require('mongoose')

module.exports = {
  check_book_Id: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.params.book_id) ? res.status(500).send({ message: 'Invalid ID' }) : next(),
  check_comment_Id: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.params.comment_id) ? res.status(500).send({ message: 'Invalid ID' }) : next(),
  check_user_Id: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.params.user_id) ? res.status(500).send({ message: 'Invalid ID' }) : next(),
  check_owner_Id: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.params.owner_id) ? res.status(500).send({ message: 'Invalid ID' }) : next(),
  check_buyer_Id: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.params.buyer_id) ? res.status(500).send({ message: 'Invalid ID' }) : next()
}