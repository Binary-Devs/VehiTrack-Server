"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const superAdmin_route_1 = require("../modules/superAdmin/superAdmin.route");
const admin_route_1 = require("../modules/admin/admin.route");
const driver_route_1 = require("../modules/driver/driver.route");
const helper_route_1 = require("../modules/helper/helper.route");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const brand_route_1 = require("../modules/brand/brand.route");
const model_route_1 = require("../modules/model/model.route");
const vehicle_route_1 = require("../modules/vehicle/vehicle.route");
const party_route_1 = require("../modules/Party/party.route");
const accountType_route_1 = require("../modules/accountType/accountType.route");
const accountHead_route_1 = require("../modules/accountHead/accountHead.route");
const expenseHead_route_1 = require("../modules/expenseHead/expenseHead.route");
const maintenanceHead_route_1 = require("../modules/maintenanceHead/maintenanceHead.route");
const expense_route_1 = require("../modules/expense/expense.route");
const fuelType_route_1 = require("../modules/fuelType/fuelType.route");
const fuelStation_route_1 = require("../modules/fuelStation/fuelStation.route");
const fuel_route_1 = require("../modules/fuel/fuel.route");
const Uom_route_1 = require("../modules/uom/Uom.route");
const equipment_route_1 = require("../modules/equipment/equipment.route");
const equipmentIn_route_1 = require("../modules/equipmentIn/equipmentIn.route");
const accidentHistory_route_1 = require("../modules/accidentHistory/accidentHistory.route");
const paperWork_route_1 = require("../modules/paperWork/paperWork.route");
const maintenance_route_1 = require("../modules/maintenance/maintenance.route");
const trip_route_1 = require("../modules/trip/trip.route");
const profile_route_1 = require("../modules/profile/profile.route");
const report_route_1 = require("../modules/report/report.route");
const conversation_route_1 = require("../modules/conversation/conversation.route");
const message_route_1 = require("../modules/message/message.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/profile',
        route: profile_route_1.ProfileRoutes,
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/super-admin',
        route: superAdmin_route_1.SuperAdminRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/driver',
        route: driver_route_1.DriverRoutes,
    },
    {
        path: '/helper',
        route: helper_route_1.HelperRoutes,
    },
    {
        path: '/brand',
        route: brand_route_1.BrandRoutes,
    },
    {
        path: '/model',
        route: model_route_1.ModelRoutes,
    },
    {
        path: '/vehicle',
        route: vehicle_route_1.VehicleRoutes,
    },
    {
        path: '/party',
        route: party_route_1.PartyRoutes,
    },
    {
        path: '/trip',
        route: trip_route_1.TripRoutes,
    },
    {
        path: '/account-type',
        route: accountType_route_1.AccountTypeRoutes,
    },
    {
        path: '/account-head',
        route: accountHead_route_1.AccountHeadRoutes,
    },
    {
        path: '/expense-head',
        route: expenseHead_route_1.ExpenseHeadRoutes,
    },
    {
        path: '/expense',
        route: expense_route_1.ExpenseRoutes,
    },
    {
        path: '/fuel-type',
        route: fuelType_route_1.FuelTypeRoutes,
    },
    {
        path: '/fuel-station',
        route: fuelStation_route_1.FuelStationRoutes,
    },
    {
        path: '/fuel',
        route: fuel_route_1.FuelRoutes,
    },
    {
        path: '/uom',
        route: Uom_route_1.UomRoutes,
    },
    {
        path: '/equipment',
        route: equipment_route_1.EquipmentRoutes,
    },
    {
        path: '/equipment-in',
        route: equipmentIn_route_1.EquipmentInRoutes,
    },
    {
        path: '/maintenance-head',
        route: maintenanceHead_route_1.MaintenanceHeadRoutes,
    },
    {
        path: '/maintenance',
        route: maintenance_route_1.MaintenanceRoutes,
    },
    {
        path: '/accident-history',
        route: accidentHistory_route_1.AccidentHistoryRoutes,
    },
    {
        path: '/paper-work',
        route: paperWork_route_1.PaperWorkRoutes,
    },
    {
        path: '/report',
        route: report_route_1.ReportRoutes,
    },
    {
        path: '/conversations',
        route: conversation_route_1.ConversationRoutes,
    },
    {
        path: '/messages',
        route: message_route_1.MessageRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
