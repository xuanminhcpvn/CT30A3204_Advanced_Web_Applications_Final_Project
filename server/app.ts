//1. import required libs and frameworks
import express, {Express} from "express";
import path from "path";
import morgan from "morgan"; //Morgan is used to see request and response logs in terminal
import mongoose, {Connection } from 'mongoose';
import dotenv from "dotenv";////loads environment variables from a .env file into process.env at the sametime hides the secret contents from users and remote devs?
import cors, {CorsOptions} from "cors";
//import router from "./src/routes/index";
import { Request, Response } from "express";
//2. create Express application instance
//Note for myself ts require type definition here we have Express, but what express() means
//Ans: express() = function
dotenv.config();
const app: Express = express()//this function must be on top;
const port: number = parseInt(process.env.PORT as string) || 1234;
//3. Link to database
const MongoDBBook: string = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(MongoDBBook);
mongoose.Promise = Promise; //Make mongoose use promise
//4. Creating MongoDB database object
const db: Connection = mongoose.connection;
//Task about database in this side is done, in ? we now must create object model for database document
db.on("error", console.error.bind(console, "MongoDB connection error"));
//5. setting corse options
//By default CORS block proxying cross origin sources through scripts
console.log("NODE_ENV =", process.env.NODE_ENV);

/*Now, if we run NODE_ENV=development npm run dev:server (or Windows users SET NODE_ENV=development& npm run dev:server), the server allows requests from http://localhost:3000.*/
//5. Middlewares
app.use(express.json());//app can read JSON data sent from the client 
app.use(express.urlencoded({extended: false}));// parse URL-encoded form data, making it accessible as a JavaScript object in req.body
//extended = Allows parsing of nested objects and arrays using the qs library.
app.use(morgan("dev"));//dev logs
//app.use("/api", router);
//7: Backend access settings must define paths for every routers
//app.use(express.static(path.join(__dirname, "../public"))); //serve static files such as images, CSS files, and JavaScript files disable static public path
if (process.env.NODE_ENV === "development") {
    const corsOptions: CorsOptions = {
        origin: `http://localhost:3000`,
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions));
} else if (process.env.NODE_ENV === "production") {
    //path.resolve parameters are path from furthest to final destination
    //example route to build (old React) now with build command React create folder dist
    //app.use(express. static(path.resolve("../..","client","dist")))
    
    //Before this all the routes have to be done; app.get("/") should not be used
    // "*" outdated
    // /.*/ most stable one
    // Other issue initially actually our NODE_ENV was never defined, although the corsOptions still run?
    //app.get(/.*/, (req: Request,  res: Response) => {
        //res.sendFile(path.resolve("../..","client","dist", "index.html")) //everything from this point will send the React application to handle rest of the requests.
        //console.log(req);
    //})
    app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));
    app.get(/.*/, (req:Request, res:Response) => {
        res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
        console.log(req);
    });
   
}

//8. Then the app must listen to certain port to communicate with other processes and nodes
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})