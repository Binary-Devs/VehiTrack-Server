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
exports.deleteSingleConversation =
  exports.updateSingleConversation =
  exports.getSingleConversation =
  exports.getAllConversation =
  exports.createConversation =
    void 0;
const http_status_1 = __importDefault(require('http-status'));
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const conversation_service_1 = require('./conversation.service');
const pick_1 = __importDefault(require('../../../shared/pick'));
const conversation_constant_1 = require('./conversation.constant');
const pagination_1 = require('../../../constants/pagination');
exports.createConversation = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const io = req.app.get('io');
    const user = req.user;
    const result = yield (0, conversation_service_1.createConversationToDB)(
      user,
      req.body
    );
    io.emit('conversation-message', Object.assign({}, result));
    // io.emit('conversation', { ...result.conversation });
    // io.emit('message', { ...result.message });
    (0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Conversation created successfully',
      data: result,
    });
  })
);
exports.getAllConversation = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      conversation_constant_1.conversationFilterableFields
    );
    const pagination = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result = yield (0, conversation_service_1.getAllConversationFromDB)(
      filters,
      pagination
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Conversations retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  })
);
exports.getSingleConversation = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0,
    conversation_service_1.getSingleConversationFromDB)(req.params.id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Single conversation fetched successfully',
      data: result,
    });
  })
);
exports.updateSingleConversation = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield (0,
    conversation_service_1.updateSingleConversationToDB)(id, payload);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Conversation updated successfully',
      data: result,
    });
  })
);
exports.deleteSingleConversation = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0,
    conversation_service_1.deleteSingleConversationFromDB)(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Conversation deleted successfully',
      data: result,
    });
  })
);
