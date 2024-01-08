"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceValidation = void 0;
const zod_1 = require("zod");
const maintenance_constant_1 = require("./maintenance.constant");
const create = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({ required_error: 'Date is Required' }),
        vehicleId: zod_1.z.string({ required_error: 'Vehicle ID is Required' }),
        driverId: zod_1.z.string().optional(),
        odoMeter: zod_1.z.number().optional(),
        workshopType: zod_1.z.enum(maintenance_constant_1.workshop, {
            required_error: 'Workshop Type is Required',
        }),
        maintenanceType: zod_1.z.enum(maintenance_constant_1.maintenanceType, {
            required_error: 'Maintenance Type is Required',
        }),
        workshopDetails: zod_1.z.string().optional(),
        serviceCharge: zod_1.z.number().optional().default(0),
        remarks: zod_1.z.string().optional(),
        maintenanceHeadId: zod_1.z.string({
            required_error: 'Maintenance Head is Required',
        }),
        equipmentUses: zod_1.z
            .array(zod_1.z.object({
            date: zod_1.z.string({ required_error: 'Date is required' }),
            vehicleId: zod_1.z.string({ required_error: 'Vehicle ID is Required' }),
            equipmentId: zod_1.z.string({
                required_error: 'Equipment is required',
            }),
            quantity: zod_1.z.number({ required_error: 'Quantity is required' }),
            unitPrice: zod_1.z.number({ required_error: 'Unit Price is required' }),
            totalPrice: zod_1.z.number({ required_error: 'Total Price is required' }),
            remarks: zod_1.z.string().optional(),
            inHouse: zod_1.z.boolean({ required_error: 'In House is Required' }),
        }))
            .optional()
            .default([]),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().optional(),
        vehicleId: zod_1.z.string().optional(),
        driverId: zod_1.z.string().optional(),
        odoMeter: zod_1.z.number().optional(),
        workshopType: zod_1.z.enum(maintenance_constant_1.workshop).optional(),
        maintenanceType: zod_1.z
            .enum(maintenance_constant_1.maintenanceType)
            .optional(),
        workshopDetails: zod_1.z.string().optional(),
        serviceCharge: zod_1.z.number().optional(),
        remarks: zod_1.z.string().optional(),
        maintenanceHeadId: zod_1.z.string().optional(),
        equipmentUses: zod_1.z
            .array(zod_1.z.object({
            date: zod_1.z.string({ required_error: 'Date is required' }),
            vehicleId: zod_1.z.string({ required_error: 'Vehicle ID is Required' }),
            equipmentId: zod_1.z.string({
                required_error: 'Equipment is required',
            }),
            quantity: zod_1.z.number({ required_error: 'Quantity is required' }),
            unitPrice: zod_1.z.number({ required_error: 'Unit Price is required' }),
            totalPrice: zod_1.z.number({ required_error: 'Total Price is required' }),
            remarks: zod_1.z.string().optional(),
        }))
            .optional(),
    }),
});
exports.MaintenanceValidation = {
    create,
    update,
};
