import { RequestHandler, Router } from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidatorBodyAdotante } from "../middlewares/validators/adotanteRequestBody";
import { middlewareValidatorBodyEndereco } from "../middlewares/validators/enderecoRequestBody";
import { verificaIdMiddleware } from "../middlewares/verificaId";

const router = Router();

const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);

const validateBodyEndereco: RequestHandler = (req, res, next) =>
  middlewareValidatorBodyEndereco(req, res, next);

const adotanteController = new AdotanteController(adotanteRepository);

const validateBodyAdotante: RequestHandler = (req, res, next) =>
  middlewareValidatorBodyAdotante(req, res, next);

router.post("/adotantes", validateBodyAdotante, (req, res) => adotanteController.criaAdotante(req, res));
router.get("/adotantes", (req, res) => adotanteController.listaAdotantes(req, res));
router.put("/adotantes/:id", verificaIdMiddleware, (req, res) => 
  adotanteController.atualizaAdotante(req, res)
);
router.delete("/adotantes/:id", verificaIdMiddleware, (req, res) => 
  adotanteController.deletaAdotante(req, res)
);
router.patch("/adotantes/:id", verificaIdMiddleware, validateBodyEndereco, (req, res) => 
  adotanteController.atualizaEnderecoAdotante(req, res)
);

export default router;