//import expressnop from 'express'
//import mongoose from 'mongoose'
import dotenv, { config } from "dotenv";
import Server1 from "./models/server2";
dotenv.config();

const server = new Server1()
console.log("server funcionando")

server.listen()