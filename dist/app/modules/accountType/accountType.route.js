'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AccountTypeRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
const accountType_validation_1 = require('./accountType.validation');
const accountType_controller_1 = require('./accountType.controller');
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
    accountType_validation_1.AccountTypeValidation.create
  ),
  accountType_controller_1.AccountTypeController.create
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
  accountType_controller_1.AccountTypeController.getAll
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
  accountType_controller_1.AccountTypeController.getSingle
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
    accountType_validation_1.AccountTypeValidation.update
  ),
  accountType_controller_1.AccountTypeController.updateSingle
);
exports.AccountTypeRoutes = router;
