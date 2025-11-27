import { Router } from "express";
import * as VitalController from "../controllers/vital.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requirePermission, requireAdminOrFacilityManager } from "../middlewares/rbac.middleware";

const router = Router();

// すべてのルートで認証必須
router.use(authenticate);

// バイタル一覧・詳細: 全ロール閲覧可能
router.get("/", requirePermission("vitals:read"), VitalController.getAllVitals);
router.get("/:id", requirePermission("vitals:read"), VitalController.getVitalById);

// バイタル作成・更新: NURSE、FACILITY_MANAGER、ADMINのみ
router.post("/", requirePermission("vitals:write"), VitalController.createVital);
router.put("/:id", requirePermission("vitals:write"), VitalController.updateVital);

// バイタル削除: ADMINまたはFACILITY_MANAGERのみ
router.delete("/:id", requireAdminOrFacilityManager, VitalController.deleteVital);

export default router;

