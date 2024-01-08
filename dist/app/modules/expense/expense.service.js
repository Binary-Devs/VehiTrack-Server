'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ExpenseService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const expense_constant_1 = require('./expense.constant');
// create
const create = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const findHead = yield prisma_1.default.accountHead.findFirst({
      where: { label: 'Miscellaneous Expense' },
    });
    if (!findHead) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'First setup your account'
      );
    }
    data.accountHeadId = findHead.id;
    data.isMisc = true;
    const result = yield prisma_1.default.expense.create({ data });
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to Create'
      );
    }
    return result;
  });
// get all
const getAll = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filterData = __rest(filters, ['searchTerm']);
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        OR: expense_constant_1.expenseSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.entries(filterData).map(([field, value]) => ({
          [field]: value === 'true' ? true : value === 'false' ? false : value,
        })),
      });
    }
    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.expense.findMany({
      where: whereConditions,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
      include: {
        vehicle: true,
        expenseHead: true,
      },
    });
    const total = yield prisma_1.default.expense.count({
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
// get single
const getSingle = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.expense.findUnique({
      where: {
        id,
      },
      include: {
        vehicle: true,
        expenseHead: true,
      },
    });
    return result;
  });
// update single
const updateSingle = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.expense.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Expense Not Found'
      );
    }
    const result = yield prisma_1.default.expense.update({
      where: {
        id,
      },
      data: payload,
    });
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to Update Expense'
      );
    }
    return result;
  });
// delete
const deleteSingle = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.expense.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Expense Not Found'
      );
    }
    const result = yield prisma_1.default.expense.delete({
      where: {
        id,
      },
    });
    return result;
  });
exports.ExpenseService = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
