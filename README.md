# Blog App
Full-stack blog application that allows you to create an account and add, edit and delete posts and comments. There are also options such as editing an account, liking posts, chatting with other users and seeing what they are doing on the site. The application was developed using Node.js, React and Redux and stores data in the MongoDB database. It uses internet protocols such as http and mqtt. It also includes password encryption and cookies.
This project was created to pass the Web Protocols course in my university, initially it was in a private repository on gitlab, so unfortunately the full commit history is not available.

## Technologies

- React
- Node.js
- Express.js
- Redux
- MongoDB

## Dependencies

| Clinet-Side | Server-Side |
| ------ | ------ |
| axios: ^0.24.0 | body-parser: ^1.19.1 |
| formik: ^2.2.9 | cors: ^2.8.5 |
| react: ^17.0.2 | nodemon: ^2.0.15 |
| react-dom: ^17.0.2 | mongoose: ^6.1.4 |
| react-redux: ^7.2.6 | express: ^4.17.2 |
| react-router-dom: ^5.3.0 | js-cookie: ^3.0.1 |
| react-scripts: 5.0.0 | jwt-decode |
| redux: ^4.1.2 | bcryptjs: ^2.4.3 |
| redux-devtools-extension: ^2.13.9 | jsonwebtoken: ^8.5.1 |
| redux-thunk: ^2.4.1 |  |
| yup: ^0.32.11 |  |


## How to run application?
With the commands below, you can install dependencies and run the application.

First, open the console and enter the following command:

```sh
cd blog-app && cd server && npm install  && npm start 
```

Then open the second console and enter the following command:

```sh
cd blog-app && cd client && npm install  && npm start 
```

## Screenshots and functionality
On the landing page, the user can log in or create an account.

![alt text]()

In the home view, the user can view the posts added by all users or view the list of registered users.

![posts list]()

![users list]()

In the view of my posts, the user can view posts added by himself, edit them, delete them or create a new post

![my posts list]()

The user can add and edit posts through a form that includes validation.

![post create]()

The post detail view displays the content of the post, the number of likes and comments. There, users can add, edit or delete comments, as well as edit and delete the post, if they are its authors.

![post details]()

In the account editing view, the user can change the password, delete the account or log out.

![account editing]()

## Sources

The images used in the project come from the website 
https://pl.freepik.com

The icons used in the project come from the website 
https://www.flaticon.com/
