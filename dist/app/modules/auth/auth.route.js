'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const auth_controller_1 = require('./auth.controller');
const auth_validation_1 = require('./auth.validation');
const router = express_1.default.Router();
// user login
router.post(
  '/login',
  (0, validateRequest_1.default)(auth_validation_1.AuthValidation.login),
  auth_controller_1.AuthController.login
);
// logout
router.post(
  '/logout',
  (0, validateRequest_1.default)(
    auth_validation_1.AuthValidation.refreshTokenZodSchema
  ),
  auth_controller_1.AuthController.logout
);
// refresh token
router.get(
  '/refresh-token',
  (0, validateRequest_1.default)(
    auth_validation_1.AuthValidation.refreshTokenZodSchema
  ),
  auth_controller_1.AuthController.refreshToken
);
exports.AuthRoutes = router;
