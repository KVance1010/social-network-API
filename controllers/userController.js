const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// const userFriends = async (userId) =>
// 	User.aggregate([
// 		{ $match: { _id: ObjectId(userId) } },
// 		{
// 			$unwind: '$friends',
// 		},
// 		{
// 			$group: {
// 				_id: ObjectId(userId),
// 				userName: $userName,
// 			},
// 		},
// 	]);

module.exports = {
	// `GET` all users
	getUsers(req, res) {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
	// `GET` a single user by its `_id` and populated thought and friend data
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select('-__v')
			.then(async (user) =>
				!user
					? res.status(404).json({ message: 'No user with that ID' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// `POST` a new user:
	createUser(req, res) {
		User.create(req.body)
			.then((user) => res.json(user))
			.catch((err) => res.status(500).json(err));
	},
	// `DELETE` to remove user by its `_id`
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.userId })
			.then((user) => {
				if (!user) {
					res.status(404).json({ message: 'user not found' });
				}
				if (user.thoughts.length > 0) {
					Thought.deleteMany({ _id: { $in: user.thoughts } });
				}
				return res.status(200).json({});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
	//  `PUT` to update a user by its `_id`
	updateUser(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user found' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},

	// `POST` to add a new friend to a user's friend list
	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $addToSet: { friends: req.body } },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user found :(' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	//  `DELETE` to remove a friend from a user's friend list
	deleteFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: { userId: req.params.friendId } } }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user found :(' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
};
