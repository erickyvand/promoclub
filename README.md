# Promoclub

Promoclub is a social media where people can share photos, videos and comments on different posts. 

## How you can access and test this API
- Clone the repos
- cd to the project directory
- run `npm install` to install packages
- check `.env-sample` to the see required environment variables
- run `npm run dev-server` to start the server

This API has different endpoints which are:

- POST `/api/auth/signup`: Signup a user
- POST `/api/auth/login`: Login a user
- GET `/api/auth/google`: Login using google account
- GET `/api/auth/facebook`: Login using facebook account
- GET `/api/auth/search-account`: Search account in case you need to reset password
- PATCH `/api/auth/reset-password`: Reset password
- GET `/api/auth/profile/:id`: View user profile
- PATCH `/api/auth/edit-profile/:id`: Edit user profile
- POST `/api/posts`: Post a status
- GET `/api/posts`: Get all posts
- GET `/api/posts/view`: Get your own posts
- PATCH `/api/posts/:postId/edit`: Edit post status
- DELETE `/api/posts/:postId/delete`: Detele post status
- POST `/api/posts/:postId/comments`: Comment on a post
- GET `/api/posts/:postId/comments`: View comments per post
- PATCH `/api/posts/:postId/comments/:commentId/edit`: Edit comment
- DELETE `/api/posts/:postId/comments/:commentId/delete`: Delete comment
- GET `/api/notifications`: Get recipient notifications
- PATCH `/api/notifications/:notificationId/read` Read recipient notification
- PATCH `/api/notifications/mark-as-read` Mark all unread notification as read
- PATCH `/api/posts/:postId/like` Like a post
- GET `/api/posts/:postId/count-likes` Count the number of likes
- PATCH `/api/posts/:postId/unlike` Unlike a post
- GET `/api/posts/:postId/count-unlikes` Count the number of unlikes
- GET `/api/search` Search user by First Name or Last Name  