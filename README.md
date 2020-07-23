## My first project using MERN stack with typescript

#

project can be run by running npm start if nodemon is installed, otherwise type npm node ./build/app.js

This is a application built with the following technology stack

- Nodejs + express
- Reactjs + redux
- mongoDB
- jwt for authorization

APIs:

/api/users

- Sign up user | @post /api/users/signup

/api/auth

- Sign in user | @post /api/auth/login
- Delete user | @del /api/auth/delete

/api/posts

- Show all post to user @get /api/posts
- Allow user to create post @post /api/posts
- Allow user to delete post @post /api/posts/:postid
- Allow user to add comment @post /api/posts/comment/:postId
- Allow user to del comment @del /api/posts/comment/:postId
- Allow user to like a post @put /api/posts/like/:postId
- Allow user to unlike a post @put /api/posts/unlike/:postId

* Authenticate user with jwt
