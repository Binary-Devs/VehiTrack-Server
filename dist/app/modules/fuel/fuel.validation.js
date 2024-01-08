"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({ required_error: 'Date is Required' }),
        vehicleId: zod_1.z.string({ required_error: 'Vehicle ID is Required' }),
        driverId: zod_1.z.string().optional(),
        fuelTypeId: zod_1.z.string({ required_error: 'Fuel Type ID is Required' }),
        fuelStationId: zod_1.z.string().optional().nullable(),
        odoMeter: zod_1.z.number().optional(),
        quantity: zod_1.z.number({ required_error: 'Quantity is Required' }),
        amount: zod_1.z.number({ required_error: 'Amount is Required' }),
        remarks: zod_1.z.string().optional(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().optional(),
        vehicleId: zod_1.z.string().optional(),
        driverId: zod_1.z.string().optional(),
        fuelTypeId: zod_1.z.string().optional(),
        fuelStationId: zod_1.z.string().optional().nullable(),
        odoMeter: zod_1.z.number().optional(),
        quantity: zod_1.z.number().optional(),
        amount: zod_1.z.number().optional(),
        remarks: zod_1.z.string().optional(),
    }),
});
exports.FuelValidation = {
    create,
    update,
};
