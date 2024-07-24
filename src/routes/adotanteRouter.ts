import { Router } from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";

const router = Router();

const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/adotantes", (req, res) => adotanteController.criaAdotante(req, res));
router.get("/adotantes", (req, res) => adotanteController.listaAdotantes(req, res));
router.put("/adotantes/:id", (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/adotantes/:id", (req, res) =>
  adotanteController.deletaAdotante(req, res)
);
router.patch("/adotantes/:id", (req, res) =>
  adotanteController.atualizaEnderecoAdotante(req, res)
);

export default router;