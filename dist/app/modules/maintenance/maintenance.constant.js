"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceType = exports.workshop = exports.maintenanceFilterableFields = exports.maintenanceSearchableFields = void 0;
exports.maintenanceSearchableFields = [
    'billNo',
    'workshopDetails',
    'remarks',
];
exports.maintenanceFilterableFields = [
    'searchTerm',
    'startDate',
    'endDate',
    'vehicleId',
    'driverId',
    'workshopType',
    'maintenanceType',
];
exports.workshop = ['InHouse', 'External'];
exports.maintenanceType = [
    'Scheduled',
    'Unscheduled',
    'Accidental',
    'Others',
];
