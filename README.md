# BMAC

Detailed Docs are [here](https://github.com/SinaSafari/BMAC/tree/main/Docs)

## TODO:
- Models:
    - [x] User
    - [x] Post
    - [ ] Review
    - [ ] Like
    - [ ] Transactions (maybe)
    - ...
- Routes
    - [x] Auth Routes
    - [x] Posts Routes
    - [x] User Routes
    - [ ] Comments routes
    - [ ] Likes Routes
    - [ ] Transaction Routes
    - ...
- Controllers
    - Auth Controllers
        - [x] login
        - [x] register
        - [ ] resetPassword
        - [ ] updatePassword
        - ...
    - User Controllers
        - [x] GetAllUsers
        - [ ] GetASingleUser
        - [ ] UpdateUser
        - [ ] DeleteUser
    - Post Controllers
        - [x] GetAllPosts
        - [x] GetASinglePost
        - [x] CreateAPost
        - [x] UpdateAPost
        - [x] DeleteAPost
    - Tranasactions
        - [ ] TODO: Fill this part
- Middlewares
    - Auth:
        - [x] AsyncHandler (self explaind)
        - [x] Protect (for checking token (Authentication))
        - [x] Authorize (authorization proccess for "users" and "admin")
        - [x] ErrorHandler (and custom ErrorResponse class)