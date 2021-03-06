const Card = require('../models/card');

function removeLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .orFail(new Error(`Карточка ${req.params.cardId} не найдена`))
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      }
      if (err.name === 'NotFound') res.status(404).send({ message: 'Карточка не найдена' });
      else res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function putLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .orFail(new Error(`Карточка ${req.params.cardId} не найдена`))
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      }
      if (err.name === 'NotFound') res.status(404).send({ message: 'Карточка не найдена' });
      else res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
}

function createCard(req, res) {
  console.log(req.body);
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error(`Карточка ${req.params.cardId} не найдена`))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      }
      if (err.name === 'NotFound') res.status(404).send({ message: 'Карточка не найдена' });
      else res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
};
