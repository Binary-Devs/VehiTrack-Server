'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.HelperRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
const helper_validation_1 = require('./helper.validation');
const helper_controller_1 = require('./helper.controller');
const router = express_1.default.Router();
// get all
router.get(
  '/',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.DRIVER,
    user_1.ENUM_USER_ROLE.HELPER
  ),
  helper_controller_1.HelperController.getAll
);
// get single
router.get(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.DRIVER,
    user_1.ENUM_USER_ROLE.HELPER
  ),
  helper_controller_1.HelperController.getSingle
);
// update single
router.patch(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.DRIVER,
    user_1.ENUM_USER_ROLE.HELPER
  ),
  (0, validateRequest_1.default)(helper_validation_1.HelperValidation.update),
  helper_controller_1.HelperController.updateSingle
);
// inactive
router.patch(
  '/:id/inactive',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.DRIVER,
    user_1.ENUM_USER_ROLE.HELPER
  ),
  helper_controller_1.HelperController.inactive
);
exports.HelperRoutes = router;
