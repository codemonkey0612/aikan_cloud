import { Router } from "express";
import * as ResidentController from "../controllers/resident.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requirePermission, requireAdminOrFacilityManager } from "../middlewares/rbac.middleware";

const router = Router();

// すべてのルートで認証必須
router.use(authenticate);

// 入居者一覧・詳細: 全ロール閲覧可能
router.get("/", requirePermission("residents:read"), ResidentController.getAllResidents);
router.get("/:id", requirePermission("residents:read"), ResidentController.getResidentById);

// 入居者作成・更新・削除: ADMINまたはFACILITY_MANAGERのみ
router.post("/", requirePermission("residents:write"), ResidentController.createResident);
router.put("/:id", requirePermission("residents:write"), ResidentController.updateResident);
router.delete("/:id", requireAdminOrFacilityManager, ResidentController.deleteResident);

export default router;

