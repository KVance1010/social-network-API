const { User, Thought } = require('../models');

module.exports = {
	//  `GET` to get all thoughts
	getThoughts(req, res) {
		Thought.find()
		.select('-__v')
		.then((thoughts) => res.json(thoughts))
		.catch((err) => res.status(500).json(err));
	},

	// `GET` to get a single thought by its `_id`
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
		.select('-__v')
		.then((thought) =>
		  !thought
			? res.status(404).json({ message: 'No thought found' })
			: res.json(thought)
		)
		.catch((err) => res.status(500).json(err));
	},

	// `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
	createThought(req, res) {
		Thought.create(req.body)
		// .select('-__v')
		.then((thought) => {
			return User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $push: { thoughts: thought._id } },
				{ new: true }
			 )
			 }).then((user) => {
				!user
				? res.status(404).json({ message: 'No user found' })
				: res.json(user);
		})
		.catch((err) => res.status(500).json(err));
	},

	// `PUT` to update a thought by its `_id`
	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		  )
		  .select('-__v')
			.then((thought) =>
			  !thought
				? res.status(404).json({ message: 'No thought found' })
				: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},

	// `DELETE` to remove a thought by its `_id`
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
		.then((thought) => {
		  if(!thought){res.status(404).json({ message: 'No Thought found' })}
			return User.findOneAndUpdate(
				{ thoughts: req.params.thoughtId },
				{ $pull: { thoughts: req.params.thoughtId } },
				{ new: true }
			  )
			}).then((user) => {
				!user
				? res.status(404).json({ message: 'No user found' })
				: res.json(user);
		}).catch((err) => {
		  console.log(err);
		  res.status(500).json(err);
		});
	},

	// `POST` to create a reaction stored in a single thought's `reactions` array field
	createReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $push: { reactions: req.body } },
			{ runValidators: true, new: true }
		  )
			.then((thought) =>
			  !thought
				? res
					.status(404)
					.json({ message: 'No thought found' })
				: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},

	// `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reaction: { reactionId: req.params.reactionId } } },
			{ runValidators: true, new: true }
		  )
		  .then((thought) =>
		  !thought
			? res
				.status(404)
				.json({ message: 'No thought found' })
			: res.json(thought)
		)
		.catch((err) => res.status(500).json(err));
	},
};
