## Installation and Running

### Requirements

1. Node.js
2. NPM
3. MongoDB (create a free database and save the uri)
    After database creation > Connect > Drivers > Copy the URI and put your own password
4. Git clone this repo, or download and extract it

## Run steps
1. `cd front`
2. run `npm install --legacy-peer-deps` (the flags allow certain old react modules to run properly, e.g. the barcode scanner)
3. In another terminal, `cd back`
4. run `npm install`
5. Create a .env file in /back with the following:
    `MONGODB_URI="<your mongodb uri here>"
    PORT=3003
    SECRET="<random secret (can be any text)>"`
6. In each terminal run `npm start`


# Information from the original author:

## Features

- CRUD functionality of posts (both frontend and backend)
- Like and comment functionality
- User authentication using JSON Web Token
- Clean and usable UI

## Stack and Frameworks used

### Frontend

<img src="https://www.svgrepo.com/show/354259/react.svg"  width="40px" alt="ReactJS"> <img src="https://www.svgrepo.com/show/354274/redux.svg"  width="40px" alt="Redux"> <img src="https://www.svgrepo.com/show/354262/react-router.svg"  width="40px" alt="React-Router"> <img src="https://www.svgrepo.com/show/374118/tailwind.svg"  width="40px" alt="Tailwind CSS">

### Backend

<img src="https://www.svgrepo.com/show/354118/nodejs.svg" class="ml-2" width="40px" alt="NodeJS"> <img src="https://www.svgrepo.com/show/373845/mongo.svg" class="ml-2" width="40px" alt="MongoDB">

### Testing

<img src="https://cdn.freebiesupply.com/logos/large/2x/jest-logo-svg-vector.svg" class="ml-2" width="40px" alt="Jest"> <img src="https://miro.medium.com/max/364/0*JAWNOBEDxJLXxHUj.png" class="ml-2" width="40px" alt="Cypress">

## Screenshots

<img src='https://raw.githubusercontent.com/xxdydx/forum-app/main/images/blogList.png' width='800' height='467'>
<img src= 'https://raw.githubusercontent.com/xxdydx/forum-app/main/images/blogView.png' width='800' height='467'>
<img src= 'https://raw.githubusercontent.com/xxdydx/forum-app/main/images/commenting.png' width='800' height='436'>
<img src= 'https://raw.githubusercontent.com/xxdydx/forum-app/main/images/createPost.png' width='800'>
