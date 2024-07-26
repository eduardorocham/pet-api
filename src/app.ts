import "express-async-errors";
import express, { Response } from "express";
import routes from './routes';
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
import { erroMiddleware } from "./middlewares/erro";

const app = express();
app.use(express.json());
routes(app);

app.use(erroMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((err) => {
    console.log(err);
  })

export default app;
