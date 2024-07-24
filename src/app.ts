import express, { Response } from "express";
import routes from './routes';
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());
routes(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((err) => {
    console.log(err);
  })

export default app;
