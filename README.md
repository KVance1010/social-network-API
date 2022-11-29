# social-network-API

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

This application is a simple backend api that is used for a social media Api. The application uses MongoDb, Mongoose, Express, and Node.js. MongoDB is stores large amounts of information quickly.  

---

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [User-Story](#user-story)
- [Acceptance-Criteria](#acceptance-criteria)
- [Screenshots](#screenshots)
- [CodeSnippets](#codeSnippets)
- [License](#license)
- [Contributors](#contributors)
- [Tests](#tests)
- [Important-Information-Questions](#important-information-questions)

---

## Installation

Run "nmp i" in the command line of the application to download the required node modules. Once all required modules have been downloaded you can type "nmp start" to run the application. 

---

## Usage

When the application is running open the browser window or any platform to test API   endpoints. This application has API end points for the Users,Thoughts, Friends, and Reactions. The API end points are:

#### Thought Routes
| Request Method | Route | Use |
|---|---|---|
|post | /api/thoughts/:thoughtId| Create a thought|
|put | /api/thoughts/:thoughtId| Update a thought|
|delete | /api/thoughts/:thoughtId| Delete a thought|
|get | /api/thoughts/ | Get all thoughts|
|get | /api/thoughts/:thoughtId| get a thought|

#### User Routes
| Request Method | Route | Use |
|---|---|---|
|post | /api/users/:userId| Create a user|
|put | /api/users/:userId| Update a user|
|delete | /api/users/:userId| Delete a user|
|get | /api/users/ | Get all users|
|get | /api/users/:userId| get a user|

#### Friends Routes
| Request Method | Route | Use |
|---|---|---|
|post | /:userId/friends/:friendId| Create a friend|
|delete | /:userId/friends/:friendId| delete a friend|

#### Reactions Routes
| Request Method | Route | Use |
|---|---|---|
|post | /:thoughtId/reactions| Create a reaction|
|delete | /:thoughtId/reactions/:reactionId| delete a reaction|

---

## Technologies

- **MongoDb**
- **Mongoose**
- **Express**
- **Node.js**
- **GitHub**

---

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Screenshots

#### Insomnia find all thoughts and users in the database.

![Find All](./assets/findAll.gif)

#### Insomnia delete and add friend to database.

![Add Delete](./assets/friendDelAdd.gif)

---

## CodeSnippets

#### API Routes /api/thoughts/:thoughtId

``` JavaScript 
router
	.route('/:thoughtId')
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought);
```

#### Mongoose Model Email Validation

``` JavaScript
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
```

---

## Tests

N/A

---

## **Important-Information-Questions**

---

## License

The license used on this project was MIT license

[license link](https://opensource.org/licenses/MIT)

## Contributors

Kyle Vance

## Questions

If you have any questions regarding this project, please reach me by email at vanceofalifetime@protonmail.com

[Video Link](https://drive.google.com/file/d/1U3HoMpX0S7GQEx3a559vI17uelH7-sDw/view)

[LinkedIn](https://www.linkedin.com/in/kyle-s-vance/)

