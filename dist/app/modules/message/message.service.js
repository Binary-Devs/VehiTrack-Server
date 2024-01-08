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
exports.deleteSingleMessageFromDB =
  exports.updateSingleMessageToDB =
  exports.getSingleMessageFromDB =
  exports.getAllMessageFromDB =
  exports.createMessageToDB =
    void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const message_constant_1 = require('./message.constant');
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const createMessageToDB = (user, messageData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { message, senderId, receiverId, conversationId } = messageData;
    const result = yield prisma_1.default.message.create({
      data: {
        message,
        senderId,
        receiverId,
        conversationId,
      },
      include: {
        conversation: {
          include: {
            sender: true,
            receiver: true,
          },
        },
      },
    });
    if (result) {
      return result;
    } else {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create message!'
      );
    }
  });
exports.createMessageToDB = createMessageToDB;
const getAllMessageFromDB = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andCondition = [];
    if (searchTerm) {
      andCondition.push({
        OR: message_constant_1.messageSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
    if (Object.keys(filtersData).length > 0) {
      andCondition.push({
        AND: Object.keys(filtersData).map(key => ({
          [key]: {
            equals: filtersData[key],
          },
        })),
      });
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield prisma_1.default.message.findMany({
      where: whereCondition,
      include: {
        conversation: {
          include: {
            sender: true,
            receiver: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: 'desc' },
    });
    const total = yield prisma_1.default.message.count();
    const totalPage = Number(total) / Number(limit);
    return {
      meta: {
        total,
        page,
        limit,
        totalPage: Math.ceil(totalPage),
      },
      data: result,
    };
  });
exports.getAllMessageFromDB = getAllMessageFromDB;
const getSingleMessageFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.message.findUnique({
      where: {
        id,
      },
    });
    if (result) {
      return result;
    } else {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'There is no message with the id/Failed to fetched message'
      );
    }
  });
exports.getSingleMessageFromDB = getSingleMessageFromDB;
const updateSingleMessageToDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check is exist
    const isExist = yield prisma_1.default.message.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Message Not Found'
      );
    }
    const result = yield prisma_1.default.message.update({
      where: {
        id,
      },
      data: payload,
    });
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to Update Message'
      );
    }
    return result;
  });
exports.updateSingleMessageToDB = updateSingleMessageToDB;
const deleteSingleMessageFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deleteMessage = yield prisma_1.default.message.delete({
      where: {
        id,
      },
    });
    if (deleteMessage) {
      return deleteMessage;
    } else {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'There is no message with the id/Failed to delete message'
      );
    }
  });
exports.deleteSingleMessageFromDB = deleteSingleMessageFromDB;
