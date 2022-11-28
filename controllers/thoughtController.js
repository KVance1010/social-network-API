const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
	//  `GET` to get all thoughts
	getThoughts(req, res) {},

	// `GET` to get a single thought by its `_id`
	getSingleThought(req, res) {},

	// `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
	createThought(req, res) {},

	// `PUT` to update a thought by its `_id`
	updateThought(req, res) {},

	// `DELETE` to remove a thought by its `_id`
	deleteThought(req, res) {},

	// `POST` to create a reaction stored in a single thought's `reactions` array field
	createReaction(req, res) {},

	// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
	deleteReaction(req, res) {},
};
