const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', removeLike);

module.exports = router;
