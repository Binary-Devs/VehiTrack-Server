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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AccountHeadService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const accountHead_constant_1 = require('./accountHead.constant');
// create
const create = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.accountHead.create({ data });
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
    const { searchTerm, accountTypeId } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        OR: accountHead_constant_1.accountHeadSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
    if (accountTypeId) {
      andConditions.push({
        accountTypeId,
      });
    }
    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.accountHead.findMany({
      where: whereConditions,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
      include: {
        accountType: true,
      },
    });
    const total = yield prisma_1.default.accountHead.count({
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
    const result = yield prisma_1.default.accountHead.findUnique({
      where: {
        id,
      },
      include: {
        accountType: true,
      },
    });
    return result;
  });
// update single
const updateSingle = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.accountHead.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'AccountHead Not Found'
      );
    }
    const result = yield prisma_1.default.accountHead.update({
      where: {
        id,
      },
      data: payload,
    });
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to Update AccountHead'
      );
    }
    return result;
  });
exports.AccountHeadService = {
  create,
  getAll,
  getSingle,
  updateSingle,
};
