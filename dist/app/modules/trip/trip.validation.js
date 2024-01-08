"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        startDate: zod_1.z.string({ required_error: 'Start Date is Required' }),
        endDate: zod_1.z.string({ required_error: 'End Date is Required' }),
        startedTime: zod_1.z.string().optional(),
        completedTime: zod_1.z.string().optional(),
        from: zod_1.z.string({ required_error: 'From Location is Required' }),
        to: zod_1.z.string({ required_error: 'To Location is Required' }),
        odometerStart: zod_1.z.number().optional(),
        odometerEnd: zod_1.z.number().optional(),
        distance: zod_1.z.number({ required_error: 'Distance is Required' }),
        amount: zod_1.z.number({ required_error: 'Amount is Required' }),
        remarks: zod_1.z.string().optional(),
        vehicleId: zod_1.z.string({ required_error: 'Vehicle ID is Required' }),
        driverId: zod_1.z.string({ required_error: 'Driver ID is Required' }),
        helperId: zod_1.z.string().optional(),
        partyId: zod_1.z.string({ required_error: 'Party ID is Required' }),
        status: zod_1.z.string().optional(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        startedTime: zod_1.z.string().optional(),
        completedTime: zod_1.z.string().optional(),
        from: zod_1.z.string().optional(),
        to: zod_1.z.string().optional(),
        odometerStart: zod_1.z.number().optional(),
        odometerEnd: zod_1.z.number().optional(),
        distance: zod_1.z.number().optional(),
        amount: zod_1.z.number().optional(),
        remarks: zod_1.z.string().optional(),
        vehicleId: zod_1.z.string().optional(),
        driverId: zod_1.z.string().optional(),
        helperId: zod_1.z.string().optional(),
        partyId: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
    }),
});
const updateTripExpenses = zod_1.z.object({
    body: zod_1.z.object({
        expenses: zod_1.z.array(zod_1.z.object({
            date: zod_1.z.string({ required_error: 'Date is required' }),
            vehicleId: zod_1.z.string({
                required_error: 'Vehicle ID is required',
            }),
            expenseHeadId: zod_1.z.string({ required_error: 'Expense head is required' }),
            amount: zod_1.z.number({ required_error: 'Amount is required' }),
            remarks: zod_1.z.string().optional(),
        }), { required_error: 'Expenses is required' }),
    }),
});
exports.TripValidation = {
    create,
    update,
    updateTripExpenses,
};
