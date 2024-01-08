"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
// balance sheet
const balanceSheet = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.accountHead.findMany({
        where: {},
        include: {
            accountType: {
                select: { label: true },
            },
            trips: {
                select: {
                    amount: true,
                },
            },
            expenses: {
                select: {
                    amount: true,
                    isMisc: true,
                },
            },
            vehicles: {
                select: {
                    vehicleValue: true,
                },
            },
            maintenances: {
                select: {
                    serviceCharge: true,
                },
            },
            equipmentUses: {
                select: {
                    totalPrice: true,
                },
            },
            accidentHistories: {
                select: {
                    paymentStatus: true,
                    amount: true,
                },
            },
            paperWorks: {
                select: {
                    totalAmount: true,
                },
            },
        },
    });
    return result;
});
// fuel status
const fuelStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    const findExpenseHead = yield prisma_1.default.expenseHead.findFirst({
        where: {
            label: 'Fuel Expense',
        },
    });
    if (!findExpenseHead) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'First Setup Your Account');
    }
    const result = yield prisma_1.default.vehicle.findMany({
        where: {},
        include: {
            fuels: {
                select: {
                    amount: true,
                },
            },
            expenses: {
                where: { expenseHeadId: findExpenseHead.id },
                select: {
                    amount: true,
                },
            },
        },
    });
    return result;
});
// stock status
const stockStatus = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (id) {
        andConditions.push({
            id,
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.equipment.findMany({
        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
        include: {
            uom: true,
            equipmentIns: {
                select: {
                    quantity: true,
                },
            },
            equipmentUses: {
                where: { inHouse: true },
                select: {
                    quantity: true,
                },
            },
        },
    });
    const total = yield prisma_1.default.equipment.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
// summary report
const vehicleSummaryReport = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { vehicleId, startDate, endDate } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    const tripAndConditions = [];
    const othersAndConditions = [];
    if (vehicleId) {
        andConditions.push({
            id: vehicleId,
        });
    }
    if (startDate) {
        tripAndConditions.push({
            startDate: {
                gte: new Date(`${startDate}, 00:00:00`),
            },
        });
        othersAndConditions.push({
            date: {
                gte: new Date(`${startDate}, 00:00:00`),
            },
        });
    }
    if (endDate) {
        tripAndConditions.push({
            startDate: {
                lte: new Date(`${endDate}, 23:59:59`),
            },
        });
        othersAndConditions.push({
            date: {
                lte: new Date(`${endDate}, 23:59:59`),
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const tripWhereConditions = tripAndConditions.length > 0 ? { AND: tripAndConditions } : {};
    const expenseWhereConditions = othersAndConditions.length > 0 ? { AND: othersAndConditions } : {};
    const maintenanceWhereConditions = othersAndConditions.length > 0 ? { AND: othersAndConditions } : {};
    const paperWhereConditions = othersAndConditions.length > 0 ? { AND: othersAndConditions } : {};
    const equipmentWhereConditions = othersAndConditions.length > 0 ? { AND: othersAndConditions } : {};
    const result = yield prisma_1.default.vehicle.findMany({
        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip,
        take: limit,
        include: {
            trips: {
                where: tripWhereConditions,
                select: {
                    amount: true,
                },
            },
            expenses: {
                where: expenseWhereConditions,
                select: {
                    amount: true,
                    isMisc: true,
                },
            },
            maintenances: {
                where: maintenanceWhereConditions,
                select: {
                    serviceCharge: true,
                },
            },
            paperWorks: {
                where: paperWhereConditions,
                select: {
                    totalAmount: true,
                },
            },
            equipmentUses: {
                where: equipmentWhereConditions,
                select: {
                    totalPrice: true,
                },
            },
        },
    });
    const total = yield prisma_1.default.vehicle.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
const getTripSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield prisma_1.default.trip.groupBy({
        by: ['status'],
        where: {
            status: 'Completed',
        },
        _sum: {
            amount: true,
        },
        _count: true,
    });
    const expenses = yield prisma_1.default.expense.groupBy({
        by: ['isMisc'],
        where: {
            isMisc: false,
        },
        _sum: {
            amount: true,
        },
    });
    const result = {};
    if (trips.length) {
        result.count = trips[0]._count || 0;
        result.amount = trips[0]._sum.amount || 0;
    }
    if (expenses.length) {
        result.expense = expenses[0]._sum.amount || 0;
    }
    return result;
});
const tripSummaryGroupByMonthYear = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$queryRaw `SELECT EXTRACT(YEAR FROM "startDate") AS year, EXTRACT(MONTH FROM "startDate") AS month,  SUM(amount) AS total_amount FROM trips GROUP BY year, month ORDER BY year, month`;
    const formattedResult = result.map(row => ({
        year: row.year,
        month: row.month,
        total_amount: Number(row.total_amount),
    }));
    return formattedResult;
});
const fuelSummaryGroupByMonthYear = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$queryRaw `SELECT EXTRACT(YEAR FROM date) AS year, EXTRACT(MONTH FROM date) AS month, SUM(quantity) AS total_quantity, SUM(amount) AS total_amount FROM fuels GROUP BY year, month ORDER BY year, month`;
    const formattedResult = result.map(row => ({
        year: row.year,
        month: row.month,
        total_quantity: Number(row.total_quantity),
        total_amount: Number(row.total_amount),
    }));
    return formattedResult;
});
exports.ReportService = {
    balanceSheet,
    fuelStatus,
    stockStatus,
    vehicleSummaryReport,
    getTripSummary,
    tripSummaryGroupByMonthYear,
    fuelSummaryGroupByMonthYear,
};
