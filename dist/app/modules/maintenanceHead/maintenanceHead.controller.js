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
exports.MaintenanceHeadController = void 0;
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const maintenanceHead_service_1 = require('./maintenanceHead.service');
const pick_1 = __importDefault(require('../../../shared/pick'));
const maintenanceHead_constant_1 = require('./maintenanceHead.constant');
const pagination_1 = require('../../../constants/pagination');
// create
const create = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result =
      yield maintenanceHead_service_1.MaintenanceHeadService.create(data);
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Maintenance Head Added Successfully',
      data: result,
    });
  })
);
// get all
const getAll = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      maintenanceHead_constant_1.maintenanceHeadFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result =
      yield maintenanceHead_service_1.MaintenanceHeadService.getAll(
        filters,
        paginationOptions
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Maintenance Heads retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
// get single
const getSingle = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield maintenanceHead_service_1.MaintenanceHeadService.getSingle(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Maintenance Head retrieved successfully',
      data: result,
    });
  })
);
// update single
const updateSingle = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result =
      yield maintenanceHead_service_1.MaintenanceHeadService.updateSingle(
        id,
        data
      );
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Maintenance Head Updated Successfully',
      data: result,
    });
  })
);
exports.MaintenanceHeadController = {
  create,
  getAll,
  getSingle,
  updateSingle,
};
