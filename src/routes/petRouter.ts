import { RequestHandler, Router } from "express";
import PetController from "../controller/PetController";
import { AppDataSource } from "../config/dataSource";
import PetRepository from "../repositories/PetRepository";
import { middlewareValidatorBodyPet } from "../middlewares/validators/petRequestBody copy";
import { verificaIdMiddleware } from "../middlewares/verificaId";

const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
);

const petController = new PetController(petRepository);

const validateBodyPet: RequestHandler = (req, res, next) =>
    middlewareValidatorBodyPet(req, res, next);

const router = Router();

router.get('/pets', (req, res) => petController.listaPets(req, res));
router.post('/pets', validateBodyPet, (req, res) => 
    petController.criaPet(req, res)
);
// router.get("/pets/filtroPorte", (req, res) => petController.buscaPetPeloPorte(req, res));
router.put('/pets/:pet_id/:adotante_id', verificaIdMiddleware, (req, res) => 
    petController.adotaPet(req, res)
);
router.delete('/pets/:id', verificaIdMiddleware, (req, res) => {
    petController.deletaPet(req, res);
})
router.get("/pets/filtro", (req, res) => petController.buscaPetPorCampoGenerico(req, res));

export default router;