const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
			trimmed: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: function (email) {
					let regExp = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
					regExp.test(String(email).toLocaleLowerCase().trim());
				},
				message: (email) => `${email.value} is not a valid email`,
			},
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Thought',
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

userSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
