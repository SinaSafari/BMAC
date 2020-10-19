# BMAC

### **What is it?**
BAMC (or BuyMeACoffee) is a platform for junior and senior developers to introduce their open source projects to other developer and community. also developers can support eachother by donating other developer (buying a coffee for them). \
develoers can share their projects in format of a Post. a post is a 512 characters text message as description of the project they want to share or introduce, and link of that project. other developers can like the post and also share their ideas in comment section of each post. 

***
## **Models**
1. ***User***
    - email
    - username
    - fullname: containing both first and last name
    - password: at least 6 characters
    - wallet: default is 0. it will increased by charging and getting donated.
    - role default is `user` but it can be `admin` too.
2. ***Post***
    - user: owner of the post, referenced to a User
    - title: string between 2 and 128 characters
    - description: string between 2 and 512 characters
    - projectLink: valid url address with http or https
***
## **Routes List**
- Auth:
    - `POST /api/v1/auth/login`
    - `POST /api/v1/auth/register`
- Users:
    - `GET | POST /api/v1/users`
    - `GET | PUT | DELETE /api/v1/users/:id`
- Post:
    - `GET | POST /api/v1/posts`
    - `GET | PUT | DELETE /api/v1/posts/:id`
***
## **Controllers**
1. ### **Auth**
- ***Register***: \
The URL is `/api/v1/auth/register` and the http verb is `POST`. sample json body: /
```json
{
    "email": "sampleEamil@email.com",
    "username": "testusername",
    "fullname": "fullname test",
    "password": "password"
}
```
if the user already exists in database with that provided email, `success: false` will be return (with a message). else the user will be created and the user object (minus the password) with access token will return.
- ***Login***: \
The URL is `/api/v1/auth/login` and the http verb is `POST`. sample json body: /
```json
{
    "email": "sampleEamil@email.com",
    "password": "password"
}
```
if the authentication verified, in response, `_id`, `username`, `email` and `token` will be returnd. else `success: false` and a message will return.

2. ### **User**
- ***Get All Users*** \
simply return the array of all users. the url is `/api/v1/users` and the http method is `GET`. this route is just admin protected route.

- ***Get a single User*** \
returns a single user details by it's id. the `id` is identical to the ObjectID in mongodb. the url is `api/v1/users/:id` and the http method is `GET`. this route is available for eveyone

- ***Update a User*** \
update a user. first find it by the id in the url and replace new object with the one that is already in the database. the url is `api/v1/users/:id` and the http method is `PUT`. this route is only available for logged in user (for editing his/her own information) and also admin.

- ***Delete a User*** \
delete a user. find the user based on the id in the url and remove it from database. the response body is empty and status code is `204 No Content`. the url is `api/v1/users/:id` and the http method is `DELETE`. this route is only available for logged in user (for deleting his/her own account) and also admin.

3. ### **Post**

- ***Get all Posts*** \
simply returns all the posts in the database. the url is `/api/v1/posts` and the http method is `GET`. this route is just admin protected route.

- ***Get a single Post*** \
returns a single post details by it's id. the `id` is identical to the ObjectID in mongodb. the url is `api/v1/posts/:id` and the http method is `GET`. this route is available for eveyone

- ***Create a Post*** \
cretes a post. the url is `api/v1/posts` and the http method is `POST`. a sample json body:
```json
{
    "user": "123...",
    "title": "my awesome post",
    "description": "hey guys please check out my new awesome project...",
    "projectLink": "https://github.com/..."
}
```
the response is success flag and `201 Created` status code or `400 Bad Request`. 

- ***Update a Post*** \
update a post. first find it by the id in the url and replace new object with the one that is already in the database. the url is `api/v1/posts/:id` and the http method is `PUT`. this route is only available for logged in user (for editing his/her own post) and also admin.

- ***Delete a Post*** \
delete a post. find the post based on the id in the url and remove it from database. the response body is empty and status code is `204 No Content`. the url is `api/v1/posts/:id` and the http method is `DELETE`. this route is only available for logged in user (for deleting his/her own post) and also admin.

***
## **Middlewares**
1. **AsyncHandler**:handling promises on asynchronous functions 
2. **ErrorHanlder**: checks for some common error types (like duplicated key error) and handle them with appropriate message and status code.
3. **Authorization**: there are two functions, `protect` which is checking for toekn validation and headers, and `authorize` which grant access to different role (exactly handle authorzation).

***
version: 0.1