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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const user_service_1 = require('./user.service');
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const user_constant_1 = require('./user.constant');
const pagination_1 = require('../../../constants/pagination');
// create super admin
const createSuperAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body,
      { superAdmin } = _a,
      userData = __rest(_a, ['superAdmin']);
    const result = yield user_service_1.UserService.createSuperAdmin(
      userData,
      superAdmin
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Super Admin Added Successfully',
      data: result,
    });
  })
);
// create admin
const createAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body,
      { admin } = _b,
      userData = __rest(_b, ['admin']);
    const result = yield user_service_1.UserService.createAdmin(
      userData,
      admin
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Admin Added Successfully',
      data: result,
    });
  })
);
// create driver
const createDriver = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const _c = req.body,
      { driver } = _c,
      userData = __rest(_c, ['driver']);
    const result = yield user_service_1.UserService.createDriver(
      userData,
      driver
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Driver Added Successfully',
      data: result,
    });
  })
);
// create helper
const createHelper = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const _d = req.body,
      { helper } = _d,
      userData = __rest(_d, ['helper']);
    const result = yield user_service_1.UserService.createHelper(
      userData,
      helper
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Helper Added Successfully',
      data: result,
    });
  })
);
// get all
// get all
const getAll = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      user_constant_1.userFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result = yield user_service_1.UserService.getAll(
      filters,
      paginationOptions
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Users retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
exports.UserController = {
  createSuperAdmin,
  createAdmin,
  createDriver,
  createHelper,
  getAll,
};
