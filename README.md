# Back-end for Tasks 1, 2, and 3

## Getting Started

1. Make sure that [node](https://nodejs.org/en) is installed on your computer. If node is not installed, install it with the [Node Version Manager](https://github.com/nvm-sh/nvm?tab=readme-ov-file#long-term-support) using the `nvm install --lts` command.
2. In a terminal, go to the root of this folder and install the dependencies for the frontend app by running the command `npm install`. This will create the folder 'node_modules'.
3. To start the Express Server, you need to run the `npm run dev` command, which uses Typescript Execute (tsx) to run Typescript. Alternatively, you can run `npm run build` to compile the Typescript project with tsc (it uses the config in tsconfig.json). You can then run `npm start` to run the Express Server. The MongoDB database is stored in the cloud using a MongoDB Atlas cluster. The application is connected to the cluster through a connection string, so you do not need to install MongoDB.
4. You can run `npm test` command to run the server tests.
5. I have added .env variables so that testing and development run in different databases. The tests are done in the "test" database instead of "backendDB", so that they are done in a controlled environment. 


### Back End routes and services:

- `"/users"` routes:
    1. `post("/register", signupValidator, registerUser)`: it validates the details introduced by the user, and if correct, it creates a new User. 
    2. `post("/login", loginUser)`: if the user has introduced their details correctly, it validates them and generates a token that will be stored in localStorage in the Front End. 

- `"/api"` routes: 
    1. `post("/submit", auth, getCharacterCount)`: this route returns the length of a given string. If the user is logged in, it moreover stores the result as a new StringLength.
    2. `get("/average", auth, getAverageValue)`: if the user is logged in, it retrieves all the string lengths stored for them, calculates the average, and returns it.
