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
exports.ReportController = void 0;
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const pick_1 = __importDefault(require('../../../shared/pick'));
const pagination_1 = require('../../../constants/pagination');
const report_constant_1 = require('./report.constant');
const report_service_1 = require('./report.service');
// balance sheet
const balanceSheet = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield report_service_1.ReportService.balanceSheet();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Balance Sheet retrieved successfully',
      data: result,
    });
  })
);
// fuel status
const fuelStatus = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield report_service_1.ReportService.fuelStatus();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Fuel Status retrieved successfully',
      data: result,
    });
  })
);
// stock status
const stockStatus = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      report_constant_1.stockStatusFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result = yield report_service_1.ReportService.stockStatus(
      filters,
      paginationOptions
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Equipment retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
// summary report
const vehicleSummaryReport = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      report_constant_1.summaryReportFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result = yield report_service_1.ReportService.vehicleSummaryReport(
      filters,
      paginationOptions
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Summary Report retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
// get all trip summary
const getTripSummary = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield report_service_1.ReportService.getTripSummary();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Trip Summary retrieved successfully',
      data: result,
    });
  })
);
// get trip summary by grouping year, month
const tripSummaryGroupByMonthYear = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield report_service_1.ReportService.tripSummaryGroupByMonthYear();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Trip Summary retrieved successfully',
      data: result,
    });
  })
);
// get fuel summary by grouping year, month
const fuelSummaryGroupByMonthYear = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield report_service_1.ReportService.fuelSummaryGroupByMonthYear();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Fuels Summary retrieved successfully',
      data: result,
    });
  })
);
exports.ReportController = {
  balanceSheet,
  fuelStatus,
  stockStatus,
  vehicleSummaryReport,
  getTripSummary,
  tripSummaryGroupByMonthYear,
  fuelSummaryGroupByMonthYear,
};
