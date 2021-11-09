import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { Request } from "express-serve-static-core";

import api from "./routes/api";

const PORT = process.env.PORT || 5000;
const PROXY_SECRET: string = process.env.RAPIDAPI_PROXY_SECRET || "baf47800-331b-11ec-83bb-db3d1a0ed791"; // in Header: "X-RapidAPI-Proxy-Secret";

const server = express();

const authExceptions = ["/api/v1/ping"];

server.use(morgan("common"));
server.use(helmet());
server.use(cors({ origin: true }));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


// Checks if path requires no Authentication
server.use((req, res, next) => {
  const fullPath = req.path;
  if (authExceptions.includes(fullPath)) {
    res.locals.noAuth = true;
  }

  next();
});

// Authentication handler - checks if some bearer was provided
server.use((req, res, next) => {
  if (res.locals.noAuth) {
    next();
  }

  const isFromRapidApi = validateHeader(req);

  if (isFromRapidApi) {
    try {
      res.locals.source = "rapidapi";
      next();
    } catch {
      res.status(401).json({ status: "error", message: "Unauthorized" });
    }
    return;
  }
  res.status(403).json({ status: "error", message: "Api can be only used within RapidApi infrastructure" });
});

server.get("/", (req, res) => res.send("<p>Welcome to the Calculator API. If you are planing to work with this go to the following link: <a href='https://rapidapi.com/nicholas.petrasek/api/calculator17'>RapidAPI Link</a></p>"))

server.use("/api", api);

server.use((req, res) => res.status(404).json({status: "not-found", message: "seems like you are looking for something that does not exist"}))


const validateHeader = (req: Request) => {
  if(req.path === "/") return true;
  console.log("Headers: ", req.headers)
  if (req.headers?.["x-rapidapi-proxy-secret"]) {
    console.log("Rapidapi Proxy Secret header found");
    return req.headers["x-rapidapi-proxy-secret"] === PROXY_SECRET;
  }
  return false;
};

// start the Express server
server.listen( PORT, () => {
  console.log( `Server started at http://localhost:${ PORT }` );
} );