import { Router } from "express";
import * as VisitController from "../controllers/visit.controller";

const router = Router();

router.get("/", VisitController.getAllVisits);
router.get("/:id", VisitController.getVisitById);
router.post("/", VisitController.createVisit);
router.put("/:id", VisitController.updateVisit);
router.delete("/:id", VisitController.deleteVisit);

export default router;

