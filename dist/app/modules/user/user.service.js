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
exports.UserService = void 0;
const client_1 = require('@prisma/client');
const bcrypt_1 = __importDefault(require('bcrypt'));
const config_1 = __importDefault(require('../../../config'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const http_status_1 = __importDefault(require('http-status'));
const driver_utils_1 = require('../driver/driver.utils');
const helper_utils_1 = require('../helper/helper.utils');
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const user_constant_1 = require('./user.constant');
// create super admin
const createSuperAdmin = (user, superAdmin) =>
  __awaiter(void 0, void 0, void 0, function* () {
    user.password = yield bcrypt_1.default.hash(
      user.password,
      Number(config_1.default.bcrypt_salt_rounds)
    );
    user.role = client_1.UserRole.super_admin;
    const result = yield prisma_1.default.user.create({
      data: Object.assign(Object.assign({}, user), {
        superAdmin: { create: superAdmin },
      }),
    });
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to Create'
      );
    }
    return result;
  });
// create admin
const createAdmin = (user, admin) =>
  __awaiter(void 0, void 0, void 0, function* () {
    user.password = yield bcrypt_1.default.hash(
      user.password,
      Number(config_1.default.bcrypt_salt_rounds)
    );
    user.role = client_1.UserRole.admin;
    const result = yield prisma_1.default.user.create({
      data: Object.assign(Object.assign({}, user), {
        admin: { create: admin },
      }),
    });
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to Create'
      );
    }
    return result;
  });
// create driver
const createDriver = (user, driver) =>
  __awaiter(void 0, void 0, void 0, function* () {
    user.password = yield bcrypt_1.default.hash(
      user.password,
      Number(config_1.default.bcrypt_salt_rounds)
    );
    user.role = client_1.UserRole.driver;
    // generate driver id
    const driverId = yield (0, driver_utils_1.generateDriverId)();
    // set driver id
    driver.driverId = driverId;
    const result = yield prisma_1.default.user.create({
      data: Object.assign(Object.assign({}, user), {
        driver: { create: driver },
      }),
    });
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to Create'
      );
    }
    return result;
  });
// create helper
const createHelper = (user, helper) =>
  __awaiter(void 0, void 0, void 0, function* () {
    user.password = yield bcrypt_1.default.hash(
      user.password,
      Number(config_1.default.bcrypt_salt_rounds)
    );
    user.role = client_1.UserRole.helper;
    // generate helper id
    const helperId = yield (0, helper_utils_1.generateHelperId)();
    // set helper id
    helper.helperId = helperId;
    const result = yield prisma_1.default.user.create({
      data: Object.assign(Object.assign({}, user), {
        helper: { create: helper },
      }),
    });
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
    const { searchTerm, role } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        OR: user_constant_1.userSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
    if (role) {
      andConditions.push({
        role: role,
      });
    }
    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.user.findMany({
      where: whereConditions,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
      include: {
        superAdmin: true,
        admin: true,
        driver: true,
        helper: true,
      },
    });
    const total = yield prisma_1.default.user.count({
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
exports.UserService = {
  createSuperAdmin,
  createAdmin,
  createDriver,
  createHelper,
  getAll,
};
