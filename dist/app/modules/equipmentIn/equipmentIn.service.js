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
exports.EquipmentInService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const equipmentIn_constant_1 = require('./equipmentIn.constant');
// create
const create = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.equipmentIn.create({
      data,
    });
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create'
      );
    }
    return result;
  });
// get all
const getAll = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, startDate, endDate } = filters,
      filterData = __rest(filters, ['searchTerm', 'startDate', 'endDate']);
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        OR: equipmentIn_constant_1.equipmentInSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
    if (startDate) {
      andConditions.push({
        date: {
          gte: new Date(`${startDate}, 00:00:00`),
        },
      });
    }
    if (endDate) {
      andConditions.push({
        date: {
          lte: new Date(`${endDate}, 23:59:59`),
        },
      });
    }
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.entries(filterData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.equipmentIn.findMany({
      where: whereConditions,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
      include: {
        equipment: {
          include: {
            uom: true,
          },
        },
      },
    });
    const total = yield prisma_1.default.equipmentIn.count({
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
    const result = yield prisma_1.default.equipmentIn.findUnique({
      where: {
        id,
      },
      include: {
        equipment: {
          include: {
            uom: true,
          },
        },
      },
    });
    return result;
  });
// update single
const updateSingle = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.equipmentIn.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'EquipmentIn Not Found'
      );
    }
    const result = yield prisma_1.default.equipmentIn.update({
      where: {
        id,
      },
      data: payload,
    });
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to Update Equipment In'
      );
    }
    return result;
  });
// delete single
const deleteSingle = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.equipmentIn.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Equipment In Not Found'
      );
    }
    const result = yield prisma_1.default.equipmentIn.delete({
      where: {
        id,
      },
    });
    return result;
  });
exports.EquipmentInService = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
