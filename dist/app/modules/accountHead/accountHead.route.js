'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AccountHeadRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
const accountHead_validation_1 = require('./accountHead.validation');
const accountHead_controller_1 = require('./accountHead.controller');
const router = express_1.default.Router();
// create
router.post(
  '/create',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.DRIVER,
    user_1.ENUM_USER_ROLE.HELPER
  ),
  (0, validateRequest_1.default)(
    accountHead_validation_1.AccountHeadValidation.create
  ),
  accountHead_controller_1.AccountHeadController.create
);
// get all
router.get(
  '/',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.DRIVER,
    user_1.ENUM_USER_ROLE.HELPER
  ),
  accountHead_controller_1.AccountHeadController.getAll
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
  accountHead_controller_1.AccountHeadController.getSingle
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
  (0, validateRequest_1.default)(
    accountHead_validation_1.AccountHeadValidation.update
  ),
  accountHead_controller_1.AccountHeadController.updateSingle
);
exports.AccountHeadRoutes = router;
