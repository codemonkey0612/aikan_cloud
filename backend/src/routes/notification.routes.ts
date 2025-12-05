import { Router } from "express";
import * as NotificationController from "../controllers/notification.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requirePermission, requireAdminOrFacilityManager } from "../middlewares/rbac.middleware";

const router = Router();

// すべてのルートで認証必須
router.use(authenticate);

// 通知一覧・詳細: 全ロール閲覧可能
router.get("/", requirePermission("notifications:read"), NotificationController.getAllNotifications);
router.get("/:id", requirePermission("notifications:read"), NotificationController.getNotificationById);

// 通知作成・更新: ADMINまたはFACILITY_MANAGERのみ
router.post("/", requirePermission("notifications:write"), NotificationController.createNotification);
router.put("/:id", requirePermission("notifications:write"), NotificationController.updateNotification);

// 通知削除: ADMINのみ
router.delete("/:id", requireAdminOrFacilityManager, NotificationController.deleteNotification);

export default router;

