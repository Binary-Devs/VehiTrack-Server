'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AccidentHistoryRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
const accidentHistory_validation_1 = require('./accidentHistory.validation');
const accidentHistory_controller_1 = require('./accidentHistory.controller');
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
    accidentHistory_validation_1.AccidentHistoryValidation.create
  ),
  accidentHistory_controller_1.AccidentHistoryController.create
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
  accidentHistory_controller_1.AccidentHistoryController.getAll
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
  accidentHistory_controller_1.AccidentHistoryController.getSingle
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
    accidentHistory_validation_1.AccidentHistoryValidation.update
  ),
  accidentHistory_controller_1.AccidentHistoryController.updateSingle
);
// delete single
router.delete(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.DRIVER,
    user_1.ENUM_USER_ROLE.HELPER
  ),
  accidentHistory_controller_1.AccidentHistoryController.deleteSingle
);
exports.AccidentHistoryRoutes = router;
