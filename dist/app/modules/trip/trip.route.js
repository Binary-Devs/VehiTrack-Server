'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TripRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
const trip_validation_1 = require('./trip.validation');
const trip_controller_1 = require('./trip.controller');
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
  (0, validateRequest_1.default)(trip_validation_1.TripValidation.create),
  trip_controller_1.TripController.create
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
  trip_controller_1.TripController.getAll
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
  trip_controller_1.TripController.getSingle
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
  (0, validateRequest_1.default)(trip_validation_1.TripValidation.update),
  trip_controller_1.TripController.updateSingle
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
  trip_controller_1.TripController.deleteSingle
);
// update trip expenses
router.patch(
  '/:id/trip-expense',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.DRIVER,
    user_1.ENUM_USER_ROLE.HELPER
  ),
  (0, validateRequest_1.default)(
    trip_validation_1.TripValidation.updateTripExpenses
  ),
  trip_controller_1.TripController.updateTripExpense
);
exports.TripRoutes = router;
