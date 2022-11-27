const router = require('express').Router();
const {
	getThoughts,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
    updateReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
	.route('/:thoughtId')
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(updateReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
	
module.exports = router;


