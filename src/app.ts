import 'reflect-metadata';

import "dotenv/config";
import express, { response } from 'express';
import http from "http";
import cors from "cors";

import "./shared/container";

import { Server } from "socket.io";
import { router } from './routes';

const app = express();
app.use(cors());
const serverHttp = http.createServer(app);

// Configure WS
const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
});

io.on("connection", socket => {
    console.log('User connected on socket');
})

// Configure App
app.use(express.json());
app.use(router);

// Get Client Code
app.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get("/signin/callback", (request, response) => {
    const { code } = request.query;
    return response.json(code);
})

export { serverHttp, io }