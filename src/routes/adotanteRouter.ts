import { Router } from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidatorBodyAdotante } from "../middlewares/validators/adotanteRequestBody";
import { middlewareValidatorBodyEndereco } from "../middlewares/validators/enderecoRequestBody";

const router = Router();

const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);

router.post(
  "/adotantes", 
  (req, res, next) => middlewareValidatorBodyAdotante(req, res, next),
  (req, res) => adotanteController.criaAdotante(req, res)
);
router.get("/adotantes", (req, res) => adotanteController.listaAdotantes(req, res));
router.put("/adotantes/:id", (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/adotantes/:id", (req, res) =>
  adotanteController.deletaAdotante(req, res)
);
router.patch(
  "/adotantes/:id", 
  (req, res, next) => middlewareValidatorBodyEndereco(req, res, next),
  (req, res) => adotanteController.atualizaEnderecoAdotante(req, res)
);

export default router;