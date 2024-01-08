"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const report_controller_1 = require("./report.controller");
const router = express_1.default.Router();
// balance sheet
router.get('/balance-sheet', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DRIVER, user_1.ENUM_USER_ROLE.HELPER), report_controller_1.ReportController.balanceSheet);
// fuel status
router.get('/fuel-status', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DRIVER, user_1.ENUM_USER_ROLE.HELPER), report_controller_1.ReportController.fuelStatus);
// stock status
router.get('/stock-status', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DRIVER, user_1.ENUM_USER_ROLE.HELPER), report_controller_1.ReportController.stockStatus);
// summary report
router.get('/summary-report', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DRIVER, user_1.ENUM_USER_ROLE.HELPER), report_controller_1.ReportController.vehicleSummaryReport);
// trip summary
router.get('/trip-summary', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DRIVER, user_1.ENUM_USER_ROLE.HELPER), report_controller_1.ReportController.getTripSummary);
// get trip summary by grouping year, month
router.get('/trip-summary-year-month', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DRIVER, user_1.ENUM_USER_ROLE.HELPER), report_controller_1.ReportController.tripSummaryGroupByMonthYear);
// get fuel summary by grouping year, month
router.get('/fuel-summary-year-month', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.DRIVER, user_1.ENUM_USER_ROLE.HELPER), report_controller_1.ReportController.fuelSummaryGroupByMonthYear);
exports.ReportRoutes = router;
