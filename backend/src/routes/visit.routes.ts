import { Router } from "express";
import * as VisitController from "../controllers/visit.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requirePermission, requireAdminOrFacilityManager } from "../middlewares/rbac.middleware";

const router = Router();

// すべてのルートで認証必須
router.use(authenticate);

// 訪問一覧・詳細: 全ロール閲覧可能
router.get("/", requirePermission("visits:read"), VisitController.getAllVisits);
router.get("/:id", requirePermission("visits:read"), VisitController.getVisitById);

// 訪問作成・更新: NURSE、FACILITY_MANAGER、ADMINのみ
router.post("/", requirePermission("visits:write"), VisitController.createVisit);
router.put("/:id", requirePermission("visits:write"), VisitController.updateVisit);

// 訪問削除: ADMINまたはFACILITY_MANAGERのみ
router.delete("/:id", requireAdminOrFacilityManager, VisitController.deleteVisit);

export default router;

