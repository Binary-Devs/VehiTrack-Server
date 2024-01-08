"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelStationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const fuelStation_validation_1 = require("./fuelStation.validation");
const fuelStation_controller_1 = require("./fuelStation.controller");
const router = express_1.default.Router();
// create
router.post('/create', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DRIVER, user_1.ENUM_USER_ROLE.HELPER), (0, validateRequest_1.default)(fuelStation_validation_1.FuelStationValidation.create), fuelStation_controller_1.FuelStationController.create);
// get all
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DRIVER, user_1.ENUM_USER_ROLE.HELPER), fuelStation_controller_1.FuelStationController.getAll);
// get single
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DRIVER, user_1.ENUM_USER_ROLE.HELPER), fuelStation_controller_1.FuelStationController.getSingle);
// update single
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DRIVER, user_1.ENUM_USER_ROLE.HELPER), (0, validateRequest_1.default)(fuelStation_validation_1.FuelStationValidation.update), fuelStation_controller_1.FuelStationController.updateSingle);
exports.FuelStationRoutes = router;
