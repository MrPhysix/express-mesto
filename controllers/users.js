const User = require('../models/user');

function updateUserAvatar(req, res) {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(new Error(`Пользователь ${req.user._id} не найден`))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'NotFound') res.status(404).send({ message: 'Пользователь не найден' });
      else res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function updateUser(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(new Error(`Пользователь ${req.user._id} не найден`))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'NotFound') res.status(404).send({ message: 'Пользователь не найден' });
      else res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function getUsers(req, res) {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body; // получим из объекта запроса имя и описание пользователя
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else res.status(500).send({ message: 'Произошла ошибка' });
    });
}
function getUser(req, res) {
  User.findById(req.params.userId)
    .orFail(new Error(`Пользователь ${userId} не найден`))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      }
      if (err.name === 'NotFound') res.status(404).send({ message: 'Пользователь не найден' });
      else res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
