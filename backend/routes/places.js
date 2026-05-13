const express = require('express');
const router = express.Router();
const { createPlace, getPlaces, getPlaceById, addReview } = require('../controllers/placeController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/', auth, adminAuth, createPlace);
router.get('/', getPlaces);
router.get('/:id', getPlaceById);
router.post('/:id/review', auth, addReview);

module.exports = router;
