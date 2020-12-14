module.exports = {
  check_book_Id: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.params.book_id) ? res.status(500).send({message: 'Invalid ID'}) : next()
}