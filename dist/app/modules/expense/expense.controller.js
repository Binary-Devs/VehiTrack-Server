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
exports.ExpenseController = void 0;
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const expense_service_1 = require('./expense.service');
const pick_1 = __importDefault(require('../../../shared/pick'));
const expense_constant_1 = require('./expense.constant');
const pagination_1 = require('../../../constants/pagination');
// create
const create = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield expense_service_1.ExpenseService.create(data);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Expense Added Successfully',
      data: result,
    });
  })
);
// get all
const getAll = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      expense_constant_1.expenseFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result = yield expense_service_1.ExpenseService.getAll(
      filters,
      paginationOptions
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Expenses retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
// get single
const getSingle = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield expense_service_1.ExpenseService.getSingle(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Expense retrieved successfully',
      data: result,
    });
  })
);
// update single
const updateSingle = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield expense_service_1.ExpenseService.updateSingle(
      id,
      data
    );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Expense Updated Successfully',
      data: result,
    });
  })
);
// delete
const deleteSingle = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield expense_service_1.ExpenseService.deleteSingle(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Expense Deleted successfully',
      data: result,
    });
  })
);
exports.ExpenseController = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
