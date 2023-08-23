import express from "express"
import userRoutes from "../routes/UsersRoutes";
import cors from "cors"
import database from "../DB/dbconnection";

class Server1{
    private app: express.Application
    private port: string | undefined;
    //create one more to define all routes that my server must have
    private apiPaths = {
        users: "/api/users"
    }

    constructor(){
        this.app= express();
        this.port = process.env.PORT || "3000"

        this.dbConnection()
        this.middlewares()
        this.routes()
    }

    async dbConnection (){

        try{

            await database.authenticate();
            console.log("Database Online")
        } catch(error){
            throw new Error(error as string);
        }
    }

    middlewares(){

        //setting cors
        this.app.use(cors());

        //read body
        this.app.use(express.json())

        //public
        //creat html "Deny access"

    }

    routes(){
        this.app.use(this.apiPaths.users, userRoutes )
    }


    listen (){
        if (this.port === undefined) {
            console.error("Port not defined");
            return;
        }
        this.app.listen(this.port, ()=>{
            console.log("Server running at PORT: " + this.port);
        })
    }
}

export default Server1;