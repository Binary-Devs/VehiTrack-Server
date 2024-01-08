'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.MaintenanceRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
const maintenance_validation_1 = require('./maintenance.validation');
const maintenance_controller_1 = require('./maintenance.controller');
const router = express_1.default.Router();
// create
router.post(
  '/create',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  (0, validateRequest_1.default)(
    maintenance_validation_1.MaintenanceValidation.create
  ),
  maintenance_controller_1.MaintenanceController.create
);
// get all
router.get(
  '/',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  maintenance_controller_1.MaintenanceController.getAll
);
// get single
router.get(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  maintenance_controller_1.MaintenanceController.getSingle
);
// update single
router.patch(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  (0, validateRequest_1.default)(
    maintenance_validation_1.MaintenanceValidation.update
  ),
  maintenance_controller_1.MaintenanceController.updateSingle
);
// delete single
router.delete(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  maintenance_controller_1.MaintenanceController.deleteSingle
);
exports.MaintenanceRoutes = router;
