import { Router } from "express";
import * as FacilityController from "../controllers/facility.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requirePermission, requireAdminOrFacilityManager } from "../middlewares/rbac.middleware";

const router = Router();

// すべてのルートで認証必須
router.use(authenticate);

// 施設一覧・詳細: 全ロール閲覧可能
router.get("/", requirePermission("facilities:read"), FacilityController.getAllFacilities);
router.get("/:id", requirePermission("facilities:read"), FacilityController.getFacilityById);

// 施設作成・更新・削除: ADMINまたはFACILITY_MANAGERのみ
router.post("/", requirePermission("facilities:write"), FacilityController.createFacility);
router.put("/:id", requirePermission("facilities:write"), FacilityController.updateFacility);
router.delete("/:id", requireAdminOrFacilityManager, FacilityController.deleteFacility);

export default router;

