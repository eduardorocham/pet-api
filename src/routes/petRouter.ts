import { Router } from "express";
import PetController from "../controller/PetController";
import { AppDataSource } from "../config/dataSource";
import PetRepository from "../repositories/PetRepository";
import { middlewareValidatorBodyPet } from "../middlewares/validators/petRequestBody copy";

const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

const router = Router();

router.get('/pets', (req, res) => petController.listaPets(req, res));
router.post(
    '/pets', 
    (req, res, next) => middlewareValidatorBodyPet(req, res, next),
    (req, res) => petController.criaPet(req, res)
);
router.get("/pets/filtro", (req, res) => petController.buscaPetPorCampoGenerico(req, res));
// router.get("/pets/filtroPorte", (req, res) => petController.buscaPetPeloPorte(req, res));
router.put('/pets/:pet_id/:adotante_id', (req, res) => petController.adotaPet(req, res));

export default router;