import { Router } from "express";
import petRoutes from "./petRouter";
import adotanteRoutes from "./adotanteRouter";
import abrigoRotes from "./abrigoRouter";

const router = (app: Router) => {
    app.use(
        petRoutes,
        adotanteRoutes,
        abrigoRotes
    )
};

export default router;