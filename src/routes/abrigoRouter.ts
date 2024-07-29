import { RequestHandler, Router } from "express";
import AbrigoController from "../controller/AbrigoController";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidatorBodyAbrigo } from "../middlewares/validators/abrigoRequestBody"; 
import { middlewareValidatorBodyEndereco } from "../middlewares/validators/enderecoRequestBody";
import { verificaIdMiddleware } from "../middlewares/verificaId";

const router = Router();

const abrigoRepository = new AbrigoRepository(
  AppDataSource.getRepository("AbrigoEntity")
);

const validateBodyEndereco: RequestHandler = (req, res, next) =>
  middlewareValidatorBodyEndereco(req, res, next);

const validateBodyAbrigo: RequestHandler = (req, res, next) =>
  middlewareValidatorBodyAbrigo(req, res, next);

const abrigoController = new AbrigoController(abrigoRepository);

router.post("/abrigos", validateBodyAbrigo, (req, res) => abrigoController.criaAbrigo(req, res));
router.get("/abrigos", (req, res) => abrigoController.listaAbrigos(req, res));
router.put("/abrigos/:id", verificaIdMiddleware, (req, res) => 
  abrigoController.atualizaAbrigo(req, res)
);
router.delete("/abrigos/:id", verificaIdMiddleware, (req, res) => 
  abrigoController.deletaAbrigo(req, res)
);
router.patch("/abrigos/:id", verificaIdMiddleware, validateBodyEndereco, (req, res) =>
  abrigoController.atualizaEnderecoAbrigo(req, res)
);

export default router;