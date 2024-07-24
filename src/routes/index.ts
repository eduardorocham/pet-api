import { Router } from "express";
import petRoutes from "./petRouter";
import adotanteRoutes from "./adotanteRouter";

const router = (app: Router) => {
    app.use(
        petRoutes,
        adotanteRoutes
    )
};

export default router;